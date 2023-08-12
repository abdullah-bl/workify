'use client'

import { Button } from '~/components/ui/button'
import AutoForm, { AutoFormSubmit } from '~/components/ui/auto-form'
import * as z from 'zod'
import { useEffect, useState, useTransition } from 'react'
import { createWorkspace } from '~/lib/actions'
import { useRouter } from 'next/navigation'
import { useToast } from '~/components/ui/use-toast'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog'

const schema = z.object({
	name: z
		.string()
		.nonempty('Name is required')
		.max(150, 'Name must be less than 150 characters')
		.min(5, 'Name must be at least 3 characters')
		.regex(/^[a-z0-9_\-\s\u0600-\u06FF]+$/i, 'Only letters, numbers, _ and -'),
	description: z.string().max(400).optional(),
})

export function CreateWorkspaceForm() {
	const router = useRouter()
	const { toast } = useToast()
	let [isPending, startTransition] = useTransition()
	const [values, setValues] = useState<Partial<z.infer<typeof schema>>>({})

	useEffect(() => {
		const cachedValues = localStorage.getItem('create-workspace-form')
		if (cachedValues) {
			setValues(JSON.parse(cachedValues))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('create-workspace-form', JSON.stringify(values))
	}, [values])

	const handleSubmit = async (values: {
		name: string
		description?: string | undefined
		private?: boolean | undefined
	}) => {
		startTransition(async () => {
			const formData = new FormData()
			formData.append('name', values.name)
			formData.append('description', values.description || '')
			try {
				const data = await createWorkspace(formData)
				toast({
					title: 'Workspace created',
					description: 'Your workspace has been created',
				})
				localStorage.removeItem('create-workspace-form')
				router.push(`/workspaces/${data?.workspace?.id}`)
			} catch (error: any) {
				toast({
					variant: 'destructive',
					title: 'Error creating workspace',
					description: error?.message || 'Something went wrong',
				})
			}
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' className=''>
					+ New Space
				</Button>
			</DialogTrigger>
			<DialogContent className='border rounded-md'>
				<DialogHeader>
					<DialogTitle>New Work Space</DialogTitle>
					<DialogDescription>
						Spaces are where you collaborate with your team. You can create
						multiple spaces for different projects.
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-2'>
					<AutoForm
						values={values}
						onValuesChange={setValues}
						formSchema={schema}
						onSubmit={handleSubmit}
						fieldConfig={{
							name: {
								inputProps: {
									placeholder: 'Workspace name',
								},
							},
							description: {
								fieldType: 'textarea',
								inputProps: {
									placeholder: 'Workspace description',
								},
							},
						}}
					>
						<AutoFormSubmit>
							{isPending ? 'Creating...' : 'Create'}
						</AutoFormSubmit>
					</AutoForm>
				</div>
			</DialogContent>
		</Dialog>
	)
}
