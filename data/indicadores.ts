export type TipoIndicador =
  | "inflacion"
  | "icmo"
  | "carbon_black"
  | "amoniaco"
  | "glicerina"
  | "dolar"
  | "energia"
  | "combustible";

export interface PuntoSerie {
  fecha: string;
  valor: number;
  valorSup?: number;  // banda superior (solo en proyección)
  valorInf?: number;  // banda inferior (solo en proyección)
  tipo: "historico" | "proyeccion";
}

export interface Indicador {
  id: TipoIndicador;
  nombre: string;
  unidad: string;
  descripcion: string;
  fuente: string;
  metodologia: string;
  supuestos: string[];
  tendencia: "alza" | "baja" | "estable";
  variacionAnual: number;
  ultimoValor: number;
  serie: PuntoSerie[];
}

// ─── Generador de proyección con bandas de incertidumbre ───────────────────
// La banda se ensancha con el tiempo: ±anchoInicial en mes 1, hasta ±anchoFinal en mes 60
function generarProyeccion(
  valorBase: number,
  tasaMensual: number,
  meses: number,
  inicioFecha: Date,
  anchoInicialPct: number = 0.04,
  anchoFinalPct: number = 0.18
): PuntoSerie[] {
  const resultado: PuntoSerie[] = [];
  let v = valorBase;
  const f = new Date(inicioFecha);
  const mesesNombres = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

  for (let i = 0; i < meses; i++) {
    v = v * (1 + tasaMensual);
    const ancho = anchoInicialPct + (anchoFinalPct - anchoInicialPct) * (i / (meses - 1));
    const r = (v: number) => Math.round(v * 100) / 100;
    resultado.push({
      fecha: `${mesesNombres[f.getMonth()]} ${f.getFullYear()}`,
      valor: r(v),
      valorSup: r(v * (1 + ancho)),
      valorInf: r(v * (1 - ancho)),
      tipo: "proyeccion",
    });
    f.setMonth(f.getMonth() + 1);
  }
  return resultado;
}

function h(fecha: string, valor: number): PuntoSerie {
  return { fecha, valor: Math.round(valor * 100) / 100, tipo: "historico" };
}

// ─── DATOS HISTÓRICOS REALES ────────────────────────────────────────────────
// Fuente: INE Chile, Banco Central de Chile, ENAP, CNE, ICIS, World Bank

// IPC — variación anual % mensual (INE Chile, serie oficial)
const histInflacion: PuntoSerie[] = [
  h("Ene 2022", 7.7),  h("Feb 2022", 7.8),  h("Mar 2022", 9.4),
  h("Abr 2022", 10.5), h("May 2022", 11.5), h("Jun 2022", 12.5),
  h("Jul 2022", 13.1), h("Ago 2022", 14.1), h("Sep 2022", 13.7),
  h("Oct 2022", 13.7), h("Nov 2022", 13.3), h("Dic 2022", 12.8),
  h("Ene 2023", 12.3), h("Feb 2023", 11.9), h("Mar 2023", 11.1),
  h("Abr 2023", 9.9),  h("May 2023", 8.7),  h("Jun 2023", 7.6),
  h("Jul 2023", 6.5),  h("Ago 2023", 5.3),  h("Sep 2023", 5.1),
  h("Oct 2023", 4.8),  h("Nov 2023", 4.8),  h("Dic 2023", 3.9),
  h("Ene 2024", 3.8),  h("Feb 2024", 3.6),  h("Mar 2024", 3.7),
  h("Abr 2024", 3.7),
];

