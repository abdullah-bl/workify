import { Page, User } from '@prisma/client'
import { PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { formatDate } from '~/lib/commons'

export default function Pages({
	data,
}: {
	data: (Page & { owner: User })[] | []
}) {
	return (
		<div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3`}>
			{data.map((page) => (
				<div className='border rounded-md p-3 grid' key={page.id}>
					<div className='flex items-center gap-2'>
						<Link
							href={`/users/${page.owner.username}`}
							className='text-gray-400 text-sm flex items-center gap-2'
						>
							<PersonIcon />
							{page?.owner?.username || 'No owner provided'}
						</Link>
					</div>
					<Link
						href={`/workspaces/${page.workspaceId}/pages/${page.id}`}
						className='font-medium '
					>
						{page.name}
					</Link>
					<pre className='text-gray-400 text-sm'>
						{page.description || 'No description provided'}
					</pre>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<span className='text-sm'>{formatDate(page.updatedAt)}</span>
						</div>
					</div>
				</div>
			))}

			{data?.length === 0 && (
				<div className='col-span-3 text-center text-gray-400'>
					No pages found
				</div>
			)}
		</div>
	)
}
