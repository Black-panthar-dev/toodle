import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDashboardPath, isAppRole, roleCanAccessPath } from "@/lib/permissions";

const authPages = new Set(["/login", "/register", "/forgot-password", "/reset-password"]);

export const proxy = auth((request) => {
  const pathname = request.nextUrl.pathname;
  const session = request.auth;
  const isProtectedArea =
    pathname.startsWith("/super-admin") ||
    pathname.startsWith("/teacher") ||
    pathname.startsWith("/student");

  if (authPages.has(pathname) && session?.user?.role && isAppRole(session.user.role)) {
    return NextResponse.redirect(new URL(getDashboardPath(session.user.role), request.url));
  }

  if (!isProtectedArea) {
    return NextResponse.next();
  }

  if (!session?.user?.role || !isAppRole(session.user.role)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!roleCanAccessPath(session.user.role, pathname)) {
    return NextResponse.redirect(new URL(getDashboardPath(session.user.role), request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