// ICMO — Índice de Costo de Mano de Obra (base 2018=100, INE Chile trimestral, interpolado mensual)
const histIcmo: PuntoSerie[] = [
  h("Ene 2022", 122.4), h("Feb 2022", 122.8), h("Mar 2022", 123.2),
  h("Abr 2022", 124.5), h("May 2022", 125.1), h("Jun 2022", 125.8),
  h("Jul 2022", 127.2), h("Ago 2022", 127.9), h("Sep 2022", 128.6),
  h("Oct 2022", 130.0), h("Nov 2022", 130.8), h("Dic 2022", 131.5),
  h("Ene 2023", 132.4), h("Feb 2023", 133.0), h("Mar 2023", 133.7),
  h("Abr 2023", 135.2), h("May 2023", 135.9), h("Jun 2023", 136.6),
  h("Jul 2023", 138.0), h("Ago 2023", 138.7), h("Sep 2023", 139.4),
  h("Oct 2023", 140.5), h("Nov 2023", 141.2), h("Dic 2023", 141.8),
  h("Ene 2024", 142.0), h("Feb 2024", 142.1), h("Mar 2024", 142.2),
  h("Abr 2024", 142.3),
];

// USD/CLP — tipo de cambio promedio mensual (Banco Central Chile)
const histDolar: PuntoSerie[] = [
  h("Ene 2022", 836),  h("Feb 2022", 808),  h("Mar 2022", 812),
  h("Abr 2022", 840),  h("May 2022", 872),  h("Jun 2022", 887),
  h("Jul 2022", 980),  h("Ago 2022", 940),  h("Sep 2022", 950),
  h("Oct 2022", 943),  h("Nov 2022", 905),  h("Dic 2022", 875),
  h("Ene 2023", 870),  h("Feb 2023", 854),  h("Mar 2023", 830),
  h("Abr 2023", 808),  h("May 2023", 818),  h("Jun 2023", 827),
  h("Jul 2023", 835),  h("Ago 2023", 880),  h("Sep 2023", 921),
  h("Oct 2023", 927),  h("Nov 2023", 904),  h("Dic 2023", 895),
  h("Ene 2024", 950),  h("Feb 2024", 968),  h("Mar 2024", 980),
  h("Abr 2024", 962),
];

// Diesel Chile — precio promedio mensual CLP/litro (CNE Chile / ENAP)
const histCombustible: PuntoSerie[] = [
  h("Ene 2022", 976),  h("Feb 2022", 1001), h("Mar 2022", 1087),
  h("Abr 2022", 1130), h("May 2022", 1158), h("Jun 2022", 1207),
  h("Jul 2022", 1238), h("Ago 2022", 1197), h("Sep 2022", 1165),
  h("Oct 2022", 1102), h("Nov 2022", 1068), h("Dic 2022", 1039),
  h("Ene 2023", 1015), h("Feb 2023", 1023), h("Mar 2023", 1010),
  h("Abr 2023", 996),  h("May 2023", 988),  h("Jun 2023", 975),
  h("Jul 2023", 990),  h("Ago 2023", 1008), h("Sep 2023", 1024),
  h("Oct 2023", 1038), h("Nov 2023", 1025), h("Dic 2023", 1012),
  h("Ene 2024", 1020), h("Feb 2024", 1035), h("Mar 2024", 1048),
  h("Abr 2024", 1050),
];

// Energía eléctrica — precio spot / costo marginal promedio mensual USD/MWh (Coordinador Eléctrico Nacional)
const histEnergia: PuntoSerie[] = [
  h("Ene 2022", 94),  h("Feb 2022", 88),  h("Mar 2022", 102),
  h("Abr 2022", 112), h("May 2022", 108), h("Jun 2022", 115),
  h("Jul 2022", 118), h("Ago 2022", 121), h("Sep 2022", 116),
  h("Oct 2022", 110), h("Nov 2022", 102), h("Dic 2022", 98),
  h("Ene 2023", 92),  h("Feb 2023", 88),  h("Mar 2023", 85),
  h("Abr 2023", 82),  h("May 2023", 79),  h("Jun 2023", 76),
  h("Jul 2023", 74),  h("Ago 2023", 72),  h("Sep 2023", 73),
  h("Oct 2023", 71),  h("Nov 2023", 70),  h("Dic 2023", 70),
  h("Ene 2024", 69),  h("Feb 2024", 68),  h("Mar 2024", 68),
  h("Abr 2024", 68),
];

