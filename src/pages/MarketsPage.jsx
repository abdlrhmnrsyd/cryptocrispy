import { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Layers,
  Activity,
  Check,
  Zap,
  ShieldCheck,
  ChevronDown,
  BarChart2,
  LineChart
} from 'lucide-react';
import { useMarketStore } from '../stores/useMarketStore';
import { useAIStore } from '../stores/useAIStore';
import MarketChart from '../features/market/components/MarketChart';
import TradingViewChart from '../features/market/components/TradingViewChart';

export default function MarketsPage() {
  const { assets, activeSymbol, activeAsset, setActiveSymbol, timeframe, setTimeframe, overlays, toggleOverlay } =
    useMarketStore();
  const { openAnalysisModal } = useAIStore();

  const [isAssetDropdownOpen, setIsAssetDropdownOpen] = useState(false);
  const [chartSource, setChartSource] = useState('LIGHTWEIGHT'); // 'LIGHTWEIGHT' or 'TRADINGVIEW'

  const TIMEFRAMES = ['5m', '15m', '1H', '4H', '1D'];

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-6">
      {/* 1. Header Toolbar: Asset Selector, Live Price & Timeframes */}
      <div className="p-3.5 bg-[#111113] border border-[#27272A] rounded-xl flex flex-wrap items-center justify-between gap-4">
        {/* Asset Dropdown Selector & Key Stats */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsAssetDropdownOpen(!isAssetDropdownOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 bg-[#18181B] border border-[#27272A] hover:border-violet-500/40 rounded-lg text-white font-bold text-sm transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-violet-600/20 text-violet-300 flex items-center justify-center text-xs">
                {activeAsset.base.slice(0, 3)}
              </div>
              <span>{activeAsset.symbol}</span>
              <ChevronDown className="w-4 h-4 text-[#71717A]" />
            </button>

            {/* Dropdown Menu */}
            {isAssetDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-[#111113] border border-[#27272A] rounded-xl shadow-2xl z-50 py-1 divide-y divide-[#27272A] max-h-80 overflow-y-auto">
                {assets.map((asset) => (
                  <div
                    key={asset.symbol}
                    onClick={() => {
                      setActiveSymbol(asset.symbol);
                      setIsAssetDropdownOpen(false);
                    }}
                    className="p-2.5 hover:bg-[#18181B] cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{asset.symbol}</div>
                      <div className="text-[10px] text-[#71717A]">{asset.name}</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-white">${asset.price.toLocaleString()}</div>
                      <div className={asset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {asset.change24h >= 0 ? '+' : ''}
                        {asset.change24h}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Real-time Price Header */}
          <div className="border-l border-[#27272A] pl-4">
            <div className="text-[10px] text-[#71717A] uppercase font-semibold">Mark Price</div>
            <div className="text-lg font-black font-mono text-white leading-tight">
              ${activeAsset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>

          {/* 24h Change */}
          <div>
            <div className="text-[10px] text-[#71717A] uppercase font-semibold">24h Change</div>
            <div
              className={`text-sm font-bold flex items-center gap-1 mt-0.5 ${
                activeAsset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {activeAsset.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {activeAsset.change24h >= 0 ? '+' : ''}
              {activeAsset.change24h}%
            </div>
          </div>

          {/* 24h High/Low */}
          <div className="hidden lg:block border-l border-[#27272A] pl-4 text-xs font-mono">
            <div className="text-[10px] text-[#71717A] font-sans uppercase font-semibold">24h High / Low</div>
            <div className="text-[#FAFAFA] mt-0.5">
              <span className="text-emerald-400">${activeAsset.high24h.toLocaleString()}</span> /{' '}
              <span className="text-red-400">${activeAsset.low24h.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right Actions: Source Toggle, Timeframes & AI Trigger */}
        <div className="flex items-center gap-2">
          {/* Chart Engine Source Switch */}
          <div className="flex items-center bg-[#18181B] p-1 rounded-lg border border-[#27272A]">
            <button
              onClick={() => setChartSource('LIGHTWEIGHT')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md flex items-center gap-1 transition-all ${
                chartSource === 'LIGHTWEIGHT'
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'text-[#71717A] hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>AI Predictions</span>
            </button>
            <button
              onClick={() => setChartSource('TRADINGVIEW')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md flex items-center gap-1 transition-all ${
                chartSource === 'TRADINGVIEW'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-[#71717A] hover:text-white'
              }`}
            >
              <LineChart className="w-3 h-3" />
              <span>TradingView Widget</span>
            </button>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center bg-[#18181B] p-1 rounded-lg border border-[#27272A]">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                  timeframe === tf
                    ? 'bg-violet-600 text-white shadow-xs'
                    : 'text-[#71717A] hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={() => openAnalysisModal(activeAsset)}
            className="py-1.5 px-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-violet-600/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-200" />
            <span>AI Deep Scan</span>
          </button>
        </div>
      </div>

      {/* 2. AI Technical Detections Overlay Bar (Only shown for AI Engine Chart) */}
      {chartSource === 'LIGHTWEIGHT' && (
        <div className="px-3.5 py-2 bg-[#111113] border border-[#27272A] rounded-xl flex items-center gap-3 overflow-x-auto text-xs">
          <span className="text-[11px] font-semibold text-violet-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
            <Layers className="w-3.5 h-3.5" /> AI Overlays:
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleOverlay('supportResistance')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border flex items-center gap-1.5 transition-all ${
                overlays.supportResistance
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-[#18181B] text-[#71717A] border-[#27272A]'
              }`}
            >
              <Check className={`w-3 h-3 ${overlays.supportResistance ? 'opacity-100' : 'opacity-0'}`} />
              Support / Resistance
            </button>

            <button
              onClick={() => toggleOverlay('fvg')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border flex items-center gap-1.5 transition-all ${
                overlays.fvg
                  ? 'bg-violet-500/10 text-violet-300 border-violet-500/30'
                  : 'bg-[#18181B] text-[#71717A] border-[#27272A]'
              }`}
            >
              <Check className={`w-3 h-3 ${overlays.fvg ? 'opacity-100' : 'opacity-0'}`} />
              Fair Value Gap (FVG)
            </button>

            <button
              onClick={() => toggleOverlay('orderBlock')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium border flex items-center gap-1.5 transition-all ${
                overlays.orderBlock
                  ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                  : 'bg-[#18181B] text-[#71717A] border-[#27272A]'
              }`}
            >
              <Check className={`w-3 h-3 ${overlays.orderBlock ? 'opacity-100' : 'opacity-0'}`} />
              Order Blocks (OB)
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Trading Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
        {/* Left 2 Cols: Selected Chart Engine */}
        <div className="lg:col-span-2 h-full">
          {chartSource === 'TRADINGVIEW' ? (
            <TradingViewChart symbol={activeAsset.symbol} timeframe={timeframe} />
          ) : (
            <MarketChart asset={activeAsset} timeframe={timeframe} overlays={overlays} />
          )}
        </div>

        {/* Right 1 Col: AI Market Copilot Side Panel */}
        <div className="h-full bg-[#111113] border border-[#27272A] rounded-xl p-4 flex flex-col justify-between overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <h3 className="font-bold text-white text-sm">AI Copilot Analysis</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                LIVE
              </span>
            </div>

            {/* Sentiment Meter */}
            <div className="mt-4 p-3 rounded-xl bg-[#18181B] border border-[#27272A] space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#71717A] font-medium">Bias Confidence</span>
                <span className="font-bold text-violet-300 font-mono">{activeAsset.aiConfidence}%</span>
              </div>
              <div className="w-full h-2 bg-[#27272A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-emerald-400 rounded-full"
                  style={{ width: `${activeAsset.aiConfidence}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-[#A1A1AA]">
                <span>BEARISH</span>
                <span className="text-emerald-400">{activeAsset.aiSentiment.toUpperCase()}</span>
                <span>BULLISH</span>
              </div>
            </div>

            {/* Structural Detections */}
            <div className="mt-4 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Detected Market Patterns</div>

              <div className="p-2.5 rounded-lg bg-[#18181B]/70 border border-[#27272A] text-xs space-y-1">
                <div className="font-semibold text-emerald-400 flex items-center justify-between">
                  <span>✓ 4H Bullish Order Block</span>
                  <span className="text-[10px] text-[#71717A] font-mono">${activeAsset.orderBlock}</span>
                </div>
                <p className="text-[#A1A1AA] text-[11px]">Strong buy imbalance recorded on last 4H closing candle.</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#18181B]/70 border border-[#27272A] text-xs space-y-1">
                <div className="font-semibold text-violet-300 flex items-center justify-between">
                  <span>✓ Liquidity Sweep Zone</span>
                  <span className="text-[10px] text-[#71717A] font-mono">${activeAsset.support}</span>
                </div>
                <p className="text-[#A1A1AA] text-[11px]">Equal lows cleared; price re-entered value area.</p>
              </div>
            </div>
          </div>

          {/* Quick Trade Setup Suggestion */}
          <div className="p-3 rounded-xl bg-violet-600/10 border border-violet-500/20 text-xs space-y-2">
            <div className="font-semibold text-violet-300 flex items-center justify-between">
              <span>Suggested AI Setup ({activeAsset.base})</span>
              <span className="font-mono text-emerald-400">LONG</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#A1A1AA]">
              <div>Target: <span className="text-emerald-400">${activeAsset.resistance}</span></div>
              <div>Stop: <span className="text-red-400">${activeAsset.support}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
