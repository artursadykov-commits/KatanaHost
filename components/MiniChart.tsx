"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import { PuntoSerie } from "@/data/indicadores";

interface MiniChartProps {
  serie: PuntoSerie[];
  color?: string;
}

export default function MiniChart({ serie, color = "#3b82f6" }: MiniChartProps) {
  // Mostrar solo los últimos 24 meses histórico + 12 meses proyección
  const datos = serie.slice(-36);

  return (
    <ResponsiveContainer width="100%" height={60}>
      <AreaChart data={datos} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          contentStyle={{ fontSize: 11, padding: "4px 8px" }}
          formatter={(v) => [(v as number).toLocaleString("es-CL"), ""]}
          labelStyle={{ fontSize: 10 }}
        />
        <Area
          type="monotone"
          dataKey="valor"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#grad-${color})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
