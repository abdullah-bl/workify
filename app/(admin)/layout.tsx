import '../globals.css'
import type { Metadata } from 'next'
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google'
import Navbar from '../navbar'
import { cn } from '~/lib/utils'
import Providers from '../providers'
import { authOptions } from '~/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })
const font = IBM_Plex_Sans_Arabic({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['arabic'],
})

export const metadata: Metadata = {
	title: 'Dashboard 🚀',
	description: 'Dashboard is a place where you can manage your spaces',
	themeColor: '#fff000',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)
	const user = session?.user
	if (!user) {
		// user is not logged in
		redirect('/auth/signin')
	}
	if (user?.role !== 'admin') {
		// user is not admin
		notFound()
	}
	return (
		<html lang='en' dir='auto'>
			<body className={cn([font.className, 'w-screen flex p-2'])}>
				<Providers>
					<Navbar />
					<main className='flex-1 max-w-5xl mx-auto flex gap-2 flex-wrap'>
						<div className='grid gap-1 w-1/5 border rounded-md p-2 space-y-1'>
							<Link href='/dashboard'>Dashboard</Link>
							<Link href='/dashboard/users'>User</Link>
							<Link href='/dashboard/workspaces'>Workspaces</Link>
							<Link href='/dashboard/pages'>Pages</Link>
						</div>
						<div className='flex-1 p-2'>{children}</div>
					</main>
				</Providers>
			</body>
		</html>
	)
}
