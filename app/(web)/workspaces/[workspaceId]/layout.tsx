import { getWorkspace } from '~/lib/workspaces'

export async function generateMetadata({
	params: { workspaceId },
}: {
	params: {
		workspaceId: string
	}
}) {
	const space = await getWorkspace(workspaceId)

	if (!space) {
		return {
			notFound: true,
		}
	}

	return {
		title: space.name,
		description: space.description,
	}
}

export default function SpaceLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<div className='w-full h-full'>{children}</div>
		</>
	)
}
