"use client";

import dynamic from "next/dynamic";
import { PuntoSerie } from "@/data/indicadores";

const ProyeccionChart = dynamic(() => import("./ProyeccionChart"), { ssr: false });

export default function ProyeccionChartWrapper({ serie, unidad }: { serie: PuntoSerie[]; unidad: string }) {
  return <ProyeccionChart serie={serie} unidad={unidad} />;
}