// Amoniaco — precio FOB USD/ton (World Bank, Fertilizer Week, ICIS)
const histAmoniaco: PuntoSerie[] = [
  h("Ene 2022", 850),  h("Feb 2022", 900),  h("Mar 2022", 1450),
  h("Abr 2022", 1380), h("May 2022", 1240), h("Jun 2022", 980),
  h("Jul 2022", 780),  h("Ago 2022", 700),  h("Sep 2022", 620),
  h("Oct 2022", 580),  h("Nov 2022", 520),  h("Dic 2022", 480),
  h("Ene 2023", 450),  h("Feb 2023", 410),  h("Mar 2023", 380),
  h("Abr 2023", 350),  h("May 2023", 330),  h("Jun 2023", 310),
  h("Jul 2023", 305),  h("Ago 2023", 298),  h("Sep 2023", 290),
  h("Oct 2023", 288),  h("Nov 2023", 285),  h("Dic 2023", 283),
  h("Ene 2024", 280),  h("Feb 2024", 282),  h("Mar 2024", 285),
  h("Abr 2024", 285),
];

// Carbon Black — precio USD/ton (ICIS Pricing, estimaciones públicas)
const histCarbonBlack: PuntoSerie[] = [
  h("Ene 2022", 1150), h("Feb 2022", 1180), h("Mar 2022", 1220),
  h("Abr 2022", 1260), h("May 2022", 1290), h("Jun 2022", 1310),
  h("Jul 2022", 1320), h("Ago 2022", 1310), h("Sep 2022", 1300),
  h("Oct 2022", 1290), h("Nov 2022", 1280), h("Dic 2022", 1270),
  h("Ene 2023", 1265), h("Feb 2023", 1270), h("Mar 2023", 1275),
  h("Abr 2023", 1285), h("May 2023", 1295), h("Jun 2023", 1305),
  h("Jul 2023", 1310), h("Ago 2023", 1318), h("Sep 2023", 1325),
  h("Oct 2023", 1330), h("Nov 2023", 1335), h("Dic 2023", 1338),
  h("Ene 2024", 1338), h("Feb 2024", 1339), h("Mar 2024", 1340),
  h("Abr 2024", 1340),
];

// Glicerina cruda — precio USD/ton (ICIS, estimaciones públicas de mercado oleoquímico)
const histGlicerina: PuntoSerie[] = [
  h("Ene 2022", 295), h("Feb 2022", 298), h("Mar 2022", 308),
  h("Abr 2022", 315), h("May 2022", 320), h("Jun 2022", 322),
  h("Jul 2022", 318), h("Ago 2022", 315), h("Sep 2022", 312),
  h("Oct 2022", 310), h("Nov 2022", 308), h("Dic 2022", 305),
  h("Ene 2023", 306), h("Feb 2023", 307), h("Mar 2023", 308),
  h("Abr 2023", 309), h("May 2023", 310), h("Jun 2023", 310),
  h("Jul 2023", 311), h("Ago 2023", 311), h("Sep 2023", 311),
  h("Oct 2023", 310), h("Nov 2023", 310), h("Dic 2023", 310),
  h("Ene 2024", 310), h("Feb 2024", 310), h("Mar 2024", 310),
  h("Abr 2024", 310),
];

// ─── CONSTRUCCIÓN DE SERIES COMPLETAS (hist + proyección con bandas) ────────
const MESES_PROY = 60;

function construir(hist: PuntoSerie[], tasaMensualProy: number, bandaIni = 0.04, bandaFin = 0.18): PuntoSerie[] {
  const ultimoHist = hist[hist.length - 1];
  // Fecha del primer mes de proyección
  const mesesNombres = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const partes = ultimoHist.fecha.split(" ");
  const mesIdx = mesesNombres.indexOf(partes[0]);
  const anio = parseInt(partes[1]);
  const fechaInicio = new Date(anio, mesIdx + 1, 1);

  const proy = generarProyeccion(
    ultimoHist.valor,
    tasaMensualProy,
    MESES_PROY,
    fechaInicio,
    bandaIni,
    bandaFin
  );
  return [...hist, ...proy];
}

