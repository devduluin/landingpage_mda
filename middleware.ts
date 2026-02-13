import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./src/lib/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;

  // Public routes that don't require authentication
  const PUBLIC_ROUTES = [
    "/",
    "/tentang-kami",
    "/produk",
    "/view-profile",
  ];

  // Public API routes
  const PUBLIC_API = [
    "/api/auth/login",
    "/api/leads",
  ];

  // Check if route is public
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if API route is public
  if (PUBLIC_API.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow GET requests to API (for public data)
  if (pathname.startsWith("/api") && req.method === "GET") {
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const verified = await verifyToken(token);
    if (!verified) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }

  // Protect API routes (non-GET)
  if (pathname.startsWith("/api")) {
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const verified = await verifyToken(token);
    if (!verified) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  // Redirect to home if accessing login while authenticated
  if (pathname === "/login" && token) {
    const verified = await verifyToken(token);
    if (verified) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
