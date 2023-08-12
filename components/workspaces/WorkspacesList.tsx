import Link from 'next/link'
import { formatDate } from '~/lib/commons'
import { PersonIcon } from '@radix-ui/react-icons'
import { User, Workspace } from '@prisma/client'

export default function WorkspaceList({
	data,
}: {
	data: (Workspace & { owner: User } & { members: { id: string }[] })[]
}) {
	return (
		<div className='grid gap-4'>
			<div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3`}>
				{data.length > 0 ? (
					data.map((space) => (
						<div
							key={space.id}
							dir='auto'
							className='border rounded-md p-3 grid hover:shadow-sm col-auto'
						>
							<Link
								href={`/users/${space.owner.username}`}
								className='text-gray-400 text-sm flex items-center gap-2'
							>
								<PersonIcon />
								{space?.owner?.username || 'No owner provided'}
							</Link>
							<div className='flex items-center justify-between'>
								<Link href={`/workspaces/${space.id}`} className='font-medium'>
									{space.name}
								</Link>
							</div>
							<p className='text-sm text-zinc-600'>
								{space?.description?.slice(0, 75) || 'No description provided'}
							</p>
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-2'>
									<PersonIcon />
									<span className='text-sm text-zinc-600'>
										{space.members.length}
									</span>
								</div>
								<time className='text-sm text-zinc-600'>
									{formatDate(space.updatedAt)}
								</time>
							</div>
						</div>
					))
				) : (
					<div className='text-center text-gray-400 col-span-12'>
						No workspaces found
					</div>
				)}
			</div>
		</div>
	)
}
