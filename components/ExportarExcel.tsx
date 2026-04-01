"use client";

import { Download } from "lucide-react";
import { Indicador } from "@/data/indicadores";
import * as XLSX from "xlsx";

interface Props {
  indicador: Indicador;
}

export default function ExportarExcel({ indicador }: Props) {
  function exportar() {
    const wb = XLSX.utils.book_new();

    // ── Hoja 1: Serie completa ─────────────────────────────────
    const filasCompletas = indicador.serie.map((p) => ({
      "Período": p.fecha,
      "Tipo": p.tipo === "historico" ? "Histórico" : "Proyección",
      [`Valor (${indicador.unidad})`]: p.valor,
      ...(p.tipo === "proyeccion"
        ? {
            "Banda Superior (80%)": p.valorSup ?? "",
            "Banda Inferior (80%)": p.valorInf ?? "",
          }
        : {}),
    }));
    const ws1 = XLSX.utils.json_to_sheet(filasCompletas);
    ws1["!cols"] = [{ wch: 12 }, { wch: 12 }, { wch: 20 }, { wch: 22 }, { wch: 22 }];
    XLSX.utils.book_append_sheet(wb, ws1, "Serie Completa");

    // ── Hoja 2: Resumen anual ──────────────────────────────────
    const proyeccion = indicador.serie.filter((p) => p.tipo === "proyeccion");
    const idxCorte = indicador.serie.findIndex((p) => p.tipo === "proyeccion");
    const ultimoHist = indicador.serie[idxCorte - 1];
    const mesesNombres = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
    const getAnio = (fecha: string) => parseInt(fecha.split(" ")[1]);

    const resumenAnual: Record<number, { dic?: number; sup?: number; inf?: number }> = {};
    proyeccion.forEach((p) => {
      const mes = p.fecha.split(" ")[0];
      if (mes === "Dic") {
        const anio = getAnio(p.fecha);
        resumenAnual[anio] = { dic: p.valor, sup: p.valorSup, inf: p.valorInf };
      }
    });

    const filasSummary = [
      {
        "Año": getAnio(ultimoHist.fecha),
        "Valor Dic": ultimoHist.valor,
        "Banda Superior": "",
        "Banda Inferior": "",
        "Variación vs. actual": "—",
        "Tipo": "Histórico (base)",
      },
      ...Object.entries(resumenAnual).map(([anio, d]) => {
        const varPct = ((d.dic! - indicador.ultimoValor) / indicador.ultimoValor * 100).toFixed(1);
        return {
          "Año": parseInt(anio),
          "Valor Dic": d.dic,
          "Banda Superior": d.sup ?? "",
          "Banda Inferior": d.inf ?? "",
          "Variación vs. actual": `${parseFloat(varPct) >= 0 ? "+" : ""}${varPct}%`,
          "Tipo": "Proyección",
        };
      }),
    ];
    const ws2 = XLSX.utils.json_to_sheet(filasSummary);
    ws2["!cols"] = [{ wch: 8 }, { wch: 14 }, { wch: 16 }, { wch: 16 }, { wch: 22 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, ws2, "Resumen Anual");

    // ── Hoja 3: Supuestos ──────────────────────────────────────
    const filasMeta = [
      { "Campo": "Indicador", "Valor": indicador.nombre },
      { "Campo": "Unidad", "Valor": indicador.unidad },
      { "Campo": "Descripción", "Valor": indicador.descripcion },
      { "Campo": "Fuente", "Valor": indicador.fuente },
      { "Campo": "Metodología", "Valor": indicador.metodologia },
      { "Campo": "", "Valor": "" },
      { "Campo": "Supuestos", "Valor": "" },
      ...indicador.supuestos.map((s, i) => ({ "Campo": `  ${i + 1}.`, "Valor": s })),
      { "Campo": "", "Valor": "" },
      { "Campo": "Generado por", "Valor": "Energía Honesta — Plataforma de Proyección de Indicadores" },
      { "Campo": "Fecha exportación", "Valor": new Date().toLocaleDateString("es-CL") },
    ];
    const ws3 = XLSX.utils.json_to_sheet(filasMeta);
    ws3["!cols"] = [{ wch: 16 }, { wch: 70 }];
    XLSX.utils.book_append_sheet(wb, ws3, "Metodología y Supuestos");

    XLSX.writeFile(wb, `ProyeccionIndicador_${indicador.id}_EnergiaHonesta.xlsx`);
  }

  return (
    <button
      onClick={exportar}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
    >
      <Download className="w-4 h-4" />
      Exportar Excel
    </button>
  );
}
