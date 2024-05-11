import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const onlyAdminPage = ["/home/admin", "/home/admin/accounts"]

export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = [],) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;
        if (requireAuth.includes(pathname)) {
            const token = await getToken({
                req,
                secret: "process.env.NEXTAUTH_SECRET",
            });
            if (!token) {
                const url = new URL('/auth/sign-in', req.url)
                url.searchParams.set('callbackUrl', encodeURI(req.url))
                return Response.redirect(url)
            }
            if (token.role !== "admin" && onlyAdminPage.includes(pathname)) {
                return NextResponse.redirect(new URL('/home/user', req.url))
            }
        }
        return middleware(req, next);
    }
}