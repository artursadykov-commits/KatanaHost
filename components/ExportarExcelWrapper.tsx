"use client";

import dynamic from "next/dynamic";
import { Indicador } from "@/data/indicadores";

const ExportarExcel = dynamic(() => import("./ExportarExcel"), { ssr: false });

export default function ExportarExcelWrapper({ indicador }: { indicador: Indicador }) {
  return <ExportarExcel indicador={indicador} />;
}
