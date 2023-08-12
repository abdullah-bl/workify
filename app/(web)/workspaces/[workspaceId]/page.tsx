import { notFound } from 'next/navigation'
import {
	CreatePageForm,
	DeleteWorkspaceDialog,
	EditWorkspaceForm,
} from '~/components/forms'
import Search from '~/components/search'
import { getWorkspace } from '~/lib/workspaces'
import ListPages from '~/components/pages/list-pages'
import { getServerSession } from 'next-auth'
import { authOptions } from '~/lib/auth'
import WorkspaceMembers from '~/components/users/workspace-members'
import { getUsers } from '~/lib/users'
import type { User } from '@prisma/client'

export default async function WorkspaceDetails({
	params: { workspaceId },
	searchParams,
}: {
	params: {
		workspaceId: string
	}
	searchParams: {
		page?: number
		perPage?: number
		q?: string
	}
}) {
	const session = await getServerSession(authOptions)
	const user = session?.user as { id: string }
	const workspace = await getWorkspace(workspaceId)
	if (!workspace) {
		notFound()
	}
	const users = user.id === workspace.ownerId ? await getUsers() : []
	return (
		<main className='max-w-5xl mx-auto grid gap-4 overflow-x-hidden'>
			<div className='flex items-center justify-between'>
				<div className='flex flex-col gap-1'>
					<span className='text-sm text-gray-400'>
						{workspace.owner.id === user?.id ? 'Owner' : 'Member of'}
					</span>
					<h1 className='text-2xl font-bold gap-2'>{workspace.name}</h1>
					<pre className='text-gray-400 text-sm w-52'>
						{workspace.description || 'No description provided'}
					</pre>
				</div>
				<div className='flex items-center gap-2'>
					<WorkspaceMembers
						members={workspace.members}
						ownerId={workspace.ownerId}
						isOwner={user?.id === workspace.ownerId}
						users={users.filter((u: User) => u.id !== workspace.ownerId)}
					/>
					{user?.id === workspace.owner.id && (
						<>
							<EditWorkspaceForm workspace={workspace} />
							<DeleteWorkspaceDialog workspaceId={workspace.id} />
						</>
					)}
				</div>
			</div>
			<div className='flex items-center justify-between flex-wrap gap-2 px-1'>
				<Search placeholder='Search in Pages...' />
				<CreatePageForm />
			</div>
			<ListPages
				q={searchParams.q || ''}
				page={searchParams.page || 1}
				perPage={searchParams.perPage || 15}
				workspaceId={workspaceId}
			/>
		</main>
	)
}
