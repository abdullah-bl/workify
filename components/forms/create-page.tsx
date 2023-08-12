'use client'

import { Button } from '~/components/ui/button'
import AutoForm, { AutoFormSubmit } from '~/components/ui/auto-form'
import * as z from 'zod'
import { useEffect, useState, useTransition } from 'react'
import { createPage, revalidate_path } from '~/lib/actions'
import { useParams, useRouter } from 'next/navigation'
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
	type: z.enum(['Documents', 'Tasks', 'Events', 'Notes', 'Drawings']),
})

export function CreatePageForm() {
	const router = useRouter()
	const { toast } = useToast()
	let { workspaceId } = useParams() as { workspaceId: string }
	const [isPending, startTransition] = useTransition()
	const [values, setValues] = useState<Partial<z.infer<typeof schema>>>()

	useEffect(() => {
		setValues((values) => ({ ...values, workspace: workspaceId }))
	}, [workspaceId])

	useEffect(() => {
		const cachedValues = localStorage.getItem('create-page-form')
		if (cachedValues) {
			setValues(JSON.parse(cachedValues))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('create-page-form', JSON.stringify(values))
	}, [values])

	const handleSubmit = async (values: {
		name: string
		description?: string | undefined
		type: string
	}) => {
		const dataForm = new FormData()
		dataForm.append('name', values.name)
		dataForm.append('description', values.description || '')
		dataForm.append('type', values.type)
		startTransition(async () => {
			try {
				const data = await createPage(workspaceId, dataForm)
				if (data?.status === 'success') {
					toast({
						title: 'Page created successfully',
						description: 'Your page has been created successfully',
					})
					localStorage.removeItem('create-page-form')
					router.push(`/workspaces/${workspaceId}/pages/${data?.page?.id}`)
				}
			} catch (error) {
				toast({
					title: 'Error',
					description: 'An error occurred while creating your page',
				})
			}
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' className=''>
					+ New Page
				</Button>
			</DialogTrigger>
			<DialogContent className='border rounded-md'>
				<DialogHeader>
					<DialogTitle>New Page</DialogTitle>
					<DialogDescription>
						New pages are created in your personal space tasks, notes, and more.
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
							type: {
								fieldType: 'select',
								inputProps: {
									placeholder: 'Select page type',
									defaultValue: 'Documents',
								},
								description: 'Select the type of page you want to create',
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
