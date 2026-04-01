"use client";

import dynamic from "next/dynamic";
import { PuntoSerie } from "@/data/indicadores";

const MiniChart = dynamic(() => import("./MiniChart"), { ssr: false });

export default function MiniChartWrapper({ serie, color }: { serie: PuntoSerie[]; color?: string }) {
  return <MiniChart serie={serie} color={color} />;
}
