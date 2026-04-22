import { NextResponse } from "next/server";

const AUTH_COOKIE_KEY = "pilot_auth";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.get(AUTH_COOKIE_KEY)?.value === "1";

  // Block unauthenticated users from protected routes.
  if (
    !isAuthenticated &&
    (pathname === "/" || pathname.startsWith("/dashboard") || pathname.startsWith("/my-account"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Keep authenticated users away from login page.
  if (isAuthenticated && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/my-account/:path*"],
};
