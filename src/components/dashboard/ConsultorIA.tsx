import { Sparkles, ChevronRight } from 'lucide-react';

export function ConsultorIA() {
  return (
    <div className="bg-[#DDF5F2] rounded-2xl p-6 border border-primary/20 flex items-center justify-between cursor-pointer hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-sm transform group-hover:scale-105 transition-transform duration-300">
          <Sparkles className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-secondary mb-1">Consultor de Preços</h2>
          <p className="text-sm text-secondary/80">Tire dúvidas sobre seus preços de compra com IA</p>
        </div>
      </div>
      <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-primary group-hover:bg-white transition-colors duration-300">
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
