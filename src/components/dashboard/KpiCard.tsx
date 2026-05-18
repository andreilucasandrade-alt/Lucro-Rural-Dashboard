import type { ReactNode } from 'react';
import clsx from 'clsx';

interface KpiCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  isMain?: boolean;
  subtitle?: string;
  iconColorClass?: string;
  valueColorClass?: string;
}

export function KpiCard({ title, value, icon, isMain, subtitle, iconColorClass, valueColorClass }: KpiCardProps) {
  return (
    <div className={clsx(
      "bg-white rounded-2xl p-6 border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between group",
      isMain ? "border-primary/20 hover:border-primary/40" : "hover:border-gray-200"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-gray-500 font-semibold text-sm mb-1 group-hover:text-gray-700 transition-colors">
            {title} {subtitle && <span className="text-xs font-normal opacity-70">({subtitle})</span>}
          </h3>
          <p className={clsx(
            "text-3xl font-bold tracking-tight",
            isMain ? "text-secondary" : (valueColorClass || "text-primary")
          )}>
            {value}
          </p>
        </div>
        {icon && (
          <div className={clsx(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
            isMain 
              ? "bg-primary/10 text-primary" 
              : (iconColorClass || "bg-gray-50 text-primary group-hover:bg-primary/10")
          )}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
