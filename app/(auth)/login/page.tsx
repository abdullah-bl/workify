'use client'

import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useToast } from '~/components/ui/use-toast'

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()
	const router = useRouter()
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/'

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		// typ this function
		setIsLoading(true)
		event.preventDefault()
		const form = event.currentTarget
		const username = form.elements.namedItem('username') as HTMLInputElement
		const password = form.elements.namedItem('password') as HTMLInputElement

		if (!username || username.value === '') {
			setIsLoading(false)
			return username.focus()
		}

		if (!password || password.value === '') {
			setIsLoading(false)
			return password.focus()
		}
		try {
			setIsLoading(true)
			const res = await signIn('credentials', {
				redirect: false,
				username: username.value,
				password: password.value,
				callbackUrl,
			})

			setIsLoading(false)

			console.log(res)
			if (!res?.error) {
				router.push(callbackUrl)
			} else {
				toast({
					title: 'Something went wrong',
					description: 'check your username and password and try again',
				})
			}
		} catch (error: any) {
			console.log(error)
			setIsLoading(false)
			toast({
				title: 'Something went wrong',
				description: error.message,
			})
		}
		// await fetch('/api/auth/callback/credentials', {})
	}

	return (
		<div className='sm:fixed sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2'>
			<form
				method='post'
				onSubmit={handleSubmit}
				className='grid gap-2 px-6 py-4 rounded sm:border  w-full sm:min-w-[400px]'
			>
				<label htmlFor='username'>Username</label>
				<Input
					type='text'
					name='username'
					id='username'
					className='rounded border px-2 py-1'
					placeholder='Enter your username'
				/>
				<label htmlFor='password'>Password</label>
				<Input
					type='password'
					name='password'
					id='password'
					className='rounded border px-2 py-1'
					placeholder='Enter your password'
				/>
				<Button
					variant={'outline'}
					disabled={isLoading}
					type='submit'
					// className='px-4 py-2 rounded border transition-all'
				>
					Login
				</Button>
			</form>
		</div>
	)
}
