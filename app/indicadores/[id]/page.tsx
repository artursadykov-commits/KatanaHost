import { notFound } from "next/navigation";
import { INDICADORES, getIndicador } from "@/data/indicadores";
import Header from "@/components/Header";
import ProyeccionChartWrapper from "@/components/ProyeccionChartWrapper";
import ExportarExcelWrapper from "@/components/ExportarExcelWrapper";
import { TrendingUp, TrendingDown, Minus, CheckCircle, Database, BookOpen } from "lucide-react";

export function generateStaticParams() {
  return INDICADORES.map((ind) => ({ id: ind.id }));
}

const iconoTendencia = { alza: TrendingUp, baja: TrendingDown, estable: Minus };
const colorTendencia: Record<string, string> = {
  alza: "text-red-500 bg-red-50 border-red-200",
  baja: "text-green-600 bg-green-50 border-green-200",
  estable: "text-yellow-600 bg-yellow-50 border-yellow-200",
};

export default async function IndicadorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ind = getIndicador(id);
  if (!ind) notFound();

  const Icon = iconoTendencia[ind.tendencia];
  const signo = ind.variacionAnual > 0 ? "+" : "";

  // Tabla: últimos 12 meses histórico + primeros 24 meses proyección
  const idxCorte = ind.serie.findIndex((p) => p.tipo === "proyeccion");
  const tablaHist = ind.serie.slice(Math.max(0, idxCorte - 12), idxCorte);
  const tablaProy = ind.serie.slice(idxCorte, idxCorte + 24);

  // Proyección a 5 años: valores anuales
  const proyAnuales: { año: number; valor: number }[] = [];
  for (let y = 0; y < 5; y++) {
    const mes = ind.serie[idxCorte + y * 12 + 11];
    if (mes) proyAnuales.push({ año: new Date().getFullYear() + y, valor: mes.valor });
  }

  return (
    <div className="flex-1 flex flex-col">
      <Header titulo={ind.nombre} subtitulo={ind.descripcion} />

      <div className="p-8 flex-1 space-y-6">
        {/* KPIs superiores */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Valor actual</p>
            <p className="text-2xl font-bold text-gray-900">{ind.ultimoValor.toLocaleString("es-CL")}</p>
            <p className="text-xs text-gray-400 mt-0.5">{ind.unidad} · Abr 2024</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Var. anual proyectada</p>
            <span className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full border ${colorTendencia[ind.tendencia]}`}>
              <Icon className="w-4 h-4" />
              {signo}{ind.variacionAnual}% anual
            </span>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Horizonte proyectado</p>
            <p className="text-2xl font-bold text-gray-900">5 años</p>
            <p className="text-xs text-gray-400 mt-0.5">Apertura mensual</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Valor proyectado 2029</p>
            <p className="text-2xl font-bold text-gray-900">
              {proyAnuales[4]?.valor.toLocaleString("es-CL") ?? "—"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{ind.unidad}</p>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">Histórico y Proyección 2022–2029</h2>
              <p className="text-xs text-gray-400 mt-0.5">Azul: histórico real · Naranja: proyección base + banda de incertidumbre 80%</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-1 rounded-full font-medium">
                Actualización: mensual
              </span>
              <ExportarExcelWrapper indicador={ind} />
            </div>
          </div>
          <ProyeccionChartWrapper serie={ind.serie} unidad={ind.unidad} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Proyección anual */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              Proyección anual (diciembre de cada año)
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs text-gray-400 pb-2 font-medium">Año</th>
                  <th className="text-right text-xs text-gray-400 pb-2 font-medium">{ind.unidad}</th>
                  <th className="text-right text-xs text-gray-400 pb-2 font-medium">Var. vs. actual</th>
                </tr>
              </thead>
              <tbody>
                {proyAnuales.map((p) => {
                  const varPct = ((p.valor - ind.ultimoValor) / ind.ultimoValor) * 100;
                  const pos = varPct >= 0;
                  return (
                    <tr key={p.año} className="border-b border-gray-50">
                      <td className="py-2.5 font-medium text-gray-700">{p.año}</td>
                      <td className="py-2.5 text-right font-semibold text-gray-900">{p.valor.toLocaleString("es-CL")}</td>
                      <td className={`py-2.5 text-right text-xs font-semibold ${pos ? "text-red-500" : "text-green-600"}`}>
                        {pos ? "+" : ""}{varPct.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Supuestos */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              Supuestos de la proyección
            </h2>
            <ul className="space-y-2">
              {ind.supuestos.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                <span className="font-medium">Fuente:</span> {ind.fuente}
              </p>
            </div>
          </div>
        </div>

        {/* Tabla de valores mensuales */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Tabla de valores mensuales</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-gray-400 pb-2 font-medium">Período</th>
                  <th className="text-right text-gray-400 pb-2 font-medium">Valor ({ind.unidad})</th>
                  <th className="text-left text-gray-400 pb-2 font-medium pl-4">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {tablaHist.map((p) => (
                  <tr key={p.fecha} className="border-b border-gray-50">
                    <td className="py-1.5 text-gray-700 font-medium">{p.fecha}</td>
                    <td className="py-1.5 text-right font-semibold text-gray-900">{p.valor.toLocaleString("es-CL")}</td>
                    <td className="py-1.5 pl-4">
                      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs">Histórico</span>
                    </td>
                  </tr>
                ))}
                {tablaProy.map((p) => (
                  <tr key={p.fecha} className="border-b border-gray-50 bg-orange-50/30">
                    <td className="py-1.5 text-gray-700 font-medium">{p.fecha}</td>
                    <td className="py-1.5 text-right font-semibold text-orange-700">{p.valor.toLocaleString("es-CL")}</td>
                    <td className="py-1.5 pl-4">
                      <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-xs border border-orange-200">Proyección</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
