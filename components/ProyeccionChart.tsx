"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import { PuntoSerie } from "@/data/indicadores";

interface Props {
  serie: PuntoSerie[];
  unidad: string;
}

const CustomTooltip = ({ active, payload, label, unidad }: any) => {
  if (!active || !payload?.length) return null;
  const tipo = payload[0]?.payload?.tipo;
  const val = payload.find((p: any) => p.dataKey === "historico" || p.dataKey === "proyeccion");
  const sup = payload.find((p: any) => p.dataKey === "valorSup");
  const inf = payload.find((p: any) => p.dataKey === "valorInf");

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs min-w-[160px]">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {val?.value != null && (
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Valor central</span>
          <span className="font-bold text-gray-900">{Number(val.value).toLocaleString("es-CL")} {unidad}</span>
        </div>
      )}
      {sup?.value != null && inf?.value != null && (
        <>
          <div className="flex justify-between gap-4 mt-1">
            <span className="text-orange-400">Escenario alto</span>
            <span className="font-semibold text-orange-600">{Number(sup.value).toLocaleString("es-CL")}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-orange-400">Escenario bajo</span>
            <span className="font-semibold text-orange-600">{Number(inf.value).toLocaleString("es-CL")}</span>
          </div>
        </>
      )}
      <p className={`mt-2 font-medium text-xs ${tipo === "historico" ? "text-blue-500" : "text-orange-500"}`}>
        {tipo === "historico" ? "Valor histórico real" : "Proyección — Energía Honesta"}
      </p>
    </div>
  );
};

export default function ProyeccionChart({ serie, unidad }: Props) {
  const datos = serie.map((p) => ({
    ...p,
    historico: p.tipo === "historico" ? p.valor : undefined,
    proyeccion: p.tipo === "proyeccion" ? p.valor : undefined,
  }));

  // Empalme: el último histórico aparece también como inicio de proyección
  const idxCorte = serie.findIndex((p) => p.tipo === "proyeccion");
  if (idxCorte > 0) {
    datos[idxCorte].historico = datos[idxCorte - 1].historico;
  }

  const fechaCorte = idxCorte >= 0 ? serie[idxCorte].fecha : undefined;
  const tickInterval = Math.floor(serie.length / 16);

  return (
    <ResponsiveContainer width="100%" height={380}>
      <ComposedChart data={datos} margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
        <defs>
          <linearGradient id="gradBanda" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#f97316" stopOpacity={0.04} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="fecha"
          tick={{ fontSize: 10, fill: "#9ca3af" }}
          interval={tickInterval}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => v.toLocaleString("es-CL")}
          width={72}
        />
        <Tooltip content={<CustomTooltip unidad={unidad} />} />
        <Legend
          formatter={(value) => {
            if (value === "historico") return "Histórico (real)";
            if (value === "proyeccion") return "Proyección base";
            if (value === "valorSup") return "Banda superior (80%)";
            if (value === "valorInf") return "Banda inferior (80%)";
            return value;
          }}
          wrapperStyle={{ fontSize: 11 }}
        />

        {fechaCorte && (
          <ReferenceLine
            x={fechaCorte}
            stroke="#94a3b8"
            strokeDasharray="4 4"
            label={{ value: "Hoy", position: "insideTopRight", fontSize: 10, fill: "#94a3b8" }}
          />
        )}

        {/* Banda de incertidumbre */}
        <Area
          type="monotone"
          dataKey="valorSup"
          stroke="transparent"
          fill="url(#gradBanda)"
          dot={false}
          legendType="none"
          isAnimationActive={false}
        />
        <Area
          type="monotone"
          dataKey="valorInf"
          stroke="transparent"
          fill="#ffffff"
          dot={false}
          legendType="none"
          isAnimationActive={false}
        />

        {/* Líneas de banda superiores e inferiores */}
        <Line
          type="monotone"
          dataKey="valorSup"
          stroke="#fdba74"
          strokeWidth={1}
          strokeDasharray="3 3"
          dot={false}
          activeDot={false}
          name="valorSup"
        />
        <Line
          type="monotone"
          dataKey="valorInf"
          stroke="#fdba74"
          strokeWidth={1}
          strokeDasharray="3 3"
          dot={false}
          activeDot={false}
          name="valorInf"
        />

        {/* Proyección central */}
        <Line
          type="monotone"
          dataKey="proyeccion"
          stroke="#f97316"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 4 }}
          name="proyeccion"
        />

        {/* Histórico */}
        <Line
          type="monotone"
          dataKey="historico"
          stroke="#3b82f6"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 4 }}
          name="historico"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
