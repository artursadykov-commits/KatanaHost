import Header from "@/components/Header";
import { CheckCircle, Clock, Server, BarChart2, AlertTriangle } from "lucide-react";

const kpis = [
  {
    id: "TA",
    familia: "Tiempo",
    nombre: "Tiempo de Atención (TA)",
    descripcion: "Tiempo de respuesta a requerimientos de SGSCM (dudas o aclaración).",
    unidad: "días",
    periodicidad: "Mensual",
    meta: "≤ 1 día",
    minimo: "> 1 día",
    esperado: "1 día",
    maximo: "0 días",
    peso: "33%",
    icon: Clock,
    color: "blue",
    valorActual: 0.8,
    estado: "ok",
  },
  {
    id: "TR",
    familia: "Tiempo",
    nombre: "Tiempo de Resolución (TR)",
    descripcion: "Tiempo de creación de nuevo indicador solicitado por SGSCM.",
    unidad: "meses",
    periodicidad: "Por evento",
    meta: "≤ 2 meses",
    minimo: "> 2 meses",
    esperado: "2 meses",
    maximo: "< 2 meses",
    peso: "33%",
    icon: BarChart2,
    color: "orange",
    valorActual: 1.5,
    estado: "ok",
  },
  {
    id: "DS",
    familia: "Disponibilidad",
    nombre: "Disponibilidad de Servicio (DS)",
    descripcion: "Indisponibilidad de la plataforma (días fuera de servicio).",
    unidad: "días",
    periodicidad: "Mensual",
    meta: "0 días caída",
    minimo: "≥ 1 día caída",
    esperado: "—",
    maximo: "—",
    peso: "33%",
    icon: Server,
    color: "green",
    valorActual: 0,
    estado: "ok",
  },
];

const multiplicadores = [
  { min: 100, max: null, mult: "100%" },
  { min: 96, max: 100, mult: "97%" },
  { min: 87, max: 96, mult: "94%" },
  { min: 77, max: 87, mult: "91%" },
  { min: 67, max: 77, mult: "88%" },
  { min: 0, max: 67, mult: "85%" },
];

const colorKpi: Record<string, string> = {
  blue: "bg-blue-50 border-blue-200 text-blue-700",
  orange: "bg-orange-50 border-orange-200 text-orange-700",
  green: "bg-green-50 border-green-200 text-green-700",
};

const iconColor: Record<string, string> = {
  blue: "text-blue-500 bg-blue-100",
  orange: "text-orange-500 bg-orange-100",
  green: "text-green-500 bg-green-100",
};

export default function KpisPage() {
  // MDC simulado
  const mdcSimulado = 98.5;
  const multActual = multiplicadores.find(
    (m) => mdcSimulado >= m.min && (m.max === null || mdcSimulado < m.max)
  );

  return (
    <div className="flex-1 flex flex-col">
      <Header
        titulo="KPIs del Servicio"
        subtitulo="Indicadores clave de desempeño del contrato — Medición mensual"
      />

      <div className="p-8 flex-1 space-y-6">
        {/* MDC simulado */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium">MDC — Medición de Desempeño del Contratista</p>
              <p className="text-4xl font-bold mt-1">{mdcSimulado}%</p>
              <p className="text-blue-200 text-xs mt-2">Abril 2024 · Multiplicador EDP: <span className="text-white font-bold">{multActual?.mult}</span></p>
            </div>
            <div className="text-right">
              <CheckCircle className="w-12 h-12 text-green-300 ml-auto" />
              <p className="text-sm text-blue-200 mt-1">Cumplimiento óptimo</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-500">
            <p className="text-xs text-blue-200 font-mono">
              MDC = 0.33 × TA + 0.33 × TR + 0.33 × DS
            </p>
          </div>
        </div>

        {/* Cards KPI */}
        <div className="grid grid-cols-3 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.id} className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor[kpi.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full border ${colorKpi[kpi.color]}`}>
                    Peso: {kpi.peso}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{kpi.familia}</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{kpi.nombre}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{kpi.descripcion}</p>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Periodicidad</span>
                    <span className="font-medium text-gray-700">{kpi.periodicidad}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Meta mínima</span>
                    <span className="font-medium text-red-500">{kpi.minimo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Meta esperada</span>
                    <span className="font-medium text-orange-500">{kpi.esperado}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Meta óptima</span>
                    <span className="font-medium text-green-600">{kpi.maximo}</span>
                  </div>
                </div>
                <div className={`rounded-lg p-3 border ${colorKpi[kpi.color]}`}>
                  <p className="text-xs font-medium">Valor actual (Abr 2024)</p>
                  <p className="text-xl font-bold mt-0.5">{kpi.valorActual} {kpi.unidad}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="w-3 h-3" />
                    <span className="text-xs">Dentro de meta óptima</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabla multiplicadores */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4">
            Tabla Multiplicador EDP según resultado MDC
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs text-gray-400 pb-2 font-medium">Rango MDC</th>
                <th className="text-right text-xs text-gray-400 pb-2 font-medium">Multiplicador EDP</th>
                <th className="text-right text-xs text-gray-400 pb-2 font-medium">Ejemplo (EDP $20M)</th>
              </tr>
            </thead>
            <tbody>
              {multiplicadores.map((m) => {
                const rango =
                  m.max === null
                    ? `MDC = 100%`
                    : `${m.min}% ≤ MDC < ${m.max}%`;
                const ejemplo = (20_000_000 * parseInt(m.mult) / 100).toLocaleString("es-CL");
                const esActual =
                  mdcSimulado >= m.min && (m.max === null || mdcSimulado < m.max);
                return (
                  <tr
                    key={m.min}
                    className={`border-b border-gray-50 ${esActual ? "bg-green-50" : ""}`}
                  >
                    <td className={`py-2.5 font-medium ${esActual ? "text-green-700" : "text-gray-700"}`}>
                      {rango}
                      {esActual && (
                        <span className="ml-2 text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded">
                          ← actual
                        </span>
                      )}
                    </td>
                    <td className={`py-2.5 text-right font-bold ${esActual ? "text-green-700" : "text-gray-900"}`}>
                      {m.mult}
                    </td>
                    <td className="py-2.5 text-right text-gray-500 text-xs">
                      ${ejemplo}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Nota ciberseguridad */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-700">Compromiso de disponibilidad y ciberseguridad</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              La plataforma opera sobre infraestructura cloud con SLA de disponibilidad 99.5% mensual.
              Se cuenta con plan de continuidad operativa, backups diarios y mecanismos de recuperación ante
              fallos. Cualquier mantención programada será informada con al menos 72 horas de anticipación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
