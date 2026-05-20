import { ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getProductDetails } from '../../utils/productData';

interface PriceChartProps {
  activeProduct: string;
  activeCategory: string;
  showUserPurchases: boolean;
  convertToDollar: boolean;
}

interface TooltipPayloadItem {
  payload: {
    date?: string;
    price?: number;
    supplier?: string;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  decimals: number;
  unit: string;
  convertToDollar: boolean;
}

const CustomTooltip = ({ active, payload, decimals, unit, convertToDollar }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (data.price !== undefined) {
      const currencySymbol = convertToDollar ? 'US$' : 'R$';
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100 text-sm">
          <p className="font-bold text-secondary mb-1">{data.date}</p>
          <p className="text-gray-600">
            Preço: <span className="font-bold text-secondary">
              {currencySymbol} {data.price.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}/{unit}
            </span>
          </p>
          <p className="text-gray-500 text-xs mt-1">{data.supplier}</p>
        </div>
      );
    }
  }
  return null;
};

export function PriceChart({ activeProduct, activeCategory, showUserPurchases, convertToDollar }: PriceChartProps) {
  const details = getProductDetails(activeProduct, activeCategory);
  const { lineData, scatterBelow, scatterAbove, scatterUser, yDomain, decimals, subtitle, unit } = details;

  // Conversion rate
  const usdRate = 5.15;
  const scaleValue = (val: number) => convertToDollar ? val / usdRate : val;
  const displayDecimals = convertToDollar ? decimals + 2 : decimals;
  const currencySymbol = convertToDollar ? 'US$' : 'R$';

  // Map data to converted values
  const scaledLineData = lineData.map(d => ({
    ...d,
    average: d.average !== undefined ? scaleValue(d.average) : undefined
  }));

  const scaledScatterBelow = scatterBelow.map(d => ({
    ...d,
    price: d.price !== undefined ? scaleValue(d.price) : undefined
  }));

  const scaledScatterAbove = scatterAbove.map(d => ({
    ...d,
    price: d.price !== undefined ? scaleValue(d.price) : undefined
  }));

  const scaledScatterUser = scatterUser.map(d => ({
    ...d,
    price: d.price !== undefined ? scaleValue(d.price) : undefined
  }));

  const scaledYDomain: [number, number] = [scaleValue(yDomain[0]), scaleValue(yDomain[1])];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-[500px]">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-secondary">{activeProduct}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>

      <div className="flex-1 w-full relative min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="monthIndex" 
              type="number" 
              domain={[-0.5, 12.5]}
              allowDuplicatedCategory={false} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
              tickFormatter={(val) => {
                const months = ['mai 25', 'jun 25', 'jul 25', 'ago 25', 'set 25', 'out 25', 'nov 25', 'dez 25', 'jan 26', 'fev 26', 'mar 26', 'abr 26', 'mai 26'];
                return months[val] || '';
              }}
              ticks={[0,1,2,3,4,5,6,7,8,9,10,11,12]}
              dy={10}
            />
            <YAxis 
              dataKey="price" 
              type="number" 
              domain={scaledYDomain} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
              tickFormatter={(val) => `${currencySymbol} ${val.toLocaleString('pt-BR', { minimumFractionDigits: displayDecimals, maximumFractionDigits: displayDecimals })}`}
              width={90}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip decimals={displayDecimals} unit={unit} convertToDollar={convertToDollar} />} cursor={{ strokeDasharray: '3 3' }} />
            
            <Scatter name="Abaixo da média" data={scaledScatterBelow} fill="#0FB5AE" />
            <Scatter name="Acima da média" data={scaledScatterAbove} fill="#f97316" />
            
            {showUserPurchases && (
              <Scatter name="Minhas compras" data={scaledScatterUser} fill="#3b82f6" shape="circle" stroke="#fff" strokeWidth={2} />
            )}
            
            <Line 
              data={[
                { ...scaledLineData[0], monthIndex: -0.5 },
                ...scaledLineData,
                { ...scaledLineData[scaledLineData.length - 1], monthIndex: 12.5 }
              ]} 
              type="stepAfter" 
              dataKey="average" 
              stroke="#1D1B4B" 
              strokeWidth={3} 
              dot={false} 
              activeDot={false}
              legendType="none"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider justify-start">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#1D1B4B] rounded-sm"></div>Média Mensal</div>
        {showUserPurchases && (
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div>Minhas Compras</div>
        )}
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div>Acima da Média</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-full"></div>Abaixo da Média</div>
      </div>
    </div>
  );
}
