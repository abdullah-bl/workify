'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { deleteWorkspace } from '~/lib/actions'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import { useToast } from '~/components/ui/use-toast'

export function DeleteWorkspaceDialog({
	workspaceId,
}: {
	workspaceId: string
}) {
	const { toast } = useToast()
	const router = useRouter()
	let [isDeleting, startDeleteTransition] = useTransition()

	const onConfirm = async () => {
		startDeleteTransition(async () => {
			try {
				const data = await deleteWorkspace(workspaceId)
				toast({
					title: 'Workspace deleted',
					description: 'Your workspace has been deleted',
				})
				router.back()
			} catch (error) {
				console.log(error)
				toast({
					title: 'Something went wrong',
					description: 'Your workspace could not be deleted',
				})
			}
		})
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant='destructive'>
					<TrashIcon />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						space and all of its data.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onConfirm}>
						{isDeleting ? 'Deleting...' : 'Delete'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
