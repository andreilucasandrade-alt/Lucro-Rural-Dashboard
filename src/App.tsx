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

  const categoryProducts: Record<string, string[]> = {
    'Fertilizantes': ['PHO SFS', 'KCL', 'PHO MAP 11-52', 'PHO MAP 12-61', 'SAM', 'UREIA'],
    'Combustível': ['Diesel Comum', 'Diesel Aditivado', 'Diesel S10 Comum', 'Diesel S10 Aditivado'],
    'Fungicida': ['FOX SUPRA', 'ABACUS HC', 'ALADE', 'APROACH POWER', 'ATIVUM', 'Across', 'Azimut', 'BLAVITY', 'Bravonil 720', 'MITRION', 'Miravis Pro', 'SPHERE MAX'],
    'Herbicida': ['GLI 360', '2,4-D 670', 'Atrazina 500', 'CALARIS', 'Cletodim', 'DUAL GOLD', 'Diquate 200', 'GLI 480', 'Glufosinate 200 g/L', 'Soberan', 'Verdict Max', 'Zethamax'],
    'Inseticidas': ['Premio e Shenzi', 'AMPLIGO', 'Acefato 750 g/KG', 'CURBIX 200', 'ENGEO PLENO', 'Galil', 'LANNATE', 'SPERTO', 'Talisman', 'Verdavis'],
    'Manejo Sanitário': ['Ivermectina 1%', 'Ivermectina 3,5%'],
    'Outros': ['EPIs', 'Lona'],
    'Análise das Minhas Compras': ['Relatório Geral']
  };

  const products = categoryProducts[activeCategory] || [];

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    const newProducts = categoryProducts[cat] || [];
    if (newProducts.length > 0) {
      setActiveProduct(newProducts[0]);
    } else {
      setActiveProduct('');
    }
  };

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
            iconColorClass="text-blue-500 bg-blue-50 group-hover:bg-blue-100"
            valueColorClass="text-blue-600"
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
               <img src="/bao_de_negocio.png" alt="Personagem Bão de Negócio" className="max-h-[300px] object-contain drop-shadow-2xl -mb-4" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <CategoryTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          onChange={handleCategoryChange} 
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
