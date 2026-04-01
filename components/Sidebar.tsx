"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { INDICADORES } from "@/data/indicadores";
import {
  LayoutDashboard,
  TrendingUp,
  BookOpen,
  BarChart2,
  LogOut,
} from "lucide-react";

const navPrincipal = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/metodologia", label: "Metodología", icon: BookOpen },
  { href: "/kpis", label: "KPIs del Servicio", icon: BarChart2 },
];

const iconosTendencia: Record<string, string> = {
  alza: "↑",
  baja: "↓",
  estable: "→",
};

const colorTendencia: Record<string, string> = {
  alza: "text-red-400",
  baja: "text-green-400",
  estable: "text-yellow-400",
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col border-r border-gray-700">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-6 h-6 text-green-400" />
          <div>
            <span className="font-bold text-base leading-tight text-white">Energía Honesta</span>
          </div>
        </div>
        <p className="text-xs text-gray-400">Plataforma de Proyección de Indicadores</p>
        <p className="text-xs text-gray-500 mt-1">Cliente: Sierra Gorda SCM</p>
      </div>

      {/* Nav principal */}
      <nav className="px-3 pt-4 pb-2">
        {navPrincipal.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-colors ${
                active
                  ? "bg-orange-500 text-white font-semibold"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Indicadores */}
      <div className="px-3 pt-2 flex-1 overflow-y-auto">
        <p className="text-xs text-gray-500 uppercase tracking-widest px-3 mb-2 font-semibold">
          Indicadores
        </p>
        {INDICADORES.map((ind) => {
          const active = pathname === `/indicadores/${ind.id}`;
          return (
            <Link
              key={ind.id}
              href={`/indicadores/${ind.id}`}
              className={`flex items-center justify-between px-3 py-2 rounded-lg mb-0.5 text-sm transition-colors group ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="truncate">{ind.nombre}</span>
              <span className={`text-xs font-bold ml-1 flex-shrink-0 ${active ? "text-white" : colorTendencia[ind.tendencia]}`}>
                {iconosTendencia[ind.tendencia]}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-700 space-y-2">
        <p className="text-xs text-gray-500">Actualizado: Abr 2024</p>
        <button
          onClick={async () => {
            await fetch("/api/logout", { method: "POST" });
            window.location.href = "/login";
          }}
          className="flex items-center gap-2 w-full text-xs text-gray-400 hover:text-red-400 transition-colors py-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
