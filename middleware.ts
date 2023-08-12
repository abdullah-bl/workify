export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    '/((?!api/auth|login|signup|_next/static|favicon).*)'
  ],
  // matcher: ["/((?!register|api|login).*)"],
};