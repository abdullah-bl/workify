import { getServerSession } from 'next-auth'
import { authOptions } from '~/lib/auth'

export default async function Profile() {
	const session = await getServerSession(authOptions)
	const user = session?.user
	return (
		<>
			<section className='bg-ct-blue-600  min-h-screen pt-20'>
				<div className='max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center'>
					<div>
						<p className='mb-3 text-5xl text-center font-semibold'>
							Profile PageZ
						</p>
						<div className='flex items-center gap-8'>
							<pre>{JSON.stringify(user, null, 2)}</pre>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
