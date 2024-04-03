import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const storedToken = request.cookies.get("token")?.value;

    // Pages that require authentication
    const protectedPages = [
        "/dashboard",
        "/myorders"
    ];

    // Redirect to login if accessing a protected page without a token
    if (protectedPages.includes(request.nextUrl.pathname) && !storedToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Redirect to dashboard if logged in user accesses the login page
    if (request.nextUrl.pathname === "/" && storedToken) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}
