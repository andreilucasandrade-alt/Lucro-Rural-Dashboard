import clsx from 'clsx';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onChange: (cat: string) => void;
}

export function CategoryTabs({ categories, activeCategory, onChange }: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-8 border-b border-gray-100 overflow-x-auto no-scrollbar mb-6">
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={clsx(
              "whitespace-nowrap py-4 text-sm font-semibold transition-all relative",
              isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
            )}
          >
            {category}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full shadow-[0_-1px_4px_rgba(15,181,174,0.5)]" />
            )}
          </button>
        );
      })}
    </div>
  );
}

interface ProductTabsProps {
  products: string[];
  activeProduct: string;
  onChange: (prod: string) => void;
}

export function ProductTabs({ products, activeProduct, onChange }: ProductTabsProps) {
  return (
    <div className="flex items-center gap-8 border-b border-gray-100 overflow-x-auto no-scrollbar mb-8">
      {products.map((product) => {
        const isActive = product === activeProduct;
        return (
          <button
            key={product}
            onClick={() => onChange(product)}
            className={clsx(
              "whitespace-nowrap py-3 text-sm font-semibold transition-all relative uppercase tracking-wide",
              isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
            )}
          >
            {product}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full shadow-[0_-1px_4px_rgba(15,181,174,0.5)]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
