import "../../../lib/pdfPolyfills";
import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { pdf, password } = await req.json();

    if (!pdf) {
      return NextResponse.json({ error: "Falta el PDF" }, { status: 400 });
    }

    const buffer = Buffer.from(pdf, "base64");
    const uint8 = new Uint8Array(buffer);

    // pdfjs v3 soporta disableWorker: true en Node.js
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
    pdfjsLib.GlobalWorkerOptions.workerSrc = "";

    let pdfDoc: any;
    try {
      pdfDoc = await pdfjsLib.getDocument({
        data: uint8,
        password: password ?? "",
        disableWorker: true,
        useWorkerFetch: false,
        isEvalSupported: false,
        disableAutoFetch: true,
        disableStream: true,
      }).promise;
    } catch (err: any) {
      if (err?.name === "PasswordException") {
        return NextResponse.json(
          { error: "Contraseña incorrecta. Intenta con los últimos 4 dígitos de tu RUT." },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: `Error PDF: ${err?.name} - ${err?.message}` },
        { status: 422 }
      );
    }

    const textParts: string[] = [];
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item: any) => ("str" in item ? item.str : ""))
        .join(" ");
      textParts.push(pageText);
    }

    const textoCompleto = textParts.join("\n").trim();

    if (!textoCompleto) {
      return NextResponse.json(
        { error: "No se pudo extraer texto del PDF." },
        { status: 422 }
      );
    }

    const response = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `Eres un asistente que extrae transacciones de cartolas bancarias chilenas.

Extrae TODAS las transacciones y devuelve ÚNICAMENTE un JSON válido con este formato exacto, sin texto adicional:
[
  {
    "description": "nombre del comercio o descripción",
    "amount": -15000,
    "date": "15/03/2024",
    "category": "Supermercado"
  }
]

Reglas:
- Los gastos (débitos) son números NEGATIVOS
- Los ingresos (abonos) son números POSITIVOS
- Las categorías deben ser una de: Supermercado, Combustible, Comida, Salud, Entretenimiento, Transporte, Servicios, Transferencia, Otros
- El monto debe ser en pesos chilenos (número entero, sin puntos ni comas)
- Si no hay transacciones, devuelve: []

Texto de la cartola:
${textoCompleto}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "[]";
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const transactions = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

    return NextResponse.json({ transactions });
  } catch (err: any) {
    console.error("Error procesando cartola:", err);
    return NextResponse.json(
      { error: err?.message ?? "Error procesando el PDF" },
      { status: 500 }
    );
  }
}
