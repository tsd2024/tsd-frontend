export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard", "/create-room", "/rooms/:path*", "/join"] }

