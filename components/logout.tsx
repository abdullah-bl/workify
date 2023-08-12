'use client'

import { ExitIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { client } from '~/client'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import { revalidate_path } from '~/lib/actions'

export default function LogoutButton() {
	const toast = useToast()
	const router = useRouter()
	const handleLogout = async () => {
		revalidate_path(location.href)
		client.authStore.clear()
		toast.toast({
			title: 'Logged out',
			description: 'You have been logged out',
		})
		setTimeout(() => {
			router.replace('/login')
		}, 500)
	}
	return (
		<Button
			variant={'ghost'}
			title='Logout'
			onClick={handleLogout}
			type='button'
			className='py-1'
			// className={`px-4 py-2 capitalize text-center  justify-center  mx-1 w-full  rounded flex items-center gap-2`}
		>
			<span className='sr-only'>Logout</span>
			<ExitIcon width={18} height={18} />
		</Button>
	)
}
