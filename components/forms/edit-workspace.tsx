'use client'

import { Button } from '~/components/ui/button'
import AutoForm, { AutoFormSubmit } from '~/components/ui/auto-form'
import * as z from 'zod'
import { useEffect, useState, useTransition } from 'react'
import {
	deleteWorkspace,
	revalidate_path,
	updateWorkspace,
} from '~/lib/actions'
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
import { GearIcon } from '@radix-ui/react-icons'
import { Workspace } from '@prisma/client'

const schema = z.object({
	name: z
		.string()
		.nonempty('Name is required')
		.max(150, 'Name must be less than 150 characters')
		.min(5, 'Name must be at least 3 characters')
		.regex(/^[a-z0-9_\-\s\u0600-\u06FF]+$/i, 'Only letters, numbers, _ and -'),
	description: z.string().max(400).optional(),
})

export function EditWorkspaceForm({ workspace }: { workspace: Workspace }) {
	const [open, setOpen] = useState(false)
	const { toast } = useToast()
	let [isPending, startTransition] = useTransition()
	const [values, setValues] = useState<Partial<z.infer<typeof schema>>>({
		name: workspace.name,
		description: workspace.description || '',
	})

	useEffect(() => {
		const cachedValues = localStorage.getItem(`edit-workspace-${workspace.id}`)
		if (cachedValues) {
			setValues(JSON.parse(cachedValues))
		}
	}, [workspace])

	useEffect(() => {
		localStorage.setItem(
			`edit-workspace-${workspace.id}`,
			JSON.stringify(values)
		)
	}, [values, workspace])

	const handleSubmit = async (values: {
		name: string
		description?: string | undefined
		private?: boolean | undefined
	}) => {
		const formData = new FormData()
		formData.append('name', values.name)
		formData.append('description', values.description || '')
		startTransition(async () => {
			try {
				await updateWorkspace(workspace.id, formData)
				toast({
					title: 'Workspace updated successfully',
					description: 'Your workspace has been updated successfully',
				})
				localStorage.removeItem(`edit-workspace-${workspace.id}`)
				setOpen(false)
			} catch (error) {
				toast({
					title: 'Error',
					description: 'Something went wrong, please try again later',
				})
			}
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' className=''>
					<GearIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className='border rounded-md'>
				<DialogHeader>
					<DialogTitle>Edit Work Space</DialogTitle>
					<DialogDescription>Edit your workspace details</DialogDescription>
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
						<div className='grid gap-1'>
							<AutoFormSubmit>
								{isPending ? 'Editing...' : 'Edit'}
							</AutoFormSubmit>
						</div>
					</AutoForm>
				</div>
			</DialogContent>
		</Dialog>
	)
}
