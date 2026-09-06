import { ChevronDown } from 'lucide-react';

export default function AssetDonutChart() {
  const items = [
    { label: 'Subscriptions', amount: '$148.40', color: '#2563EB' },
    { label: 'Mortgage', amount: '$824.28', color: '#0284C7' },
    { label: 'Food & dining', amount: '$614.16', color: '#06B6D4' },
    { label: 'Groceries', amount: '$642.48', color: '#10B981' },
  ];

  return (
    <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 transition-colors shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Monthly spending</h3>
        <button className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
          <span>✦ This month</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>
      </div>

      {/* Donut Chart & Itemized Legend Row */}
      <div className="flex items-center gap-6 pt-2">
        {/* Segmented SVG Donut */}
        <div className="relative w-32 h-32 shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Blue segment 1 */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#2563EB"
              strokeWidth="16"
              strokeDasharray="60 180"
              strokeDashoffset="0"
            />
            {/* Cyan segment */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="16"
              strokeDasharray="40 200"
              strokeDashoffset="-65"
            />
            {/* Sky Blue segment */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#0284C7"
              strokeWidth="16"
              strokeDasharray="50 190"
              strokeDashoffset="-110"
            />
            {/* Green segment */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#10B981"
              strokeWidth="16"
              strokeDasharray="55 185"
              strokeDashoffset="-165"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 rounded-full bg-white dark:bg-[#0D1117]" />
          </div>
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 flex-1 text-xs">
          {items.map((item) => (
            <div key={item.label} className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.label}</span>
              </div>
              <div className="font-bold text-slate-900 dark:text-white font-mono pl-3.5">{item.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