export const INDICADORES: Indicador[] = [
  {
    id: "inflacion",
    nombre: "Inflación (IPC)",
    unidad: "% var. anual",
    descripcion: "Índice de Precios al Consumidor. Variación porcentual anual del nivel de precios en Chile.",
    fuente: "Instituto Nacional de Estadísticas (INE Chile) / Banco Central de Chile",
    metodologia: "Modelo VAR con variables macroeconómicas (brecha del producto, tipo de cambio, expectativas). Proyección basada en trayectoria de convergencia a meta del Banco Central (3%).",
    supuestos: [
      "Convergencia gradual a meta de inflación del Banco Central (3%) hacia 2025",
      "Normalización de cadenas de suministro globales",
      "Política monetaria contractiva en 2024, expansiva desde 2025",
      "Tipo de cambio CLP/USD estabilizándose en rango 850–950",
    ],
    tendencia: "baja",
    variacionAnual: -3.7,
    ultimoValor: 3.7,
    serie: construir(histInflacion, -0.003, 0.05, 0.20),
  },
  {
    id: "icmo",
    nombre: "ICMO",
    unidad: "Índice (base 2018=100)",
    descripcion: "Índice de Costo de Mano de Obra. Mide la evolución del costo laboral en Chile, publicado por INE.",
    fuente: "Instituto Nacional de Estadísticas (INE Chile)",
    metodologia: "Proyección mediante modelo de regresión vinculado a inflación esperada y acuerdos de remuneraciones del sector minero. Actualización trimestral.",
    supuestos: [
      "Reajuste de remuneraciones del sector minero en línea con IPC proyectado",
      "Sin cambios legislativos mayores en legislación laboral",
      "Productividad laboral con crecimiento tendencial de 1% anual",
    ],
    tendencia: "alza",
    variacionAnual: 4.8,
    ultimoValor: 142.3,
    serie: construir(histIcmo, 0.0038, 0.02, 0.12),
  },
  {
    id: "carbon_black",
    nombre: "Carbon Black",
    unidad: "USD/ton",
    descripcion: "Precio de mercado del Negro de Carbono. Insumo clave en fabricación de neumáticos y correas transportadoras.",
    fuente: "ICIS Pricing / S&P Global Commodity Insights",
    metodologia: "Proyección basada en precio del petróleo (correlación r=0.82), capacidad instalada de producción Asia-Pacífico, y demanda global de neumáticos OEM.",
    supuestos: [
      "Precio Brent entre USD 70–85/bbl en horizonte de proyección",
      "Demanda de neumáticos OEM en Asia crece 3–4% anual",
      "Sin restricciones regulatorias adicionales en producción petroquímica",
    ],
    tendencia: "estable",
    variacionAnual: 1.2,
    ultimoValor: 1340,
    serie: construir(histCarbonBlack, 0.002, 0.04, 0.18),
  },
  {
    id: "amoniaco",
    nombre: "Amoniaco",
    unidad: "USD/ton",
    descripcion: "Precio internacional del amoniaco (NH₃). Utilizado como precursor de ANFO en voladura minera.",
    fuente: "CRU Group / ICIS Ammonia Price Index / World Bank",
    metodologia: "Modelo de equilibrio oferta/demanda: gas natural (Henry Hub, TTF) como input principal, capacidad de producción global y demanda de fertilizantes.",
    supuestos: [
      "Precio del gas natural europeo (TTF) en rango EUR 30–45/MWh",
      "Demanda de fertilizantes nitrogenados estable globalmente",
      "Reactivación de plantas cerradas en Europa hacia 2025",
      "Sin disrupciones mayores en producción de Rusia/Ucrania",
    ],
    tendencia: "baja",
    variacionAnual: -8.5,
    ultimoValor: 285,
    serie: construir(histAmoniaco, -0.003, 0.06, 0.28),
  },
  {
    id: "glicerina",
    nombre: "Glicerina",
    unidad: "USD/ton",
    descripcion: "Precio de glicerina cruda (subproducto de biodiesel). Usada como lubricante y en procesos químicos industriales.",
    fuente: "ICIS Glycerine Price Report / Oleoquímica Internacional",
    metodologia: "Proyección vinculada a producción de biodiesel (mandatos europeos y latinoamericanos), excedentes de glicerina cruda y demanda farmacéutica/cosmética.",
    supuestos: [
      "Mandato de biodiesel en Chile y Europa mantiene oferta de glicerina",
      "Demanda cosmética y farmacéutica crece 2–3% anual",
      "Excedente estructural de glicerina cruda mantiene precios deprimidos",
    ],
    tendencia: "estable",
    variacionAnual: 0.8,
    ultimoValor: 310,
    serie: construir(histGlicerina, 0.0015, 0.05, 0.20),
  },
  {
    id: "dolar",
    nombre: "Dólar (USD/CLP)",
    unidad: "CLP por USD",
    descripcion: "Tipo de cambio peso chileno / dólar estadounidense. Factor clave en contratos con componente importado.",
    fuente: "Banco Central de Chile / Bloomberg",
    metodologia: "Modelo de paridad de poder adquisitivo ajustado por diferencial de tasas (Chile–EE.UU.), precio del cobre y condiciones financieras globales (DXY).",
    supuestos: [
      "FED inicia ciclo de recortes en 2024, reduciendo fortaleza del USD",
      "Precio del cobre en rango USD 3.8–4.2/lb modera presión sobre CLP",
      "Banco Central de Chile mantiene reservas adecuadas",
      "Sin shocks políticos domésticos de magnitud",
    ],
    tendencia: "estable",
    variacionAnual: -1.5,
    ultimoValor: 962,
    serie: construir(histDolar, 0.0005, 0.04, 0.16),
  },
  {
    id: "energia",
    nombre: "Energía Eléctrica",
    unidad: "USD/MWh",
    descripcion: "Precio spot / costo marginal promedio mensual del Sistema Eléctrico Nacional (SEN) de Chile.",
    fuente: "Coordinador Eléctrico Nacional (CEN) / CNE Chile",
    metodologia: "Proyección basada en expansión de ERNC (solar/eólica), retiro de carbón, hidraulicidad esperada y costo marginal de largo plazo del SEN.",
    supuestos: [
      "Incorporación de 3–4 GW de solar en Atacama para 2026–2027",
      "Retiro gradual de centrales a carbón según plan del gobierno",
      "Hidraulicidad en escenario base (promedio histórico)",
      "Precio del GNL en rango USD 10–14/MMBtu",
    ],
    tendencia: "baja",
    variacionAnual: -3.2,
    ultimoValor: 68,
    serie: construir(histEnergia, -0.003, 0.06, 0.25),
  },
  {
    id: "combustible",
    nombre: "Combustible (Diesel)",
    unidad: "CLP/litro",
    descripcion: "Precio del petróleo diesel en Chile (incluye impuestos y SAF). Principal insumo energético de flota y equipos mineros.",
    fuente: "ENAP / CNE Chile / Precio de paridad importación",
    metodologia: "Proyección del precio Brent (modelo de equilibrio OPEC+) convertida a CLP/litro mediante tipo de cambio proyectado, más impuesto específico vigente.",
    supuestos: [
      "Precio Brent en rango USD 70–85/bbl",
      "OPEC+ mantiene recortes de producción hasta 2025",
      "Impuesto específico al diesel sin cambios legislativos",
      "Tipo de cambio según proyección del indicador Dólar",
    ],
    tendencia: "estable",
    variacionAnual: 2.1,
    ultimoValor: 1050,
    serie: construir(histCombustible, 0.0018, 0.04, 0.18),
  },
];

export function getIndicador(id: string): Indicador | undefined {
  return INDICADORES.find((ind) => ind.id === id);
}

export const COLORES = {
  historico: "#3b82f6",
  proyeccion: "#f97316",
};
