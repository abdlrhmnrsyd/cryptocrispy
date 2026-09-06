import { CreditCard, Sparkles, Check, ShieldCheck, Zap } from 'lucide-react';

export default function SubscriptionPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-violet-400" />
          Subscription & Usage Billing
        </h1>
        <p className="text-xs text-[#A1A1AA]">Manage institutional plan tiers, AI evaluation quota, and API key billing</p>
      </div>

      {/* Current Plan & Quota Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#111113] via-[#161322] to-[#111113] border border-violet-500/30 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272A]">
          <div>
            <div className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">Active Plan</div>
            <div className="text-2xl font-black text-white mt-0.5 flex items-center gap-2">
              Institutional AI Pro Plan
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-xs text-[#A1A1AA] mt-1">$149 / month • Renews October 1, 2026</p>
          </div>

          <button className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors shadow-md shadow-violet-600/20 w-fit">
            Upgrade Tier
          </button>
        </div>

        {/* Quotas Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" /> AI Deep Scan Credits
              </span>
              <span className="font-mono text-[#A1A1AA]">850 / 1,000 used</span>
            </div>
            <div className="w-full h-2 bg-[#18181B] rounded-full overflow-hidden border border-[#27272A]">
              <div className="h-full bg-violet-500 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" /> REST & WebSocket API Quota
              </span>
              <span className="font-mono text-[#A1A1AA]">14,200 / 50,000 reqs</span>
            </div>
            <div className="w-full h-2 bg-[#18181B] rounded-full overflow-hidden border border-[#27272A]">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '28%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
        {/* Starter */}
        <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272A] space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-sm font-bold text-white">Starter</div>
            <div className="text-2xl font-black text-white mt-1">$29 <span className="text-xs text-[#71717A] font-normal">/mo</span></div>
            <p className="text-xs text-[#A1A1AA] mt-2">For retail traders seeking basic AI market sentiment.</p>
            <ul className="mt-4 space-y-2 text-xs text-[#A1A1AA]">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 100 AI Scans / mo</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Standard Timeframes</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 5 Active Signals</li>
            </ul>
          </div>
          <button className="w-full py-2 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white border border-[#27272A] text-xs font-semibold">
            Downgrade
          </button>
        </div>

        {/* Pro / Current */}
        <div className="p-5 rounded-2xl bg-[#111113] border-2 border-violet-500/60 shadow-xl space-y-4 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-violet-600 text-white font-bold text-[9px] px-3 py-1 rounded-bl-lg uppercase tracking-wider">
            Current Plan
          </div>
          <div>
            <div className="text-sm font-bold text-white">Institutional Pro</div>
            <div className="text-2xl font-black text-white mt-1">$149 <span className="text-xs text-[#71717A] font-normal">/mo</span></div>
            <p className="text-xs text-[#A1A1AA] mt-2">Full AI co-pilot, liquidity sweeps, and bot execution.</p>
            <ul className="mt-4 space-y-2 text-xs text-[#FAFAFA]">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-violet-400" /> 1,000 AI Scans / mo</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-violet-400" /> Order Block & FVG Overlays</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-violet-400" /> Unlimited AI Trading Signals</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-violet-400" /> 50,000 API Requests / mo</li>
            </ul>
          </div>
          <button className="w-full py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold cursor-default">
            Active Plan
          </button>
        </div>

        {/* Enterprise */}
        <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272A] space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-sm font-bold text-white">Enterprise Fund</div>
            <div className="text-2xl font-black text-white mt-1">Custom</div>
            <p className="text-xs text-[#A1A1AA] mt-2">Dedicated hedge fund infrastructure & unlimited WebSocket streams.</p>
            <ul className="mt-4 space-y-2 text-xs text-[#A1A1AA]">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Unlimited AI Evaluations</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Custom Neural Fine-tuning</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> SLA & 100k API Limit</li>
            </ul>
          </div>
          <button className="w-full py-2 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white border border-[#27272A] text-xs font-semibold">
            Contact Enterprise
          </button>
        </div>
      </div>
    </div>
  );
}
