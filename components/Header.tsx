import { Bell, RefreshCw } from "lucide-react";

interface HeaderProps {
  titulo: string;
  subtitulo?: string;
}

export default function Header({ titulo, subtitulo }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{titulo}</h1>
        {subtitulo && <p className="text-sm text-gray-500 mt-0.5">{subtitulo}</p>}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <RefreshCw className="w-3 h-3" />
          Próxima actualización: 1 May 2024
        </span>
        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
          <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">E</div>
          <span className="text-xs font-semibold text-green-700">Energía Honesta</span>
        </div>
      </div>
    </header>
  );
}
