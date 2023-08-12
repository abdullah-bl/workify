'use client'

import { Button } from '~/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { User } from '@prisma/client'
import { PersonIcon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'

export default function WorkspaceMembers({
	members,
	isOwner,
	ownerId,
	users,
}: {
	members: User[]
	isOwner: boolean
	ownerId: string
	users: User[]
}) {
	const [open, setOpen] = useState(false)
	const [isPending, startTransition] = useState(false)
	const [search, setSearch] = useState('')

	// merge users and members to get the users that are not in the workspace
	//

	const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {}
	const handleRemove = (e: React.FormEvent<HTMLFormElement>) => {}

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearch(e.target.value)

	const filteredUsers = users
		.filter((user) => user.id !== ownerId)
		.filter((user) => {
			return user.username.toLowerCase().includes(search.toLowerCase())
		})

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button variant={'outline'} className='flex items-center gap-2'>
					<span className='text-sm'>{members.length}</span>
					<PersonIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Workspace members ({members.length})</DialogTitle>
					<DialogDescription>Members of this workspace</DialogDescription>
					<Input
						onChange={handleSearch}
						placeholder='Search users'
						className='w-full'
					/>
				</DialogHeader>
				<div className='grid gap-2 w-full max-h-96 overflow-y-auto'>
					<h3 className='font-medium'>Members</h3>
					{members?.map((member) => (
						<div
							key={member.id}
							className='flex items-center gap-2 justify-between border-b py-1'
						>
							<div className='grid'>
								<span className='font-medium'>{member.name ?? 'No Name'}</span>
								<Link href={`/users/${member.username}`} className='text-sm'>
									{member.username}
								</Link>
							</div>
							{isOwner && ownerId && (
								<form>
									<input
										readOnly
										type='text'
										name='memberId'
										value={member.id}
										hidden
									/>
									<input
										readOnly
										type='text'
										name='workspace'
										value={member.id}
										hidden
									/>
									<Button variant='destructive'>
										<TrashIcon />
									</Button>
								</form>
							)}
						</div>
					))}
					<h3 className='font-medium'>Users</h3>
					{users?.map((user) => (
						<div
							key={user.id}
							className='flex items-center gap-2 justify-between border-b px-4 py-2'
						>
							<div className='grid'>
								<span className='font- text-sm'>{user.name ?? 'No Name'}</span>
								<Link href={`/users/${user.username}`} className='text-sm'>
									{user.username}
								</Link>
							</div>
							{isOwner && ownerId && (
								<form>
									<input
										readOnly
										type='text'
										name='userId'
										value={user.id}
										hidden
									/>
									<input
										readOnly
										type='text'
										name='workspace'
										value={user.id}
										hidden
									/>
									<Button variant='default'>
										<PlusIcon />
									</Button>
								</form>
							)}
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}
