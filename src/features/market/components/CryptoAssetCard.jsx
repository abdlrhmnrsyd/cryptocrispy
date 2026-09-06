import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Activity,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  BarChart2,
  Check,
  Bookmark
} from 'lucide-react';
import CardEmbeddedChart from './CardEmbeddedChart';
import { useMarketStore } from '../../../stores/useMarketStore';
import { useAIStore } from '../../../stores/useAIStore';

export default function CryptoAssetCard({ asset }) {
  const navigate = useNavigate();
  const { setActiveSymbol } = useMarketStore();
  const { openAnalysisModal } = useAIStore();

  const [timeframe, setTimeframe] = useState('4H');
  const [showPrediction, setShowPrediction] = useState(true);
  const [showOverlays, setShowOverlays] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isBullish = asset.aiSentiment === 'Bullish';

  return (
    <div className="bg-[#111113] border border-[#27272A] hover:border-violet-500/40 rounded-2xl p-4 md:p-5 transition-all shadow-xl space-y-4 relative group">
      {/* 1. Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-center font-black text-white text-sm shadow-inner">
            {asset.base.slice(0, 3)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-tight">{asset.symbol}</span>
              <span className="text-[10px] font-mono text-[#71717A] bg-[#18181B] px-1.5 py-0.2 rounded border border-[#27272A]">
                #{asset.rank}
              </span>
            </div>
            <div className="text-xs text-[#71717A] font-medium">{asset.name} • {asset.category}</div>
          </div>
        </div>

        {/* AI Sentiment & Dropdown Action Menu */}
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-black tracking-wider flex items-center gap-1.5 shadow-xs ${
              isBullish
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-red-500/15 text-red-400 border border-red-500/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{asset.aiConfidence}% {asset.aiSentiment.toUpperCase()}</span>
          </span>

          {/* Asset Dropdown Controls Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#A1A1AA] hover:text-white border border-[#27272A] transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#111113] border border-[#27272A] rounded-xl shadow-2xl z-50 p-2 text-xs space-y-2">
                <div className="px-2 py-1 text-[10px] font-semibold text-[#71717A] uppercase">
                  Chart Timeframe
                </div>
                <div className="grid grid-cols-5 gap-1 bg-[#18181B] p-1 rounded-lg border border-[#27272A]">
                  {['5m', '15m', '1H', '4H', '1D'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => {
                        setTimeframe(tf);
                        setIsDropdownOpen(false);
                      }}
                      className={`py-1 text-[11px] font-bold rounded ${
                        timeframe === tf ? 'bg-violet-600 text-white' : 'text-[#71717A] hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>

                <div className="px-2 py-1 text-[10px] font-semibold text-[#71717A] uppercase">
                  AI Chart Overlays
                </div>

                <button
                  onClick={() => setShowPrediction(!showPrediction)}
                  className="flex items-center justify-between w-full px-2.5 py-1.5 rounded bg-[#18181B] hover:bg-[#27272A] text-[#FAFAFA]"
                >
                  <span>AI Future Forecast Path</span>
                  <Check className={`w-3.5 h-3.5 text-violet-400 ${showPrediction ? 'opacity-100' : 'opacity-0'}`} />
                </button>

                <button
                  onClick={() => setShowOverlays(!showOverlays)}
                  className="flex items-center justify-between w-full px-2.5 py-1.5 rounded bg-[#18181B] hover:bg-[#27272A] text-[#FAFAFA]"
                >
                  <span>AI TP/SL Target Lines</span>
                  <Check className={`w-3.5 h-3.5 text-emerald-400 ${showOverlays ? 'opacity-100' : 'opacity-0'}`} />
                </button>

                <div className="pt-1 border-t border-[#27272A] space-y-1">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      openAnalysisModal(asset);
                    }}
                    className="flex items-center gap-2 w-full px-2.5 py-1.5 text-violet-300 hover:bg-violet-600/20 rounded font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    <span>Trigger AI Deep Evaluation</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setActiveSymbol(asset.symbol);
                      navigate('/markets');
                    }}
                    className="flex items-center gap-2 w-full px-2.5 py-1.5 text-[#A1A1AA] hover:text-white hover:bg-[#18181B] rounded"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Open in Full Terminal</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Real-time Price & 24h Stats Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[10px] text-[#71717A] uppercase font-semibold">Live Price</div>
          <div className="text-xl font-black font-mono text-white leading-tight">
            ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="text-right">
          <div
            className={`text-sm font-extrabold flex items-center justify-end gap-1 ${
              asset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {asset.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {asset.change24h >= 0 ? '+' : ''}
            {asset.change24h}%
          </div>
          <div className="text-[10px] text-[#71717A] font-mono">Vol ${asset.volume24h}</div>
        </div>
      </div>

      {/* 3. Embedded Interactive Chart with AI Prediction Overlays */}
      <div className="h-[230px] w-full">
        <CardEmbeddedChart
          asset={asset}
          timeframe={timeframe}
          showPrediction={showPrediction}
          showOverlays={showOverlays}
        />
      </div>

      {/* 4. Institutional Market Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono p-3 rounded-xl bg-[#18181B]/70 border border-[#27272A]">
        <div>
          <span className="text-[9px] uppercase font-sans font-semibold text-[#71717A] block">Funding Rate</span>
          <span className="text-emerald-400 font-bold">{asset.fundingRate}</span>
        </div>
        <div>
          <span className="text-[9px] uppercase font-sans font-semibold text-[#71717A] block">Open Interest</span>
          <span className="text-white font-bold">{asset.openInterest}</span>
        </div>
        <div>
          <span className="text-[9px] uppercase font-sans font-semibold text-[#71717A] block">Long/Short Ratio</span>
          <span className="text-violet-300 font-bold">{asset.longRatio}% Long</span>
        </div>
        <div>
          <span className="text-[9px] uppercase font-sans font-semibold text-[#71717A] block">RSI Index</span>
          <span className="text-white font-bold">{asset.rsi}</span>
        </div>
      </div>

      {/* Long/Short Ratio Meter */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] text-[#71717A] font-medium">
          <span>Long Sentiment {asset.longRatio}%</span>
          <span>Short Sentiment {100 - asset.longRatio}%</span>
        </div>
        <div className="w-full h-1.5 bg-red-500/30 rounded-full overflow-hidden flex">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${asset.longRatio}%` }} />
        </div>
      </div>

      {/* 5. Expandable AI Reasoning Section */}
      <div className="pt-2 border-t border-[#27272A]">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Reasoning & Technical Confluences</span>
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded && (
          <div className="mt-3 p-3 rounded-xl bg-[#09090B] border border-[#27272A] text-xs space-y-2 animate-in fade-in duration-200">
            <div className="flex justify-between text-[11px] font-mono border-b border-[#27272A] pb-1.5">
              <span className="text-[#71717A]">AI Forecast Horizon:</span>
              <span className="text-white font-bold">{asset.aiForecastHorizon}</span>
            </div>
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-[#71717A]">Target Take-Profit:</span>
              <span className="text-emerald-400 font-bold">${asset.aiTargetPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-[#71717A]">Invalidation Stop-Loss:</span>
              <span className="text-red-400 font-bold">${asset.aiStopLoss.toLocaleString()}</span>
            </div>
            <div className="text-[11px] text-[#A1A1AA] pt-1 leading-relaxed">
              Institutional demand block holding at ${asset.support.toLocaleString()}. AI neural evaluation projects {isBullish ? 'bullish continuation' : 'downward retest'} with {asset.aiConfidence}% confidence score.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
