import { useState } from 'react';
import {
  CandlestickChart,
  Sparkles,
  Zap,
  ShieldCheck,
  Bell,
  CheckCircle2,
  Lock,
  Cpu,
  Layers,
  Activity,
  ArrowRight
} from 'lucide-react';

export default function TradeSimulatorPage() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const UPCOMING_FEATURES = [
    {
      icon: CandlestickChart,
      title: '$100k Virtual Capital Sandbox',
      desc: 'Deploy up to $100,000 USD virtual credit with leverage up to 50x, Stop Loss, and Take Profit controls with zero personal capital risk.',
      tag: 'Risk-Free'
    },
    {
      icon: Activity,
      title: 'Real-Time L2 Orderbook Matching',
      desc: 'Simulated executions calculate real-world slippage and spread latency directly derived from live Binance and Bybit depth charts.',
      tag: 'Realistic Fills'
    },
    {
      icon: Cpu,
      title: 'AI Signal & Strategy Backtesting',
      desc: 'Replay historical liquidity sweeps and market anomalies to evaluate how algorithmic strategies perform under extreme volatility.',
      tag: 'Quant Ready'
    },
    {
      icon: Layers,
      title: '1-Click Live Broker Bridge',
      desc: 'Seamlessly port your validated paper trading configurations into live exchange execution via encrypted API keys.',
      tag: 'Exchange Connect'
    }
  ];

  const ROADMAP = [
    { phase: 'Phase 1', title: 'Matching Engine Architecture', status: 'COMPLETED', date: 'Q1' },
    { phase: 'Phase 2', title: 'Real-Time Synthetic Feeds', status: 'COMPLETED', date: 'Q2' },
    { phase: 'Phase 3', title: 'FIX Protocol & Latency Calibration', status: 'IN_PROGRESS', date: 'Q3 (Current)' },
    { phase: 'Phase 4', title: 'VIP Beta & Public Launch', status: 'UPCOMING', date: 'Q4' },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col justify-center max-w-5xl mx-auto py-8 px-4 space-y-10">
      {/* 1. Hero Showcase */}
      <div className="text-center space-y-4 relative">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>INSTITUTIONAL PAPER TRADING • COMING SOON</span>
        </div>

        {/* Main Icon */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-blue-500/25 ring-8 ring-blue-500/10">
          <CandlestickChart className="w-8 h-8 md:w-10 md:h-10 stroke-[2]" />
        </div>

        {/* Headings */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Trade Simulator is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Coming Soon</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We are engineering a zero-latency, institutional-grade crypto paper trading sandbox. Test algorithmic strategies, neural AI signals, and leverage execution without risking your capital.
          </p>
        </div>

        {/* Development Progress */}
        <div className="max-w-md mx-auto pt-2 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 dark:text-slate-400">Development Progress</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">85% Complete</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full w-[85%] transition-all duration-1000" />
          </div>
          <p className="text-[11px] text-slate-400 font-mono text-center">
            Currently calibrating low-latency order matching & risk engines
          </p>
        </div>

        {/* Early Access Form */}
        <div className="max-w-md mx-auto pt-3">
          {isSubscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-center space-y-1 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-center gap-2 font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>You are on the VIP Early Access List!</span>
              </div>
              <p className="text-xs text-emerald-600/90 dark:text-emerald-400/80">
                We will email you priority credentials the moment the private beta opens.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for early access..."
                className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 cursor-pointer shrink-0 active:scale-95"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Get Notified</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 2. Feature Previews Grid */}
      <div className="space-y-4 pt-4">
        <div className="text-center">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">What You Can Expect at Launch</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Features crafted specifically for professional and quant traders</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {UPCOMING_FEATURES.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-500/30 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                    {f.tag}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{f.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Engineering Roadmap */}
      <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-[#0D1117]/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Milestone Execution Roadmap
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ROADMAP.map((r, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white dark:bg-[#121824] border border-slate-200/80 dark:border-slate-800 text-xs space-y-1"
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">{r.phase}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{r.date}</span>
              </div>
              <div className="font-bold text-slate-900 dark:text-white">{r.title}</div>
              <div className="pt-1">
                {r.status === 'COMPLETED' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> Completed
                  </span>
                )}
                {r.status === 'IN_PROGRESS' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    <Zap className="w-3 h-3" /> In Progress
                  </span>
                )}
                {r.status === 'UPCOMING' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    <Lock className="w-3 h-3" /> Upcoming
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
