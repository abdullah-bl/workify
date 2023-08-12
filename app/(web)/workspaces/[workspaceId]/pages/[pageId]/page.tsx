import { prisma } from '~/lib/prisma'

const getPageById = async (pageId: string, workspaceId: string) =>
	await prisma.page.findUnique({
		where: { id: pageId, workspaceId },
		include: {
			owner: true,
		},
	})

export default async function PageDetails({
	params: { workspaceId, pageId },
}: {
	params: {
		workspaceId: string
		pageId: string
	}
}) {
	const page = await getPageById(pageId, workspaceId)
	if (!page) return <div>Page not found</div>
	return <pre>{JSON.stringify(page, null, 2)}</pre>
}
