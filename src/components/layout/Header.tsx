import { Search, User, Settings, Menu } from 'lucide-react';
import clsx from 'clsx';

export function Header() {
  const menus = ['Preços', 'Relatórios', 'Contabilidade'];

  return (
    <header className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo area */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">L</div>
            <span className="font-bold text-xl text-secondary">Lucro<span className="font-normal text-gray-500">Rural</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {menus.map((menu, i) => (
              <a 
                key={menu} 
                href="#" 
                className={clsx(
                  "relative text-sm font-semibold transition-colors duration-200 py-1",
                  i === 0 ? "text-primary" : "text-gray-500 hover:text-secondary group"
                )}
              >
                {menu}
                <span className={clsx(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transform origin-left transition-transform duration-300",
                  i === 0 ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </a>
            ))}
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4 text-gray-500">
          <button className="p-2 hover:bg-gray-50 rounded-full transition-colors"><Search className="w-5 h-5" /></button>
          <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
          <button className="hidden md:flex items-center gap-2 p-2 hover:bg-gray-50 rounded-full transition-colors">
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">Olá, Teste</span>
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-full transition-colors"><Settings className="w-5 h-5" /></button>
          <button className="md:hidden p-2 hover:bg-gray-50 rounded-full transition-colors"><Menu className="w-5 h-5" /></button>
        </div>
      </div>
    </header>
  );
}
