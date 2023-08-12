'use client'

import { PersonIcon } from '@radix-ui/react-icons'
import { Button } from '~/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { client } from '~/client'
import { signOut, useSession } from 'next-auth/react'

export default function ProfileNavItem() {
	const { status, data: session } = useSession()
	const user = session?.user
	const router = useRouter()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button type='button' title='Open Profile'>
					<PersonIcon />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => router.push(`/profile`)}>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push(`/settings`)}>
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					{user?.role === 'admin' && (
						<DropdownMenuItem onClick={() => router.push(`/dashboard`)}>
							Dashboard
							<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
						</DropdownMenuItem>
					)}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup aria-disabled>
					<DropdownMenuItem disabled>Team</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem disabled>Email</DropdownMenuItem>
								<DropdownMenuItem disabled>Message</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem disabled> More...</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuItem disabled>
						New Team
						<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => signOut()}>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
