import { NextRequest, NextResponse } from "next/server";

// Landing page pública — sin autenticación
export function proxy(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
