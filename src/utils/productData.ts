function createSeededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return function() {
    h = Math.imul(h ^ h >>> 16, 2246822507) | 0;
    h = Math.imul(h ^ h >>> 13, 3266489909) | 0;
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export interface ProductMockData {
  month: string;
  monthIndex: number;
  average?: number;
  price?: number;
  type?: 'user' | 'above' | 'below';
  date?: string;
  supplier?: string;
}

export function generateProductMockData(productName: string, basePrice: number, decimals: number): ProductMockData[] {
  const data: ProductMockData[] = [];
  const months = ['mai 25', 'jun 25', 'jul 25', 'ago 25', 'set 25', 'out 25', 'nov 25', 'dez 25', 'jan 26', 'fev 26', 'mar 26', 'abr 26', 'mai 26'];
  
  const rand = createSeededRandom(productName);
  
  // Base variance standard deviation
  const stdDev = basePrice * 0.12; 
  
  for (let i = 0; i < months.length; i++) {
    // Generate gentle monthly variation to simulate price movement over 12 months
    const monthFactor = Math.sin(i / 2) * 0.1; // seasonal curve
    const randFactor = (rand() - 0.5) * 0.05; // small noise
    const avgPrice = Number((basePrice * (1 + monthFactor + randFactor)).toFixed(decimals));
    
    // Average line point
    data.push({
      month: months[i],
      average: avgPrice,
      monthIndex: i
    });

    // Generate scatter points around this month
    const numPoints = Math.floor(rand() * 15) + 15; // 15 to 30 points per month
    for (let j = 0; j < numPoints; j++) {
      // User purchases are about 5% of points, let's make sure there are at least some user purchases
      const isUserPurchase = (j === 3 || j === 12) || rand() > 0.95;
      
      // Gaussian distribution using Box-Muller transform
      const u1 = rand() || 0.001; 
      const u2 = rand();
      const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      
      let priceDev = z * stdDev;
      // Cap deviation
      if (priceDev > stdDev * 2.5) priceDev = stdDev * 2.5;
      if (priceDev < -stdDev * 2.5) priceDev = -stdDev * 2.5;

      let price = Number((avgPrice + priceDev).toFixed(decimals));
      if (price <= 0) price = Number((avgPrice * 0.1).toFixed(decimals)); 

      let finalPrice = price;
      if (isUserPurchase) {
        // User purchases are slightly shifted (some higher, some lower)
        const userDev = (rand() - 0.45) * (stdDev * 1.5); 
        finalPrice = Number((avgPrice + userDev).toFixed(decimals));
        if (finalPrice <= 0) finalPrice = Number((avgPrice * 0.1).toFixed(decimals));
      }
      
      const supplierNames = ['Nutrien', 'Yara', 'Mosaic', 'Coplacana', 'Lavoro', 'Coopercitrus', 'Comercial Agrícola', 'Distribuidora Nova'];
      const supplier = supplierNames[Math.floor(rand() * supplierNames.length)];
      
      data.push({
        month: months[i],
        monthIndex: i + (rand() * 0.6 - 0.3), // spread horizontally
        price: finalPrice,
        type: isUserPurchase ? 'user' : (finalPrice > avgPrice ? 'above' : 'below'),
        date: `${Math.floor(rand() * 28) + 1} ${months[i]}`,
        supplier: supplier,
      });
    }
  }
  return data;
}

export interface ProductDetails {
  activeProduct: string;
  activeCategory: string;
  subtitle: string;
  unit: string;
  decimals: number;
  minPrice: number;
  avgPrice: number;
  maxPrice: number;
  userAvgPrice: number;
  deviationPercent: number;
  lineData: ProductMockData[];
  scatterBelow: ProductMockData[];
  scatterAbove: ProductMockData[];
  scatterUser: ProductMockData[];
  yDomain: [number, number];
}

export function getProductDetails(productName: string, categoryName: string): ProductDetails {
  let basePrice: number;
  let unit: string;
  let subtitle: string;
  let decimals: number;

  // Set default settings by category
  switch (categoryName) {
    case 'Fertilizantes':
      basePrice = 2800;
      unit = 't';
      decimals = 0;
      subtitle = 'Adubo mineral de alta solubilidade';
      break;
    case 'Combustível':
      basePrice = 6.20;
      unit = 'L';
      decimals = 2;
      subtitle = 'Combustível para maquinários agrícolas';
      break;
    case 'Fungicida':
      basePrice = 210;
      unit = 'L';
      decimals = 2;
      subtitle = 'Defensivo agrícola fungicida';
      break;
    case 'Herbicida':
      basePrice = 90;
      unit = 'L';
      decimals = 2;
      subtitle = 'Defensivo agrícola herbicida';
      break;
    case 'Inseticidas':
      basePrice = 280;
      unit = 'L';
      decimals = 2;
      subtitle = 'Defensivo agrícola inseticida';
      break;
    case 'Manejo Sanitário':
      basePrice = 85;
      unit = 'frasco';
      decimals = 2;
      subtitle = 'Medicamentos e produtos veterinários';
      break;
    case 'Outros':
      basePrice = 180;
      unit = 'unid';
      decimals = 2;
      subtitle = 'Insumos gerais e ferramentas';
      break;
    default:
      basePrice = 1000;
      unit = 'unid';
      decimals = 0;
      subtitle = 'Categoria geral de insumos';
  }

  // Refine settings based on specific product names
  if (productName === 'PHO SFS') {
    basePrice = 2200;
    subtitle = '18% a 21% de P2O5';
  } else if (productName === 'KCL') {
    basePrice = 3500;
    subtitle = 'Cloreto de Potássio 60%';
  } else if (productName === 'PHO MAP 11-52') {
    basePrice = 4500;
    subtitle = 'Fosfato Monoamônico granular';
  } else if (productName === 'PHO MAP 12-61') {
    basePrice = 5200;
    subtitle = 'Fosfato Monoamônico cristalino solúvel';
  } else if (productName === 'SAM') {
    basePrice = 1800;
    subtitle = 'Sulfato de Amônio';
  } else if (productName === 'UREIA') {
    basePrice = 2500;
    subtitle = 'Ureia Agrícola 46% N';
  } else if (productName === 'Diesel Comum') {
    basePrice = 5.75;
    subtitle = 'Óleo Diesel comum B10';
  } else if (productName === 'Diesel Aditivado') {
    basePrice = 5.95;
    subtitle = 'Óleo Diesel comum aditivado';
  } else if (productName === 'Diesel S10 Comum') {
    basePrice = 6.05;
    subtitle = 'Óleo Diesel S10 comum';
  } else if (productName === 'Diesel S10 Aditivado') {
    basePrice = 6.25;
    subtitle = 'Óleo Diesel S10 aditivado';
  } else if (productName === 'FOX SUPRA') {
    basePrice = 245;
    subtitle = 'Fungicida sistêmico Bayer';
  } else if (productName === 'ABACUS HC') {
    basePrice = 195;
    subtitle = 'Fungicida Basf';
  } else if (productName === 'ALADE') {
    basePrice = 210;
    subtitle = 'Fungicida Corteva';
  } else if (productName === 'GLI 360') {
    basePrice = 42;
    subtitle = 'Herbicida Glifosato 360 g/L';
  } else if (productName === '2,4-D 670') {
    basePrice = 68;
    subtitle = 'Herbicida seletivo auxínico';
  } else if (productName === 'Diquate 200') {
    basePrice = 95;
    subtitle = 'Herbicida dessecante de contato';
  } else if (productName === 'Premio e Shenzi') {
    basePrice = 340;
    subtitle = 'Inseticida FMC';
  } else if (productName === 'AMPLIGO') {
    basePrice = 275;
    subtitle = 'Inseticida Syngenta';
  } else if (productName === 'Ivermectina 1%') {
    basePrice = 55;
    subtitle = 'Endectocida injetável Merial';
  } else if (productName === 'Ivermectina 3,5%') {
    basePrice = 145;
    subtitle = 'Endectocida de alta concentração';
  } else if (productName === 'EPIs') {
    basePrice = 45;
    subtitle = 'Equipamentos de Proteção Individual';
  } else if (productName === 'Lona') {
    basePrice = 550;
    subtitle = 'Lona plástica preta 4x50m';
  } else if (productName === 'Relatório Geral') {
    basePrice = 1200;
    subtitle = 'Consolidado histórico de todas as compras';
  }

  // Generate deterministic data based on product name (falls back to category)
  const seedName = productName || categoryName || 'default';
  const data = generateProductMockData(seedName, basePrice, decimals);

  const lineData = data.filter(d => d.average !== undefined).sort((a, b) => a.monthIndex - b.monthIndex);
  const scatterBelow = data.filter(d => d.type === 'below');
  const scatterAbove = data.filter(d => d.type === 'above');
  const scatterUser = data.filter(d => d.type === 'user');

  // Compute stats
  const allPrices = data.filter(d => d.price !== undefined).map(d => d.price!);
  const userPrices = scatterUser.map(d => d.price!);
  
  const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : basePrice * 0.8;
  const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : basePrice * 1.2;
  const avgPrice = allPrices.length > 0 ? allPrices.reduce((a, b) => a + b, 0) / allPrices.length : basePrice;
  
  // Make user purchase deviation slightly deterministic based on seed name so it's consistent
  // For instance, let user purchase averages be around basePrice * (1 + offset)
  const randForUser = createSeededRandom(seedName + "_user");
  const userOffset = (randForUser() - 0.45) * 0.15; // -6.75% to +8.25% average deviation
  const userAvgPrice = userPrices.length > 0 
    ? userPrices.reduce((a, b) => a + b, 0) / userPrices.length 
    : avgPrice * (1 + userOffset);

  // Compute actual percentage deviation
  const deviationPercent = ((userAvgPrice - avgPrice) / avgPrice) * 100;

  // Custom Y axis domain: pad to look clean
  let minY: number;
  let maxY: number;

  if (categoryName === 'Combustível') {
    // Keep tight padding for fuels
    minY = Math.max(0, Math.floor(minPrice * 0.95 * 10) / 10);
    maxY = Math.ceil(maxPrice * 1.05 * 10) / 10;
  } else {
    minY = Math.max(0, Math.floor(minPrice * 0.85 / 10) * 10);
    maxY = Math.ceil(maxPrice * 1.15 / 10) * 10;
  }

  return {
    activeProduct: productName,
    activeCategory: categoryName,
    subtitle,
    unit,
    decimals,
    minPrice,
    avgPrice,
    maxPrice,
    userAvgPrice,
    deviationPercent,
    lineData,
    scatterBelow,
    scatterAbove,
    scatterUser,
    yDomain: [minY, maxY]
  };
}
