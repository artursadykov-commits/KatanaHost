import Header from "@/components/Header";
import { INDICADORES } from "@/data/indicadores";
import { BookOpen, Database, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

export default function MetodologiaPage() {
  return (
    <div className="flex-1 flex flex-col">
      <Header
        titulo="Metodología y Supuestos"
        subtitulo="Detalle del enfoque metodológico, fuentes y supuestos utilizados en cada proyección"
      />

      <div className="p-8 flex-1 space-y-6">
        {/* Descripción general */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            Marco Metodológico General
          </h2>
          <div className="prose prose-sm text-gray-600 space-y-3">
            <p>
              Las proyecciones de indicadores se construyen mediante modelos econométricos y estadísticos
              validados, calibrados con datos históricos y ajustados periódicamente según la evolución
              observada de cada variable.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[
                {
                  titulo: "Horizonte",
                  valor: "5 años",
                  desc: "Proyección mensual 2024–2029",
                  color: "bg-blue-50 border-blue-200 text-blue-700",
                },
                {
                  titulo: "Actualización",
                  valor: "Mensual",
                  desc: "Primera semana de cada mes",
                  color: "bg-green-50 border-green-200 text-green-700",
                },
                {
                  titulo: "Confianza",
                  valor: "80%",
                  desc: "Bandas de incertidumbre disponibles",
                  color: "bg-orange-50 border-orange-200 text-orange-700",
                },
              ].map((item) => (
                <div key={item.titulo} className={`rounded-lg border p-4 ${item.color}`}>
                  <p className="text-xs font-medium opacity-70">{item.titulo}</p>
                  <p className="text-xl font-bold mt-1">{item.valor}</p>
                  <p className="text-xs mt-1 opacity-80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enfoques metodológicos */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-orange-500" />
            Enfoques por tipo de indicador
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                tipo: "Indicadores macro (Inflación, Dólar)",
                modelo: "Modelos VAR / Paridad de poder adquisitivo",
                desc: "Se alimentan con proyecciones del Banco Central de Chile, expectativas de mercado (BCCh EEE) y modelos de equilibrio macroeconómico. Calibrados con datos INE y Bloomberg.",
              },
              {
                tipo: "Índices de costos (ICMO)",
                modelo: "Regresión con IPC + negociaciones laborales",
                desc: "Vinculados a la inflación proyectada, convenios colectivos mineros y tendencia histórica de productividad laboral. Publicado trimestralmente por INE.",
              },
              {
                tipo: "Commodities (Carbon Black, Amoniaco, Glicerina)",
                modelo: "Modelos de oferta/demanda sectorial",
                desc: "Proyecciones basadas en precios de materias primas de primer nivel (petróleo, gas natural), balances de oferta/demanda y reportes especializados (ICIS, CRU, S&P).",
              },
              {
                tipo: "Energía y Combustible",
                modelo: "Costo marginal SEN + precio Brent",
                desc: "La energía eléctrica se proyecta mediante el modelo de expansión del Sistema Eléctrico Nacional (CEN). El combustible sigue la paridad de importación ENAP más impuesto específico.",
              },
            ].map((item) => (
              <div key={item.tipo} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                <p className="text-xs font-bold text-gray-800 mb-1">{item.tipo}</p>
                <p className="text-xs text-blue-600 font-medium mb-2">Modelo: {item.modelo}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores — ficha metodológica */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-green-500" />
            Ficha metodológica por indicador
          </h2>
          <div className="space-y-4">
            {INDICADORES.map((ind) => (
              <div key={ind.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-bold text-gray-800">{ind.nombre}</p>
                    <p className="text-xs text-gray-400">{ind.unidad}</p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                    {ind.fuente.split("/")[0].trim()}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3 leading-relaxed">{ind.metodologia}</p>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1.5">Supuestos clave:</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {ind.supuestos.map((s, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3 h-3 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-500">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nota de incertidumbre */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Nota sobre incertidumbre de largo plazo</p>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
              Las proyecciones de largo plazo (3–5 años) están sujetas a mayor incertidumbre que las de corto plazo.
              Se recomienda utilizar los valores proyectados como escenario base, acompañado de análisis de
              sensibilidad con los supuestos declarados en cada indicador. El equipo técnico está disponible para
              construir escenarios alternativos (optimista/pesimista) a requerimiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
