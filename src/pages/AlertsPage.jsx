import { useNavigate } from 'react';
import { Bell, Sparkles, AlertTriangle, ArrowUpRight, Activity } from 'lucide-react';
import { MOCK_ALERTS } from '../services/mockCryptoData';
import { useMarketStore } from '../stores/useMarketStore';

export default function AlertsPage() {
  const navigate = useNavigate();
  const { setActiveSymbol } = useMarketStore();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-violet-400" />
            AI Intelligent Alert Feed
          </h1>
          <p className="text-xs text-[#A1A1AA]">Real-time automated notification engine for orderbook anomalies and market sweeps</p>
        </div>
      </div>

      {/* Alert Feed Stack */}
      <div className="space-y-3">
        {MOCK_ALERTS.map((alert) => (
          <div
            key={alert.id}
            className="p-4 rounded-2xl bg-[#111113] border border-[#27272A] hover:border-violet-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  alert.severity === 'HIGH'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-violet-500/10 text-violet-300 border border-violet-500/30'
                }`}
              >
                <Sparkles className="w-4 h-4" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{alert.title}</span>
                  <span className="text-[10px] font-mono text-[#71717A]">• {alert.timeAgo}</span>
                </div>
                <p className="text-xs text-[#A1A1AA] mt-0.5 max-w-xl leading-relaxed">{alert.description}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px]">
                  <span className="font-mono font-bold text-white bg-[#18181B] px-2 py-0.5 rounded border border-[#27272A]">
                    {alert.symbol}
                  </span>
                  <span className="text-violet-400 font-semibold">{alert.confidence}% Confidence Score</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveSymbol(alert.symbol);
                navigate('/markets');
              }}
              className="py-2 px-3 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 shrink-0 transition-all"
            >
              <span>View Analysis</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
