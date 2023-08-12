export const metadata = {
	title: 'Login',
	description: 'Login to your account',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
