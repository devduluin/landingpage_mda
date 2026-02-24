import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

const PUBLIC_ROUTES = [
  "/", 
  "/login",          
  "/tentang-kami",
  "/produk",         
  "/view-profile",   
];

const PUBLIC_API = [
  "/api/auth/login",
  "/api/leads",
];

function isPublicRoute(pathname: string) {
  if (PUBLIC_ROUTES.includes(pathname)) return true;

  if (pathname.startsWith("/produk")) return true;
  if (pathname.startsWith("/view-profile")) return true;

  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;

  if (pathname === "/login") {
    if (!token) return NextResponse.next();
    const verified = await verifyToken(token);
    if (verified) return NextResponse.redirect(new URL("/dashboard", req.url));
    return NextResponse.next();
  }

  if (isPublicRoute(pathname)) return NextResponse.next();

  if (PUBLIC_API.some((p) => pathname.startsWith(p))) return NextResponse.next();

  if (pathname.startsWith("/dashboard")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    const verified = await verifyToken(token);
    if (!verified) return NextResponse.redirect(new URL("/login", req.url));

    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const verified = await verifyToken(token);
    if (!verified) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};