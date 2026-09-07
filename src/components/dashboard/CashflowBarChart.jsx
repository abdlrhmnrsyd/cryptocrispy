import { BarChart2, TrendingUp } from 'lucide-react';

export default function CashflowBarChart() {
  const bars = [
    { label: '01 Sep', height: 45, volume: '$1.2B' },
    { label: '02 Sep', height: 75, volume: '$2.8B' },
    { label: '03 Sep', height: 60, volume: '$1.9B' },
    { label: '04 Sep', height: 95, volume: '$4.2B', active: true },
    { label: '05 Sep', height: 50, volume: '$1.5B' },
    { label: '06 Sep', height: 70, volume: '$2.4B' },
    { label: '07 Sep', height: 40, volume: '$1.1B' },
  ];

  return (
    <div className="bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800/90 rounded-2xl p-5 space-y-4 relative transition-all shadow-xs hover:shadow-lg">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-blue-500" />
          <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight uppercase">Institutional Volume & Net Inflow</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+$342M Net Inflow</span>
        </div>
      </div>

      {/* Y-axis ticks & Bar Chart Container */}
      <div className="relative pt-6">
        {/* Y Axis Guide Lines */}
        <div className="absolute inset-x-0 top-6 text-[9px] font-mono text-slate-400 border-b border-slate-100 dark:border-slate-800/80 pb-0.5">5.0B Vol</div>
        <div className="absolute inset-x-0 top-16 text-[9px] font-mono text-slate-400 border-b border-slate-100 dark:border-slate-800/80 pb-0.5">2.5B Vol</div>
        <div className="absolute inset-x-0 top-26 text-[9px] font-mono text-slate-400 border-b border-slate-100 dark:border-slate-800/80 pb-0.5">0.5B Vol</div>

        {/* Floating Tooltip Box */}
        <div className="absolute z-20 pointer-events-none" style={{ left: '46%', top: '-8px' }}>
          <div className="bg-slate-900/95 dark:bg-[#121829]/95 backdrop-blur-md border border-blue-500/40 rounded-xl p-2.5 shadow-2xl text-[10px] space-y-1 font-mono text-white neon-glow-blue">
            <div className="flex justify-between gap-4 text-slate-300">
              <span>Taker Buy Vol</span>
              <span className="font-bold text-emerald-400">$2.68B</span>
            </div>
            <div className="flex justify-between gap-4 text-slate-300">
              <span>Taker Sell Vol</span>
              <span className="font-bold text-rose-400">$1.52B</span>
            </div>
          </div>
        </div>

        {/* Bars Container */}
        <div className="flex items-end justify-between h-36 pt-8 px-3">
          {bars.map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-9 bg-slate-100 dark:bg-[#121829] rounded-xl h-28 flex items-end overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-800/50">
                <div
                  className={`w-full rounded-lg transition-all duration-300 ${
                    bar.active
                      ? 'bg-gradient-to-t from-blue-600 via-cyan-500 to-emerald-400 shadow-md shadow-blue-500/40'
                      : 'bg-gradient-to-t from-blue-500/30 to-cyan-500/50 dark:from-blue-900/50 dark:to-cyan-600/50 group-hover:to-blue-400'
                  }`}
                  style={{ height: `${bar.height}%` }}
                />
              </div>
              <span className="text-[9px] font-mono text-slate-400 group-hover:text-blue-500 font-bold">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
