import { ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateMockData = () => {
  const data = [];
  const months = ['mai 25', 'jun 25', 'jul 25', 'ago 25', 'set 25', 'out 25', 'nov 25', 'dez 25', 'jan 26', 'fev 26', 'mar 26', 'abr 26', 'mai 26'];
  
  for (let i = 0; i < months.length; i++) {
    const baseValue = 2000 + Math.random() * 500;
    
    // Average line point
    data.push({
      month: months[i],
      average: baseValue,
      monthIndex: i
    });

    // Generate scatter points around this month
    const numPoints = Math.floor(Math.random() * 15) + 5;
    for (let j = 0; j < numPoints; j++) {
      const isUserPurchase = Math.random() > 0.9;
      const price = baseValue + (Math.random() * 2000 - 1000);
      
      data.push({
        month: months[i],
        monthIndex: i + (Math.random() * 0.8 - 0.4), // spread points within the month
        price: price,
        type: isUserPurchase ? 'user' : (price > baseValue ? 'above' : 'below'),
        date: `${Math.floor(Math.random() * 28) + 1} ${months[i]}`,
        supplier: 'Fornecedor Exemplo',
      });
    }
  }
  return data;
};

const data = generateMockData();
const lineData = data.filter(d => d.average).sort((a, b) => a.monthIndex - b.monthIndex);
const scatterBelow = data.filter(d => d.type === 'below');
const scatterAbove = data.filter(d => d.type === 'above');
const scatterUser = data.filter(d => d.type === 'user');

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (data.price) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100 text-sm">
          <p className="font-bold text-secondary mb-1">{data.date}</p>
          <p className="text-gray-600">Preço: <span className="font-bold text-secondary">R$ {data.price.toFixed(2)}</span></p>
          <p className="text-gray-500 text-xs mt-1">{data.supplier}</p>
        </div>
      );
    }
  }
  return null;
};

export function PriceChart() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-[500px]">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-secondary">PHO SFS</h3>
        <p className="text-sm text-gray-400">18% a 21% de P2O5</p>
      </div>

      <div className="flex-1 w-full relative min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              type="category" 
              allowDuplicatedCategory={false} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              dataKey="price" 
              type="number" 
              domain={[500, 6500]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
              tickFormatter={(val) => `R$ ${val.toLocaleString()}`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            
            <Line 
              data={lineData} 
              type="stepAfter" 
              dataKey="average" 
              stroke="#1D1B4B" 
              strokeWidth={2} 
              dot={false} 
              activeDot={false}
              legendType="none"
            />
            
            <Scatter name="Abaixo da média" data={scatterBelow} fill="#0FB5AE" />
            <Scatter name="Acima da média" data={scatterAbove} fill="#f97316" />
            <Scatter name="Minhas compras" data={scatterUser} fill="#3b82f6" shape="circle" stroke="#fff" strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider justify-start">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#1D1B4B] rounded-sm"></div>Média Mensal</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div>Minhas Compras</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div>Acima da Média</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-full"></div>Abaixo da Média</div>
      </div>
    </div>
  );
}
