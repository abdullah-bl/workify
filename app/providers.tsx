'use client'

import { Dispatch, ReactNode, SetStateAction, createContext } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
import { ToastProvider } from '~/components/ui/toast'
import useLocalStorage from '~/hooks/use-local-storage'
import { cn } from '~/lib/utils'
import { SessionProvider } from 'next-auth/react'

export const AppContext = createContext<{
	font: string
	setFont: Dispatch<SetStateAction<string>>
}>({
	font: 'Default',
	setFont: () => {},
})

export default function Providers({ children }: { children: ReactNode }) {
	const [font, setFont] = useLocalStorage<string>('font', 'Default')

	return (
		<SessionProvider>
			<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
				<ToastProvider />
				<main className='mt-12 flex-1'>{children}</main>
			</ThemeProvider>
		</SessionProvider>
	)
}
