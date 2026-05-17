import { useState } from 'react';
import { ShoppingCart, TrendingUp, LayoutDashboard } from 'lucide-react';
import { Header } from './components/layout/Header';
import { KpiCard } from './components/dashboard/KpiCard';
import { ConsultorIA } from './components/dashboard/ConsultorIA';
import { EconomyOpportunityCard, TrendCard, PerformanceCard } from './components/dashboard/InsightCards';
import { CategoryTabs, ProductTabs } from './components/dashboard/Tabs';
import { PriceChart } from './components/dashboard/PriceChart';
import { MarketInsightCard } from './components/dashboard/MarketInsightCard';

function App() {
  const [activeCategory, setActiveCategory] = useState('Fertilizantes');
  const [activeProduct, setActiveProduct] = useState('PHO SFS');

  const categories = [
    'Fertilizantes', 'Combustível', 'Fungicida', 'Herbicida', 
    'Inseticidas', 'Manejo Sanitário', 'Outros', 'Análise das Minhas Compras'
  ];

  const products = ['PHO SFS', 'KCL', 'PHO MAP 11-52', 'PHO MAP 12-61', 'SAM', 'UREIA'];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      <Header />
      
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Title Area */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2 tracking-tight">Inteligência Agrícola</h1>
          <p className="text-sm text-gray-400">Última atualização em: 14/05/2026 03:45:27</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard 
            title="Total das suas compras" 
            value="R$ 347.701,53" 
            icon={<ShoppingCart className="w-6 h-6" />} 
          />
          <KpiCard 
            title="Total das suas vendas" 
            value="R$ 6.056.738,79" 
            icon={<TrendingUp className="w-6 h-6 text-primary" />} 
          />
          <KpiCard 
            title="LucroRural" 
            subtitle="sem impostos*"
            value="R$ 5.709.037,26" 
            icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>} 
            isMain
          />
          <KpiCard 
            title="Produtos classificados" 
            value="96" 
            icon={<LayoutDashboard className="w-6 h-6" />} 
          />
        </div>

        {/* Insights Section */}
        <div className="flex flex-col gap-6 mb-12">
          <ConsultorIA />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">
              <EconomyOpportunityCard />
              <TrendCard />
              <PerformanceCard />
            </div>
            <div className="lg:col-span-3 hidden lg:flex items-end justify-center pointer-events-none">
               <img src="/bao_de_negocio.png" alt="Personagem Bão de Negócio" className="max-h-[360px] object-contain drop-shadow-xl" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <CategoryTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          onChange={setActiveCategory} 
        />
        <ProductTabs 
          products={products} 
          activeProduct={activeProduct} 
          onChange={setActiveProduct} 
        />

        {/* Chart Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PriceChart />
          </div>
          <div className="lg:col-span-1">
            <MarketInsightCard />
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
