import { NextRequest, NextResponse } from "next/server";

// Credenciales demo — en producción esto vendría de una DB con hashes
const USUARIOS: Record<string, { password: string; nombre: string }> = {
  sgscm:  { password: "sierra2024", nombre: "Sierra Gorda SCM" },
  admin:  { password: "eh2024",     nombre: "Administrador" },
};

export async function POST(req: NextRequest) {
  const { usuario, password } = await req.json();

  const user = USUARIOS[usuario?.toLowerCase()];
  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, nombre: user.nombre });
  res.cookies.set("eh_session", `${usuario}:autenticado`, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 8, // 8 horas
    sameSite: "lax",
  });
  return res;
}
