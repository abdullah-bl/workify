'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'

export default function Pagination({
	page,
	perPage,
	totalItems,
	totalPages,
}: {
	page: number
	perPage: number
	totalItems: number
	totalPages: number
}) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()

	const next_path = () => {
		const search = new URLSearchParams(location.search)
		search.set('page', page + 1 + '')
		return router.push(`${pathname}?${search.toString()}`)
	}

	const prev_path = () => {
		const search = new URLSearchParams(location.search)
		search.set('page', page - 1 + '')
		return router.push(`${pathname}?${search.toString()}`)
	}

	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-2'>
				<span className='text-sm text-gray-400'>
					Showing {page * perPage - perPage + 1} to{' '}
					{page * perPage > totalItems ? totalItems : page * perPage} of{' '}
					{totalItems} items
				</span>
			</div>
			<div className='flex items-center gap-2'>
				<Button
					variant='ghost'
					onClick={prev_path}
					type='button'
					title='Prev Page'
					disabled={page === 1}
				>
					<ArrowLeftIcon />
				</Button>
				<Button
					variant='ghost'
					onClick={next_path}
					type='button'
					title='Next Page'
					disabled={page === totalPages}
				>
					<ArrowRightIcon />
				</Button>
			</div>
		</div>
	)
}
