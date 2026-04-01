import Header from "@/components/Header";
import { INDICADORES } from "@/data/indicadores";
import Link from "next/link";
import MiniChartWrapper from "@/components/MiniChartWrapper";
import { TrendingUp, TrendingDown, Minus, Calendar, RefreshCw } from "lucide-react";

const iconoTendencia = {
  alza: TrendingUp,
  baja: TrendingDown,
  estable: Minus,
};

const colorTendencia: Record<string, string> = {
  alza: "text-red-500 bg-red-50",
  baja: "text-green-600 bg-green-50",
  estable: "text-yellow-600 bg-yellow-50",
};

const colorBorde: Record<string, string> = {
  alza: "border-red-200",
  baja: "border-green-200",
  estable: "border-yellow-200",
};

const miniColor: Record<string, string> = {
  alza: "#ef4444",
  baja: "#22c55e",
  estable: "#f59e0b",
};

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col">
      <Header
        titulo="Dashboard — Proyección de Indicadores"
        subtitulo="Sierra Gorda SCM · Última actualización: Abril 2024"
      />

      <div className="p-8 flex-1">
        {/* Banner informativo */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <RefreshCw className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-800">Plataforma activa — Proyecciones actualizadas</p>
            <p className="text-xs text-blue-600 mt-0.5">
              Todos los indicadores cubren horizonte 2022–2029 (histórico + 5 años de proyección). Apertura mensual.
              Próxima actualización: 1 de mayo de 2024.
            </p>
          </div>
        </div>

        {/* Resumen rápido */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-xs text-gray-500">Indicadores activos</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">60</p>
              <p className="text-xs text-gray-500">Meses proyectados (5 años)</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">Mensual</p>
              <p className="text-xs text-gray-500">Frecuencia de actualización</p>
            </div>
          </div>
        </div>

        {/* Cards de indicadores */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {INDICADORES.map((ind) => {
            const Icon = iconoTendencia[ind.tendencia];
            const signo = ind.variacionAnual > 0 ? "+" : "";
            return (
              <Link
                key={ind.id}
                href={`/indicadores/${ind.id}`}
                className={`bg-white rounded-xl border ${colorBorde[ind.tendencia]} p-5 hover:shadow-md transition-shadow flex flex-col gap-3`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{ind.unidad}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5 leading-tight">{ind.nombre}</p>
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${colorTendencia[ind.tendencia]}`}>
                    <Icon className="w-3 h-3" />
                    {signo}{ind.variacionAnual}%
                  </span>
                </div>

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {ind.ultimoValor.toLocaleString("es-CL")}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">Valor actual (Abr 2024)</p>
                </div>

                <MiniChartWrapper serie={ind.serie} color={miniColor[ind.tendencia]} />

                <p className="text-xs text-blue-500 font-medium">Ver proyección →</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
