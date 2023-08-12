import { Suspense, use } from 'react'
import Pages from '~/components/pages/list'
import Pagination from '~/components/Pagination'
import { prisma } from '~/lib/prisma'

// type SearchParams = {
// 	page?: number
// 	perPage?: number
// 	q?: string
// }

const getWorkspacePages = async ({
	page = 1,
	perPage = 15,
	q = '',
	workspaceId,
}: {
	page: number
	perPage: number
	q: string
	workspaceId: string
}) => {
	const where = {
		AND: [
			{ name: { contains: q || '' } },
			{
				OR: [{ workspaceId: { equals: workspaceId } }],
			},
		],
	}
	const data = await prisma.page.findMany({
		skip: (page - 1) * perPage,
		take: perPage,
		orderBy: { createdAt: 'desc' },
		include: { owner: true },
		where,
	})
	const count = await prisma.page.count({ where })
	return Promise.all([data, count])
}

export default function ListPages({
	page,
	perPage,
	workspaceId,
	q = '',
}: {
	page: number
	perPage: number
	workspaceId: string
	q?: string
}) {
	const [data, count] = use(
		getWorkspacePages({
			page,
			perPage,
			workspaceId,
			q,
		})
	)

	return (
		<Suspense fallback='Loading...'>
			<Pages data={data} />
			<Pagination
				totalItems={count}
				page={page || 0}
				perPage={perPage || 0}
				totalPages={Math.ceil(count / (perPage || 1))}
			/>
		</Suspense>
	)
}
