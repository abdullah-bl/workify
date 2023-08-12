import { DividerVerticalIcon, RocketIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { BackArrow } from '~/components/back'
import ProfileNavItem from '~/components/users/profile-nav-item'
import { ThemeToggle } from '~/components/theme-provider'

export default function Navbar() {
	return (
		<>
			<div className=' z-50 px-4 py-2 h-9 rounded border flex items-center gap-1 fixed left-2 top-2 bg-white/80 dark:bg-zinc-800/80'>
				<Link href='/' className='px-2 capitalize font-mono'>
					<RocketIcon />
				</Link>
				<DividerVerticalIcon />
				<BackArrow />
			</div>
			<div className='px-4 z-50 py-2 h-9 rounded border flex items-center gap-4 fixed right-2 top-2 bg-white/80 dark:bg-zinc-800/80'>
				<ProfileNavItem />
				<ThemeToggle />
			</div>
		</>
	)
}
