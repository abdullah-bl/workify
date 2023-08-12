'use client'

import { useEffect } from 'react'
import { Button } from '~/components/ui/button'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div className='grid place-items-center place-content-center h-full w-full'>
			<h2 className='font-mono font-bold'>Something went wrong!</h2>
			<Button
				className='mt-4'
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</Button>
		</div>
	)
}
