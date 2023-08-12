'use client'

import { useSearchParams } from 'next/navigation'
import { Input } from './ui/input'

export default function Search({ placeholder = 'Search' }) {
	const search = useSearchParams()
	const q = search.get('q') || ''
	return (
		<form method='get' className='w-full sm:w-1/2 md:w-1/3'>
			<Input
				name='q'
				placeholder={placeholder}
				className='w-full'
				type='search'
				defaultValue={q}
			/>
			<button type='submit' hidden>
				Search
			</button>
		</form>
	)
}
