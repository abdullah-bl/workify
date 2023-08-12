import '../globals.css'
import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import Navbar from '../navbar'
import { cn } from '~/lib/utils'
import Providers from '../providers'

const font = IBM_Plex_Sans_Arabic({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['arabic'],
})

export const metadata: Metadata = {
	title: 'Spaces 🚀',
	description: 'Spaces is a place where you can create your own workspace',
	themeColor: '#000000',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' dir='auto'>
			<body className={cn([font.className, 'w-screen flex p-2'])}>
				<Providers>
					<Navbar />
					<main className='mt-12 flex-1'>{children}</main>
				</Providers>
			</body>
		</html>
	)
}
