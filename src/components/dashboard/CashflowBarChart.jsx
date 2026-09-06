import { MoreVertical } from 'lucide-react';

export default function CashflowBarChart() {
  const bars = [
    { label: '0 Jul', height: 40 },
    { label: '5 Jul', height: 75 },
    { label: '10 Jul', height: 60 },
    { label: '15 Jul', height: 90, active: true },
    { label: '20 Jul', height: 45 },
    { label: '25 Jul', height: 65 },
    { label: '30 Jul', height: 35 },
  ];

  return (
    <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 relative transition-colors shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Cashflow</h3>
        <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Y-axis ticks & Bar Chart Container */}
      <div className="relative pt-6">
        {/* Y Axis Guide Lines */}
        <div className="absolute inset-x-0 top-6 text-[9px] text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-0.5">250K</div>
        <div className="absolute inset-x-0 top-16 text-[9px] text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-0.5">150K</div>
        <div className="absolute inset-x-0 top-24 text-[9px] text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-0.5">50K</div>

        {/* Floating Tooltip Box */}
        <div className="absolute z-20 pointer-events-none" style={{ left: '46%', top: '-5px' }}>
          <div className="bg-slate-900 dark:bg-[#131B26] border border-slate-700 dark:border-blue-500/30 rounded-lg p-2 shadow-2xl text-[10px] space-y-1 font-mono text-white">
            <div className="flex justify-between gap-3 text-slate-300">
              <span>Overhead</span>
              <span className="font-bold text-white">$97,543.00</span>
            </div>
            <div className="flex justify-between gap-3 text-slate-300">
              <span>Other</span>
              <span className="font-bold text-white">$-10,643.00</span>
            </div>
          </div>
        </div>

        {/* Bars Container */}
        <div className="flex items-end justify-between h-32 pt-8 px-2">
          {bars.map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-2 group">
              <div className="w-8 bg-slate-100 dark:bg-slate-900 rounded-md h-24 flex items-end overflow-hidden p-0.5">
                <div
                  className={`w-full rounded-md transition-all duration-300 ${
                    bar.active
                      ? 'bg-gradient-to-t from-blue-600 via-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30'
                      : 'bg-gradient-to-t from-blue-400/30 to-blue-600/40 dark:from-blue-900/60 dark:to-blue-600/60 group-hover:to-blue-500'
                  }`}
                  style={{ height: `${bar.height}%` }}
                />
              </div>
              <span className="text-[9px] font-mono text-slate-400">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
