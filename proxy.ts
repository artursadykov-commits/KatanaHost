import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const session = req.cookies.get("eh_session")?.value;
  const pathname = req.nextUrl.pathname;

  // Rutas públicas
  if (pathname.startsWith("/login") || pathname.startsWith("/api/login")) {
    if (session) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  // Proteger todo lo demás
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
