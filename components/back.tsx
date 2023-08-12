'use client'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { usePathname, useRouter } from 'next/navigation'

export const BackArrow = () => {
	const router = useRouter()
	const pathname = usePathname()
	return pathname !== '/' ? (
		<button
			type='button'
			className='px-2'
			title='Back'
			onClick={() => router.back()}
		>
			<ArrowLeftIcon />
		</button>
	) : null
}
