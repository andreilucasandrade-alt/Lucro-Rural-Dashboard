import { MapPin, Eye, DollarSign, MessageSquare } from 'lucide-react';

export function MarketInsightCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col h-full">
      <h3 className="font-bold text-lg text-secondary mb-1">Comparativo de Preços</h3>
      <p className="text-xs text-gray-400 mb-8">(variação em 12 meses)</p>

      {/* Visual Bar */}
      <div className="relative mb-20 mt-12 px-2">
        {/* Main Line */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-gray-300 to-red-500 rounded-full w-full"></div>
        
        {/* Min Price Marker */}
        <div className="absolute left-0 bottom-full mb-2 flex flex-col items-start">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">min</span>
          <span className="text-xs font-bold text-primary">R$ 1.100</span>
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-full"></div>

        {/* Avg Price Marker */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 flex flex-col items-center">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">médio</span>
          <span className="text-xs font-bold text-secondary">R$ 2.015</span>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-gray-600 rounded-full"></div>

        {/* Max Price Marker */}
        <div className="absolute right-0 bottom-full mb-2 flex flex-col items-end">
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">máx</span>
          <span className="text-xs font-bold text-red-500">R$ 5.600</span>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-red-500 rounded-full"></div>

        {/* User Purchase Marker */}
        <div className="absolute left-[65%] -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md z-10"></div>
          <div className="absolute top-full mt-2 flex flex-col items-center w-max">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider leading-tight text-center">minhas compras</span>
            <span className="text-sm font-bold text-blue-600 mt-0.5">R$ 2.754</span>
          </div>
        </div>
      </div>



      <div className="bg-orange-50 text-orange-800 py-3 px-2 rounded-xl text-[13px] font-medium mb-8 text-center tracking-tight">
        Suas compras estão <strong>9% acima</strong> do preço de mercado.
      </div>

      <div className="space-y-4 mt-auto">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>Localidade</span>
          <select className="ml-auto bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none focus:border-primary">
            <option>Brasil</option>
            <option>Mato Grosso</option>
          </select>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Eye className="w-4 h-4 text-gray-400" />
          <span>Mostrar minhas compras</span>
          <input type="checkbox" defaultChecked className="ml-auto w-4 h-4 text-primary rounded focus:ring-primary accent-primary" />
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span>Converter para dólar</span>
          <input type="checkbox" className="ml-auto w-4 h-4 text-primary rounded focus:ring-primary accent-primary" />
        </div>
      </div>
    </div>
  );
}
