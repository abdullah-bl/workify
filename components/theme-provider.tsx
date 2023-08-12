'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { Button } from './ui/button'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function ThemeToggle() {
	const { theme, setTheme } = useTheme()

	return (
		<button
			title='Toggle theme'
			type='button'
			className='rounded'
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			{/* {theme === 'dark' ? '🌞' : '🌙'} */}
			{theme === 'dark' ? <SunIcon /> : <MoonIcon />}
		</button>
	)
}
