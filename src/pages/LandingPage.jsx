import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Terminal,
  Activity,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  ShieldCheck,
  Zap,
  BarChart3,
  Layers,
  Globe,
  Sliders,
  Database,
  Lock
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState('annual');
  const [activeStrategy, setActiveStrategy] = useState('scalp');
  const [openFaq, setOpenFaq] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const STRATEGIES = {
    scalp: {
      id: 'STRAT_01',
      name: '5M SCALP MOMENTUM',
      winRate: '88.4%',
      profitFactor: '3.45x',
      sharpe: '3.12',
      drawdown: '-3.2%',
      desc: 'High-frequency orderbook imbalance detection targeting micro-liquidity sweeps across perpetual futures.',
      log: 'EXEC [14:22:08] SOLUSDT_PERP | BID_STACK_IMBALANCE: +340% @ $188.40 | RSI_5M: 28.4 | TARGET: $194.20 | STOP: $186.10'
    },
    whale: {
      id: 'STRAT_02',
      name: '1H WHALE ACCUMULATION',
      winRate: '84.1%',
      profitFactor: '2.95x',
      sharpe: '2.78',
      drawdown: '-4.1%',
      desc: 'Institutional wallet cluster tracking over $500k with machine-learned accumulation breakout detection.',
      log: 'EXEC [14:15:30] ETHUSDT_SPOT | BLOCK_TRADE: 4,200 ETH ($14.3M) ACROSS 3 WALLETS | RESISTANCE: $3,420 BROKEN'
    },
    sentiment: {
      id: 'STRAT_03',
      name: '4H SENTIMENT ALPHA NLP',
      winRate: '81.6%',
      profitFactor: '2.68x',
      sharpe: '2.45',
      drawdown: '-5.0%',
      desc: 'NLP stream parsing news velocity, Telegram channels, and GitHub commits to score directional macro bias.',
      log: 'EXEC [13:45:12] BTCUSDT_PERP | NLP_SCORE: 0.92/1.0 | ETF_SPOT_INFLOW: +$420M | ONCHAIN_VELOCITY: +18.4%'
    },
    grid: {
      id: 'STRAT_04',
      name: '1D DYNAMIC ATR GRID',
      winRate: '92.3%',
      profitFactor: '4.10x',
      sharpe: '3.85',
      drawdown: '-2.1%',
      desc: 'Algorithmic range trading bot adjusting grid bounds dynamically based on 14-day ATR volatility compression.',
      log: 'EXEC [12:00:00] NEARUSDT_PERP | ATR_COMPRESSION: 0.24 | BOUNDS: $4.55 - $5.60 | DYNAMIC_REBALANCE_ACTIVE'
    }
  };

  const FAQS = [
    {
      q: 'How are API keys and exchange secrets secured?',
      a: 'Secrets are encrypted using AES-256-GCM inside dedicated Hardware Security Modules (HSM). We mandate IP-restricted, read-only or trade-restricted keys with zero withdrawal capabilities.'
    },
    {
      q: 'What is the end-to-end latency for signal webhooks?',
      a: 'Orderbook signal confirmation to HTTP/WebSocket dispatch averages 12.4ms across our colocated Rust edge nodes in Tokyo, Frankfurt, and Virginia.'
    },
    {
      q: 'Can we connect proprietary execution bots?',
      a: 'Yes. Every signal emits standardized JSON payloads compatible with 3Commas, Cornix, TradingView webhooks, or custom Python/Rust clients via REST & WebSocket APIs.'
    },
    {
      q: 'Which exchanges and liquidity pools are monitored?',
      a: 'We process real-time L2/L3 orderbook feeds across Binance, Bybit, OKX, Coinbase Pro, Kraken, Deribit, Uniswap v3, and Hyperliquid.'
    }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`curl -X POST https://api.cryptocrispy.com/v2/signals/stream \\
  -H "Authorization: Bearer CRISPY_KEY" \\
  -d '{"symbol": "SOLUSDT", "timeframe": "5m"}'`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#06070A] text-slate-100 font-sans antialiased selection:bg-slate-700 selection:text-white relative">
      
      {/* Editorial Subtle Micro-Grid Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 1. EDITORIAL HEADER NAVBAR (64px, Hairline Border) */}
      <header className="sticky top-0 z-50 bg-[#06070A]/95 border-b border-slate-800/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between font-mono">
          
          {/* Brand Mark */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-7 h-7 bg-slate-100 text-slate-950 font-black flex items-center justify-center text-xs tracking-tighter">
              CC
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wider text-white">CRYPTOCRISPY</span>
              <span className="text-[10px] text-slate-500 font-mono">/ QUANTITATIVE v2.4</span>
            </div>
          </Link>

          {/* Editorial Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-slate-400">
            <a href="#benchmark" className="hover:text-white transition-colors">01. BENCHMARK</a>
            <a href="#architecture" className="hover:text-white transition-colors">02. ARCHITECTURE</a>
            <a href="#strategies" className="hover:text-white transition-colors">03. STRATEGIES</a>
            <a href="#tiers" className="hover:text-white transition-colors">04. TIERS</a>
            <a href="#faq" className="hover:text-white transition-colors">05. FAQ</a>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/overview')}
              className="text-xs font-mono font-semibold px-4 py-2 bg-slate-100 text-slate-950 hover:bg-white transition-all flex items-center gap-2 active:scale-[0.98]"
            >
              <span>LAUNCH TERMINAL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      <main className="relative z-10">

        {/* 2. HERO SECTION (Editorial Serif Headline + High-Density Terminal) */}
        <section className="min-h-[calc(100vh-64px)] pt-12 pb-16 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            
            {/* Left Column: Editorial Display Typography */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Mono System Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-400">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                <span>EST. 2026 // INSTITUTIONAL ORDERBOOK ENGINE</span>
              </div>

              {/* Main Headline with Editorial Serif Accent */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-sans">
                Real-Time Crypto Orderbook <br className="hidden sm:block" />
                <span className="font-serif italic font-normal text-slate-200">
                  Analytics & Execution
                </span>
              </h1>

              {/* Subtext (Strictly <= 20 words) */}
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans max-w-xl">
                Scan liquidation cascades, track whale wallets over $500k, and dispatch sub-15ms webhook signals directly to your trading bots.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => navigate('/overview')}
                  className="px-7 py-3.5 bg-slate-100 hover:bg-white text-slate-950 font-mono font-bold text-xs transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <span>ENTER LIVE TERMINAL</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#strategies"
                  className="px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-mono font-semibold text-xs border border-slate-800 transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <span>STRATEGY SPECS</span>
                </a>
              </div>

              {/* Editorial Spec Strip */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 font-mono text-xs text-slate-400">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">WS FEED LATENCY</div>
                  <div className="font-bold text-white mt-0.5">12.4 ms avg</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">MONITORED PAIRS</div>
                  <div className="font-bold text-white mt-0.5">500+ Spot/Perps</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">HISTORICAL EDGE</div>
                  <div className="font-bold text-emerald-400 mt-0.5">88.4% Win Rate</div>
                </div>
              </div>

            </div>

            {/* Right Column: High-Density Bloomberg-Style Terminal Preview */}
            <div className="lg:col-span-6">
              <div className="bg-[#0E1015] border border-slate-800 font-mono text-xs shadow-2xl overflow-hidden">
                
                {/* Terminal Header */}
                <div className="px-4 py-2.5 bg-[#14171E] border-b border-slate-800 flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-bold text-white">CRYPTOCRISPY_STREAM_v2.4</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    LIVE_FEED
                  </span>
                </div>

                {/* Ticker Row */}
                <div className="grid grid-cols-3 divide-x divide-slate-800 bg-[#0A0C10] border-b border-slate-800 text-center py-2 text-[11px]">
                  <div>
                    <span className="text-slate-500">BTC/USD </span>
                    <span className="text-emerald-400 font-bold">$92,450.00 (+4.2%)</span>
                  </div>
                  <div>
                    <span className="text-slate-500">ETH/USD </span>
                    <span className="text-emerald-400 font-bold">$3,410.50 (+2.8%)</span>
                  </div>
                  <div>
                    <span className="text-slate-500">SOL/USD </span>
                    <span className="text-emerald-400 font-bold">$188.40 (+8.4%)</span>
                  </div>
                </div>

                {/* Main Body Signal */}
                <div className="p-4 space-y-4">
                  
                  <div className="p-4 bg-[#06070A] border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2">
                      <span className="text-xs font-bold text-white">SIGNAL_REF: #SIG-9842</span>
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                        CONFIDENCE: 94%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500">PAIR: </span>
                        <span className="font-bold text-white">SOL/USDT (PERP)</span>
                      </div>
                      <div>
                        <span className="text-slate-500">ACTION: </span>
                        <span className="font-bold text-emerald-400">LONG [5x LEVERAGE]</span>
                      </div>
                      <div>
                        <span className="text-slate-500">ENTRY: </span>
                        <span className="font-bold text-white">$188.40</span>
                      </div>
                      <div>
                        <span className="text-slate-500">TARGET: </span>
                        <span className="font-bold text-emerald-400">$194.20 (+3.08%)</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#14171E] text-[11px] text-slate-400 font-sans leading-relaxed">
                      <span className="font-mono text-slate-500 font-bold">[MODEL_REASONING]: </span>
                      Orderbook bid depth imbalance +340% at $188.00 support. RSI momentum recovery synchronized with $2.4M whale block buy order on-chain.
                    </div>
                  </div>

                  {/* System Log Output */}
                  <div className="p-3 bg-[#06070A] border border-slate-800 space-y-1 text-[11px] text-slate-400">
                    <div className="text-slate-500 font-bold uppercase">SYSTEM EXECUTION STREAM:</div>
                    <div className="text-emerald-400">[14:22:08.102] WEBHOOK_DISPATCH -&gt; Binance API (200 OK - 11ms)</div>
                    <div className="text-slate-400">[14:22:08.090] CONFIDENCE_SCORE: 94% | SHARPE: 3.12 | ATR: 1.42</div>
                  </div>

                </div>

                {/* Footer Bar */}
                <div className="px-4 py-2 bg-[#14171E] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <span>ENCRYPTION: AES-256-GCM // ED25519</span>
                  <button 
                    onClick={() => navigate('/overview')}
                    className="text-slate-200 hover:text-white font-bold underline underline-offset-4"
                  >
                    OPEN TERMINAL &rarr;
                  </button>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 3. INSTITUTIONAL ECOSYSTEM STRIP (Hairline Borders, Monospaced Brand Marks) */}
        <section className="py-8 border-y border-slate-800/80 bg-[#080A0E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">
              MONITORED EXCHANGES & INFRASTRUCTURE
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 font-mono text-xs font-bold text-slate-400">
              
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M16.624 13.9202l2.7175 2.7154-7.353 7.353-7.353-7.352 2.7175-2.7164 4.6355 4.6595 4.6356-4.6595zm4.6356-4.6356L24 12l-2.7404 2.7154-2.7165-2.7154L21.2596 9.2846zM11.9885 0l7.353 7.353-2.7175 2.7154-4.6355-4.6355-4.6356 4.6355-2.7175-2.7154L11.9885 0zM2.7404 9.2846L5.4569 12l-2.7165 2.7154L0 12l2.7404-2.7154zM12 9.2846l2.7154 2.7154L12 14.7154l-2.7154-2.7154L12 9.2846z" />
                </svg>
                <span>BINANCE</span>
              </div>

              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
                </svg>
                <span>COINGECKO</span>
              </div>

              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M2.5 18.5h6v-13h-6v13zm7.5 0h6v-8h-6v8zm7.5-16v16h6v-16h-6z" />
                </svg>
                <span>TRADINGVIEW</span>
              </div>

              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0L2.5 5.5v11L12 22l9.5-5.5v-11L12 0zm6.5 15.1L12 18.9l-6.5-3.8V8.9L12 5.1l6.5 3.8v6.2z" />
                </svg>
                <span>CHAINLINK</span>
              </div>

              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span>UNISWAP_V3</span>
              </div>

              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M3.5 18.5h15l2-3H5.5l-2 3zm0-7h15l2-3H5.5l-2 3zm2-7l-2 3h15l2-3H5.5z" />
                </svg>
                <span>SOLANA</span>
              </div>

            </div>
          </div>
        </section>

        {/* 4. QUANTITATIVE PERFORMANCE BENCHMARK (Oversized Monospace Metrics, Hairline Grid - NO CARD CONTAINERS) */}
        <section id="benchmark" className="py-20 border-b border-slate-800/80 bg-[#06070A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mb-12 space-y-2">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                VERIFIED PERFORMANCE METRICS
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white font-sans">
                Statistical Edge Grounded in Data
              </h2>
            </div>

            {/* 4-Column Hairline Grid (No rounded card containers) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-800 font-mono">
              
              <div className="p-8 border-r border-b border-slate-800 space-y-2">
                <div className="text-5xl lg:text-6xl font-extrabold text-white">88.4<span className="text-2xl text-emerald-400">%</span></div>
                <div className="text-xs text-slate-400 uppercase tracking-wider pt-2">Historical Win Rate</div>
                <div className="text-[11px] text-slate-500 font-sans">Tested across 1,842 backtested scalp signals (30D).</div>
              </div>

              <div className="p-8 border-r border-b border-slate-800 space-y-2">
                <div className="text-5xl lg:text-6xl font-extrabold text-white">3.45<span className="text-2xl text-slate-400">x</span></div>
                <div className="text-xs text-slate-400 uppercase tracking-wider pt-2">Profit Factor</div>
                <div className="text-[11px] text-slate-500 font-sans">Gross profits vs gross losses across all strategies.</div>
              </div>

              <div className="p-8 border-r border-b border-slate-800 space-y-2">
                <div className="text-5xl lg:text-6xl font-extrabold text-white">12.4<span className="text-2xl text-slate-400">ms</span></div>
                <div className="text-xs text-slate-400 uppercase tracking-wider pt-2">Webhook Latency</div>
                <div className="text-[11px] text-slate-500 font-sans">Sub-15ms execution delivery via Rust edge nodes.</div>
              </div>

              <div className="p-8 border-r border-b border-slate-800 space-y-2">
                <div className="text-5xl lg:text-6xl font-extrabold text-white">14<span className="text-2xl text-emerald-400">+</span></div>
                <div className="text-xs text-slate-400 uppercase tracking-wider pt-2">Exchanges Connected</div>
                <div className="text-[11px] text-slate-500 font-sans">Binance, Bybit, OKX, Coinbase, Deribit, DEXs.</div>
              </div>

            </div>

          </div>
        </section>

        {/* 5. EDITORIAL ARCHITECTURE BREAKDOWN (Sticky Editorial Header + Hairline Rows) */}
        <section id="architecture" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sticky Left Editorial Column */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24 h-fit">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                SYSTEM ARCHITECTURE
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans leading-tight">
                Engineered for High-Frequency Traders & <span className="font-serif italic font-normal text-slate-300">Quantitative Funds</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                Four core modular pipelines process streaming orderbook depth, liquidation cascades, and block trades simultaneously.
              </p>
            </div>

            {/* Right Column: Hairline Specification Rows (No Rounded Cards) */}
            <div className="lg:col-span-7 divide-y divide-slate-800/90 border-t border-b border-slate-800 font-sans">
              
              {/* Row 1 */}
              <div className="py-8 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                  <span className="text-white font-bold">01 / LIQUIDATION CASCADE SCANNER</span>
                  <span>WEBSOCKET_L3</span>
                </div>
                <h3 className="text-xl font-bold text-white">Real-Time Liquidation Grab Detection</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Monitors cumulative liquidation clusters across Binance, Bybit, and OKX derivatives to detect liquidity sweeps prior to sharp market reversals.
                </p>
                <div className="pt-2 font-mono text-xs text-emerald-400">
                  &gt; Cluster metric: SOL Perp $186.50 ($4.2M long liquidation sweep detected)
                </div>
              </div>

              {/* Row 2 */}
              <div className="py-8 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                  <span className="text-white font-bold">02 / WHALE BLOCK ORDERFLOW RADAR</span>
                  <span>ONCHAIN_MEMPOOL</span>
                </div>
                <h3 className="text-xl font-bold text-white">Block Trade & Wallet Accumulation Radar</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Identifies block trades exceeding $500,000 in real-time, tagging institutional wallet accumulations and exchange hot-wallet transfers.
                </p>
                <div className="pt-2 font-mono text-xs text-emerald-400">
                  &gt; Wallet alert: 4,200 ETH ($14.3M) accumulated on Coinbase Pro
                </div>
              </div>

              {/* Row 3 */}
              <div className="py-8 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                  <span className="text-white font-bold">03 / SUB-15MS WEBHOOK DISPATCHER</span>
                  <span>RUST_COLOCATED</span>
                </div>
                <h3 className="text-xl font-bold text-white">Sub-15ms Automated Trade Webhooks</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Dispatches encrypted REST & WebSocket payloads directly to 3Commas, Cornix, TradingView webhooks, or custom execution bots.
                </p>
                <div className="pt-2 font-mono text-xs text-slate-300 flex items-center justify-between">
                  <span>POST /v2/signals/stream</span>
                  <button onClick={handleCopyCode} className="underline text-slate-400 hover:text-white">
                    {copiedCode ? 'COPIED!' : 'COPY SDK CMD'}
                  </button>
                </div>
              </div>

              {/* Row 4 */}
              <div className="py-8 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                  <span className="text-white font-bold">04 / MULTI-EXCHANGE MARGIN AGGREGATOR</span>
                  <span>REST_ED25519</span>
                </div>
                <h3 className="text-xl font-bold text-white">Cross-Account Exposure & Risk Heatmap</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Aggregates open position exposure, margin ratios, and unrealized PnL across centralized exchanges and DEX liquidity pools.
                </p>
                <div className="pt-2 font-mono text-xs text-emerald-400">
                  &gt; Combined Portfolio PnL: +$14,820.50 (+18.4% 30D)
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 6. QUANT STRATEGY BACKTEST MATRIX */}
        <section id="strategies" className="py-20 border-t border-slate-800/80 bg-[#080A0E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mb-10 space-y-2">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                QUANTITATIVE STRATEGIES
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white font-sans">
                Backtested Strategy Modules
              </h2>
            </div>

            {/* Monospace Strategy Selector Bar */}
            <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs">
              {Object.keys(STRATEGIES).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveStrategy(key)}
                  className={`px-4 py-2 border transition-colors ${
                    activeStrategy === key
                      ? 'bg-slate-100 text-slate-950 font-bold border-white'
                      : 'bg-[#0E1015] text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {STRATEGIES[key].name}
                </button>
              ))}
            </div>

            {/* Active Strategy Detailed Specs */}
            {STRATEGIES[activeStrategy] && (
              <div className="bg-[#0E1015] p-6 sm:p-8 border border-slate-800 space-y-6 font-mono">
                
                <div className="space-y-1">
                  <div className="text-xs text-slate-400">{STRATEGIES[activeStrategy].id}</div>
                  <h3 className="text-xl font-bold text-white">{STRATEGIES[activeStrategy].name}</h3>
                  <p className="text-xs text-slate-400 font-sans pt-1 max-w-2xl">{STRATEGIES[activeStrategy].desc}</p>
                </div>

                {/* Metric Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-t border-b border-slate-800/80 py-4">
                  <div>
                    <div className="text-[10px] text-slate-500">WIN RATE (30D)</div>
                    <div className="text-2xl font-bold text-emerald-400 mt-1">{STRATEGIES[activeStrategy].winRate}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">PROFIT FACTOR</div>
                    <div className="text-2xl font-bold text-white mt-1">{STRATEGIES[activeStrategy].profitFactor}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">SHARPE RATIO</div>
                    <div className="text-2xl font-bold text-slate-300 mt-1">{STRATEGIES[activeStrategy].sharpe}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">MAX DRAWDOWN</div>
                    <div className="text-2xl font-bold text-emerald-400 mt-1">{STRATEGIES[activeStrategy].drawdown}</div>
                  </div>
                </div>

                {/* Raw Execution Log Output */}
                <div className="p-3 bg-[#06070A] border border-slate-800 space-y-1 text-xs">
                  <div className="text-slate-500 font-bold uppercase text-[10px]">RAW LOG PAYLOAD:</div>
                  <div className="text-slate-300 font-mono text-[11px] leading-relaxed break-all">
                    {STRATEGIES[activeStrategy].log}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => navigate('/overview')}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-colors flex items-center gap-2 active:scale-[0.98]"
                  >
                    <span>ACTIVATE IN TERMINAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </div>
        </section>

        {/* 7. INSTITUTIONAL TIER COMPARISON MATRIX (Full-Width Table, NOT 3 Rounded Cards) */}
        <section id="tiers" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              PRICING & API ACCESS
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white font-sans">
              Structured Institutional Tiers
            </h2>
            <p className="text-slate-400 text-sm">
              All plans include read-only exchange connectivity and encrypted execution webhooks.
            </p>
          </div>

          {/* Full-Width Structured Comparison Table (No card cluster) */}
          <div className="border border-slate-800 font-mono text-xs overflow-x-auto">
            <table className="w-full text-left divide-y divide-slate-800">
              <thead className="bg-[#0E1015] text-slate-400 uppercase text-[11px]">
                <tr>
                  <th className="py-4 px-6 font-bold text-white">Tier Specifications</th>
                  <th className="py-4 px-6 text-center font-bold text-white">Starter ($0)</th>
                  <th className="py-4 px-6 text-center font-bold text-emerald-400 bg-slate-900/60 border-x border-slate-800">
                    Pro Trader ($49/mo)
                  </th>
                  <th className="py-4 px-6 text-center font-bold text-white">Institutional ($199/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-[#06070A] text-slate-300">
                <tr>
                  <td className="py-3.5 px-6 font-bold text-white">Monitored Pairs & Exchanges</td>
                  <td className="py-3.5 px-6 text-center text-slate-400">Top 50 Spot</td>
                  <td className="py-3.5 px-6 text-center text-white bg-slate-900/30 border-x border-slate-800">500+ Spot & Perps</td>
                  <td className="py-3.5 px-6 text-center text-white">All 14 Exchanges + DEXs</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-white">Quant Strategy Modules</td>
                  <td className="py-3.5 px-6 text-center text-slate-400">Basic Scanner</td>
                  <td className="py-3.5 px-6 text-center text-white bg-slate-900/30 border-x border-slate-800">All 4 Strategy Modules</td>
                  <td className="py-3.5 px-6 text-center text-white">Custom Model Training</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-white">Sub-15ms Webhook Execution</td>
                  <td className="py-3.5 px-6 text-center text-slate-600">—</td>
                  <td className="py-3.5 px-6 text-center text-emerald-400 bg-slate-900/30 border-x border-slate-800 font-bold">✔ Unlimited</td>
                  <td className="py-3.5 px-6 text-center text-emerald-400 font-bold">✔ Private Colocated Node</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-white">Whale Block Orderflow Radar</td>
                  <td className="py-3.5 px-6 text-center text-slate-600">—</td>
                  <td className="py-3.5 px-6 text-center text-emerald-400 bg-slate-900/30 border-x border-slate-800 font-bold">✔ Included</td>
                  <td className="py-3.5 px-6 text-center text-emerald-400 font-bold">✔ Direct Mempool Feed</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-white">Support & SLA</td>
                  <td className="py-3.5 px-6 text-center text-slate-400">Community</td>
                  <td className="py-3.5 px-6 text-center text-white bg-slate-900/30 border-x border-slate-800">Priority Email / Discord</td>
                  <td className="py-3.5 px-6 text-center text-white">24/7 Dedicated Engineer</td>
                </tr>
                <tr className="bg-[#0E1015]">
                  <td className="py-4 px-6"></td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => navigate('/overview')}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-800 transition-colors w-full"
                    >
                      START FREE
                    </button>
                  </td>
                  <td className="py-4 px-6 text-center bg-slate-900/80 border-x border-slate-800">
                    <button
                      onClick={() => navigate('/subscription')}
                      className="px-4 py-2 bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs transition-colors w-full"
                    >
                      GET PRO ACCESS
                    </button>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => navigate('/subscription')}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-800 transition-colors w-full"
                    >
                      CONTACT SALES
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </section>

        {/* 8. DOCUMENTATION FAQ & TERMINAL CALL-TO-ACTION */}
        <section id="faq" className="py-20 border-t border-slate-800/80 bg-[#080A0E]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="mb-10 space-y-2">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">DOCUMENTATION</div>
              <h2 className="text-2xl font-bold tracking-tight text-white font-sans">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="bg-[#0E1015] border border-slate-800 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left text-slate-200 hover:text-white font-bold"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-slate-400 text-xs font-sans leading-relaxed border-t border-slate-800/60 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Terminal Direct CTA Bar */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0E1015] border border-slate-800 p-8 sm:p-12 text-center space-y-6 font-mono">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              Start Scanning Orderbooks in Seconds
            </h2>
            <p className="text-slate-400 text-xs font-sans max-w-xl mx-auto">
              No credit card required. Connect read-only API keys or test strategy backtests in paper-trading mode.
            </p>
            <div className="flex justify-center pt-2">
              <button
                onClick={() => navigate('/overview')}
                className="px-8 py-3.5 bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 active:scale-[0.98]"
              >
                <span>OPEN LIVE TERMINAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#050608] py-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">CRYPTOCRISPY</span>
            <span>&copy; 2026 // v2.4.0</span>
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              SYSTEM_ONLINE (12.4ms)
            </span>
            <Link to="/developer" className="hover:text-slate-300">API_DOCS</Link>
            <a href="#privacy" className="hover:text-slate-300">PRIVACY</a>
            <a href="#terms" className="hover:text-slate-300">TERMS</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
