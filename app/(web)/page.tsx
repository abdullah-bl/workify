import { Suspense } from 'react'
import WorkspacesList from '~/components/workspaces/WorkspacesList'
import Search from '~/components/search'
import { CreateWorkspaceForm } from '~/components/forms'
import LoadingCards from '~/components/workspaces/LoadingCards'
import Pagination from '~/components/Pagination'
import { prisma } from '~/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '~/lib/auth'

type SearchParams = {
	page?: number
	perPage?: number
	q?: string
}

const getUserWorkSpaces = async ({
	page = 1,
	perPage = 15,
	q = '',
	ownerId,
}: {
	page: number
	perPage: number
	q: string
	ownerId: string
}) => {
	const where = {
		AND: [
			{ name: { contains: q || '' } },
			{
				OR: [
					{ ownerId: { equals: ownerId } },
					{ members: { some: { id: { equals: ownerId } } } },
				],
			},
		],
	}
	const data = await prisma.workspace.findMany({
		skip: (page - 1) * perPage,
		take: perPage,
		where,
		orderBy: { createdAt: 'desc' },
		include: { owner: true, members: { select: { id: true } } },
	})
	const count = await prisma.workspace.count({
		where: {
			AND: [
				{ name: { contains: q || '' } },
				{
					OR: [
						{ ownerId: { equals: ownerId } },
						{ members: { some: { id: { equals: ownerId } } } },
					],
				},
			],
		},
	})
	return Promise.all([data, count])
}

export default async function Home({
	searchParams,
}: {
	searchParams: SearchParams
}) {
	const session = await getServerSession(authOptions)
	const user = session?.user as { id: string }
	const [data, count] = await getUserWorkSpaces({
		page: searchParams.page || 1,
		perPage: searchParams.perPage || 15,
		q: searchParams.q || '',
		ownerId: user.id,
	})
	return (
		<main className='max-w-5xl mx-auto grid gap-4 '>
			<div className='grid space-y-1'>
				<h3 className='text-2xl font-bold'>Workspaces</h3>
				<span className='text-gray-400 text-sm'>List of your workspaces</span>
			</div>
			<div className='flex items-center justify-between flex-wrap gap-2'>
				<Search placeholder='Search for Workspaces' />
				<CreateWorkspaceForm />
			</div>
			<Suspense fallback={<LoadingCards />}>
				<WorkspacesList data={data} />
			</Suspense>
			<Pagination
				page={searchParams.page || 1}
				perPage={searchParams.perPage || 15}
				totalItems={count}
				totalPages={Math.ceil(count / (searchParams.perPage || 15))}
			/>
		</main>
	)
}
