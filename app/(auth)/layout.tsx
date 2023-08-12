import '../globals.css'

import { cookies } from 'next/dist/client/components/headers'
import { redirect } from 'next/navigation'
import { ThemeProvider, ThemeToggle } from '~/components/theme-provider'
import { Toaster } from '~/components/ui/toaster'
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' dir='ltr'>
			<body className='w-screen h-screen scroll-smooth bg-background text-foreground '>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<main className='p-2 rounded'>{children}</main>
					<Toaster />
					<div className='absolute bottom-2 left-2 flex justify-center items-center'>
						<ThemeToggle />
					</div>
					<div className='absolute bottom-2 right-2 flex justify-center items-center'>
						<span className='font-medium text-forground'>😎</span>
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}
