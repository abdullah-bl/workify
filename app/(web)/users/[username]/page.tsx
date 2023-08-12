import { notFound } from 'next/navigation'
import { prisma } from '~/lib/prisma'

const getUserByUsername = async (username: string) =>
	await prisma.user.findUnique({
		where: { username },
	})

export default async function UserDetails({
	params: { username },
}: {
	params: {
		username: string
	}
}) {
	const user = await getUserByUsername(username)
	if (!user) {
		notFound()
	}

	return <pre>{JSON.stringify(user, null, 2)}</pre>
}
