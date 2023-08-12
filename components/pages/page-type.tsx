import { Page } from '~/types'

export const PageType = (type: string) => {
	return (
		<span>
			{type === 'page' && 'Page'}
			{type === 'tasks' && 'Tasks'}
			{type === 'events' && 'Events'}
			{type === 'notes' && 'Notes'}
			{type === 'drawing' && 'Drawing'}
		</span>
	)
}
