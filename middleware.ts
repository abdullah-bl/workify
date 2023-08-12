// import { cookies, headers } from 'next/dist/client/components/headers'
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server';
// import { getUserFromCookie } from './lib/auth';
// import { revalidatePath } from 'next/cache';

// export async function middleware(req: NextRequest) {
//   // const res = NextResponse.next()
//   const user = getUserFromCookie(req.cookies as any)
//   // const pathnameIsMissingLocale = i18n.locales.every(
//   //   (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//   // )
//   // console.log('middleware.ts', user)
//   if (!user) {
//     // We need an absolute URL. This makes sure, we get the current host.
//     const url = req.nextUrl.clone()
//     // revalidatePath(url.pathname)
//     url.pathname = `/login`
//     return NextResponse.redirect(url)
//   }

//   return NextResponse.next()
// }

// export const config = {
//   /* Matches all request paths except for the ones starting with: */
//   matcher: [
//     '/((?!api/auth|login|signup|_next/static|favicon).*)'
//   ],

// }

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    '/((?!api/auth|login|signup|_next/static|favicon).*)'
  ],
  // matcher: ["/((?!register|api|login).*)"],
};