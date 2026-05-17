import { Info } from 'lucide-react';

export function EconomyOpportunityCard() {
  const data = [
    { id: 1, product: 'FOX SUPRA', category: 'fungicida', deviation: '+37%', saving: 'R$ 88.550,00' },
    { id: 2, product: 'Diquate 200', category: 'herbicida', deviation: '+21%', saving: 'R$ 7.235,20' },
    { id: 3, product: 'Glufosinate 200g/L', category: 'herbicida', deviation: '+15%', saving: 'R$ 3.784,20' },
    { id: 4, product: 'Diesel S10 Comum', category: 'combustível', deviation: '+8%', saving: 'R$ 1.546,95' },
    { id: 5, product: 'Diesel Comum', category: 'combustível', deviation: '+6%', saving: 'R$ 778,53' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-bold text-lg text-secondary">Oportunidades de Economia</h3>
        <Info className="w-4 h-4 text-gray-400" />
      </div>
      <div className="flex-1">
        <ul className="space-y-3">
          {data.map((item, idx) => (
            <li key={item.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 min-w-0 pr-4">
                <span className="text-gray-400 w-4 shrink-0">{idx + 1}.</span>
                <span className="font-medium text-secondary truncate">{item.product}</span>
              </div>
              <span className="text-secondary font-semibold whitespace-nowrap">{item.saving}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TrendCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg text-secondary">Tendências</h3>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
        <span className="text-xs font-bold text-gray-500 tracking-wider">URGÊNCIA</span>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <h4 className="font-bold text-secondary text-sm">Diesel S10 Comum</h4>
            <span className="font-bold text-red-500">72/100</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Mercado com sinais de aceleração alta nas últimas semanas.
          </p>
        </div>
        
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <h4 className="font-bold text-secondary text-sm">Atropina</h4>
            <span className="font-bold text-primary">28/100</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Mercado relativamente estável com viés de baixa.
          </p>
        </div>
      </div>
    </div>
  );
}

export function PerformanceCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-bold text-lg text-secondary">Desempenho de Compras</h3>
        <Info className="w-4 h-4 text-gray-400" />
      </div>
      
      <div className="flex flex-col items-center justify-center flex-1 z-10 py-4">
        <div className="text-5xl font-bold text-secondary mb-2 tracking-tighter">86/100</div>
        <p className="text-xs text-gray-500 text-center max-w-[200px]">
          Você comprou melhor que a média do mercado na maior parte dos insumos.
        </p>
      </div>

      {/* Decorative background or character space */}
      <div className="absolute right-0 bottom-0 pointer-events-none translate-x-8 translate-y-8 opacity-10">
        <div className="w-32 h-32 bg-primary rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
