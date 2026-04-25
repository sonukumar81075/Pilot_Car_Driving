import { NextResponse } from "next/server";

const AUTH_COOKIE_KEY = "pilot_auth";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.get(AUTH_COOKIE_KEY)?.value === "1";

  // My account page is no longer part of the flow.
  if (pathname.startsWith("/my-account")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Dashboard route is deprecated; keep users on home.
  if (pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Login page is removed from the primary flow.
  if (pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/my-account/:path*"],
};
