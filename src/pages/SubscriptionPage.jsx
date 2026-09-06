import { CreditCard, Sparkles, Check, ShieldCheck, Zap } from 'lucide-react';

export default function SubscriptionPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-500" />
          Subscription & Usage Billing
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Manage institutional plan tiers, AI evaluation quota, and API key billing</p>
      </div>

      {/* Current Plan & Quota Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-[#0D1117] dark:via-[#131B26] dark:to-[#0D1117] border border-blue-200 dark:border-blue-500/30 shadow-sm dark:shadow-xl space-y-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Active Plan</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5 flex items-center gap-2">
              Institutional AI Pro Plan
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">$149 / month • Renews October 1, 2026</p>
          </div>

          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-md shadow-blue-600/20 w-fit">
            Upgrade Tier
          </button>
        </div>

        {/* Quotas Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" /> AI Deep Scan Credits
              </span>
              <span className="font-mono text-slate-500 dark:text-slate-400">850 / 1,000 used</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
              <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-500" /> REST & WebSocket API Quota
              </span>
              <span className="font-mono text-slate-500 dark:text-slate-400">14,200 / 50,000 reqs</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
              <div className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full" style={{ width: '28%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
        {/* Starter */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-xs">
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">Starter</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">$29 <span className="text-xs text-slate-400 font-normal">/mo</span></div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">For retail traders seeking basic AI market sentiment.</p>
            <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> 100 AI Scans / mo</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Standard Timeframes</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> 5 Active Signals</li>
            </ul>
          </div>
          <button className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            Downgrade
          </button>
        </div>

        {/* Pro / Current */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1117] border-2 border-blue-500/60 shadow-md dark:shadow-xl space-y-4 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white font-bold text-[9px] px-3 py-1 rounded-bl-lg uppercase tracking-wider">
            Current Plan
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">Institutional Pro</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">$149 <span className="text-xs text-slate-400 font-normal">/mo</span></div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Full AI co-pilot, liquidity sweeps, and bot execution.</p>
            <ul className="mt-4 space-y-2 text-xs text-slate-800 dark:text-slate-200">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-500" /> 1,000 AI Scans / mo</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-500" /> Order Block & FVG Overlays</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-500" /> Unlimited AI Trading Signals</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-500" /> 50,000 API Requests / mo</li>
            </ul>
          </div>
          <button className="w-full py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold cursor-default">
            Active Plan
          </button>
        </div>

        {/* Enterprise */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-xs">
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">Enterprise Fund</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">Custom</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Dedicated hedge fund infrastructure & unlimited WebSocket streams.</p>
            <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Unlimited AI Evaluations</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Custom Neural Fine-tuning</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> SLA & 100k API Limit</li>
            </ul>
          </div>
          <button className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            Contact Enterprise
          </button>
        </div>
      </div>
    </div>
  );
}
