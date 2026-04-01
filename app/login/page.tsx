"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPass, setMostrarPass] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setCargando(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, password }),
    });

    setCargando(false);

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Card */}
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/20 border border-green-500/30 mb-4">
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Energía Honesta</h1>
          <p className="text-gray-400 text-sm mt-1">Plataforma de Proyección de Indicadores</p>
        </div>

        {/* Formulario */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-white font-semibold text-lg mb-6">Iniciar sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Usuario</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 text-white placeholder-gray-500 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition"
                  placeholder="Ingrese su usuario"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={mostrarPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 text-white placeholder-gray-500 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setMostrarPass(!mostrarPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {mostrarPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition text-sm mt-2"
            >
              {cargando ? "Verificando..." : "Ingresar"}
            </button>
          </form>

          {/* Credenciales demo */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-xs text-gray-500 text-center mb-3">Credenciales de acceso demo</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { usuario: "sgscm", pass: "sierra2024", label: "Sierra Gorda SCM" },
                { usuario: "admin", pass: "eh2024", label: "Admin" },
              ].map((c) => (
                <button
                  key={c.usuario}
                  type="button"
                  onClick={() => { setUsuario(c.usuario); setPassword(c.pass); setError(""); }}
                  className="text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 transition"
                >
                  <p className="text-xs text-gray-300 font-medium">{c.label}</p>
                  <p className="text-xs text-gray-500 font-mono">{c.usuario} / {c.pass}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          © 2024 Energía Honesta · Plataforma confidencial
        </p>
      </div>
    </div>
  );
}
