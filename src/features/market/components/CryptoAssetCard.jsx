import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  ArrowUpRight,
  Bookmark,
  Check
} from 'lucide-react';
import CardEmbeddedChart from './CardEmbeddedChart';
import { useMarketStore } from '../../../stores/useMarketStore';
import { useAIStore } from '../../../stores/useAIStore';
import { useWatchlistStore } from '../../../stores/useWatchlistStore';

export default function CryptoAssetCard({ asset }) {
  const navigate = useNavigate();
  const { setActiveSymbol } = useMarketStore();
  const { openAnalysisModal } = useAIStore();
  const { isWatchlisted, toggleWatchlist } = useWatchlistStore();

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
  const bookmarked = isWatchlisted(asset.symbol);

  return (
    <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 rounded-2xl p-4 md:p-5 transition-all shadow-sm dark:shadow-xl space-y-4 relative group">
      {/* AI Header Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400">
          <span className="p-1 rounded-md bg-blue-50 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <span className="uppercase tracking-wider text-[10px]">AI Neural Forecast</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWatchlist(asset.symbol)}
            className="p-1 rounded text-slate-400 hover:text-amber-500 transition-colors"
            title={bookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'text-amber-500 fill-amber-500' : ''}`} />
          </button>
          <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800">
            Horizon: 24H
          </span>
        </div>
      </div>

      {/* 1. Symbol & Price Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#131B26] border border-slate-200 dark:border-slate-800 flex items-center justify-center font-black text-slate-900 dark:text-white text-sm shadow-xs">
            {asset.base.slice(0, 3)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight">{asset.symbol}</span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.2 rounded border border-slate-200 dark:border-slate-800">
                #{asset.rank}
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{asset.name} • {asset.category}</div>
          </div>
        </div>

        {/* AI Sentiment Badge & Action Menu */}
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-black tracking-wider flex items-center gap-1.5 ${
              isBullish ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>{asset.aiConfidence}% {asset.aiSentiment.toUpperCase()}</span>
          </span>

          {/* Asset Dropdown Controls Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#131B26] border border-blue-500/40 rounded-xl shadow-2xl z-50 p-2 text-xs space-y-2">
                <div className="px-2 py-1 text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase">
                  Chart Timeframe
                </div>
                <div className="grid grid-cols-5 gap-1 bg-slate-100 dark:bg-[#0D1117] p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                  {['5m', '15m', '1H', '4H', '1D'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => {
                        setTimeframe(tf);
                        setIsDropdownOpen(false);
                      }}
                      className={`py-1 text-[11px] font-bold rounded ${
                        timeframe === tf ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>

                <div className="px-2 py-1 text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase">
                  AI Overlays
                </div>

                <button
                  onClick={() => setShowPrediction(!showPrediction)}
                  className="flex items-center justify-between w-full px-2.5 py-1.5 rounded bg-slate-50 dark:bg-[#0D1117] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white"
                >
                  <span>AI Future Forecast Path</span>
                  <Check className={`w-3.5 h-3.5 text-blue-500 ${showPrediction ? 'opacity-100' : 'opacity-0'}`} />
                </button>

                <button
                  onClick={() => setShowOverlays(!showOverlays)}
                  className="flex items-center justify-between w-full px-2.5 py-1.5 rounded bg-slate-50 dark:bg-[#0D1117] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-white"
                >
                  <span>AI TP/SL Target Lines</span>
                  <Check className={`w-3.5 h-3.5 text-emerald-500 ${showOverlays ? 'opacity-100' : 'opacity-0'}`} />
                </button>

                <div className="pt-1 border-t border-slate-200 dark:border-slate-800 space-y-1">
                  <button
                    onClick={() => {
                      toggleWatchlist(asset.symbol);
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-2.5 py-1.5 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded font-medium"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{bookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      openAnalysisModal(asset);
                    }}
                    className="flex items-center gap-2 w-full px-2.5 py-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-600/20 rounded font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    <span>Trigger AI Evaluation</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setActiveSymbol(asset.symbol);
                      navigate('/markets');
                    }}
                    className="flex items-center gap-2 w-full px-2.5 py-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0D1117] rounded"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Open Full Terminal</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Price Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Live Price</div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white leading-tight">
            ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="text-right">
          <div
            className={`text-sm font-extrabold flex items-center justify-end gap-1 ${
              asset.change24h >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {asset.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {asset.change24h >= 0 ? '+' : ''}
            {asset.change24h}%
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Vol ${asset.volume24h}</div>
        </div>
      </div>

      {/* 3. Embedded Interactive Chart */}
      <div className="h-[230px] w-full">
        <CardEmbeddedChart
          asset={asset}
          timeframe={timeframe}
          showPrediction={showPrediction}
          showOverlays={showOverlays}
        />
      </div>

      {/* 4. AI Target & Stop Loss Summary Row */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono p-2.5 rounded-xl bg-slate-50 dark:bg-[#070A11] border border-blue-500/20">
        <div className="flex items-center justify-between px-2 py-1 rounded bg-white dark:bg-[#131B26] border border-emerald-500/20">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans font-semibold uppercase">AI Target TP</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">${asset.aiTargetPrice.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between px-2 py-1 rounded bg-white dark:bg-[#131B26] border border-red-500/20">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans font-semibold uppercase">AI Stop SL</span>
          <span className="text-red-600 dark:text-red-400 font-bold">${asset.aiStopLoss.toLocaleString()}</span>
        </div>
      </div>

      {/* 5. Institutional Market Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono p-3 rounded-xl bg-slate-50 dark:bg-[#131B26] border border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-[9px] uppercase font-sans font-semibold text-slate-400 dark:text-slate-500 block">Funding Rate</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{asset.fundingRate}</span>
        </div>
        <div>
          <span className="text-[9px] uppercase font-sans font-semibold text-slate-400 dark:text-slate-500 block">Open Interest</span>
          <span className="text-slate-800 dark:text-white font-bold">{asset.openInterest}</span>
        </div>
        <div>
          <span className="text-[9px] uppercase font-sans font-semibold text-slate-400 dark:text-slate-500 block">Long/Short</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">{asset.longRatio}% Long</span>
        </div>
        <div>
          <span className="text-[9px] uppercase font-sans font-semibold text-slate-400 dark:text-slate-500 block">RSI Index</span>
          <span className="text-slate-800 dark:text-white font-bold">{asset.rsi}</span>
        </div>
      </div>

      {/* Expandable AI Reasoning Section */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-white transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>AI Reasoning & Confluence Breakdown</span>
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-blue-500" /> : <ChevronDown className="w-4 h-4 text-blue-500" />}
        </button>

        {isExpanded && (
          <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-[#070A11] border border-blue-500/30 text-xs space-y-2 animate-in fade-in duration-200">
            <div className="flex justify-between text-[11px] font-mono border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <span className="text-slate-500 dark:text-slate-400">AI Forecast Horizon:</span>
              <span className="text-slate-900 dark:text-white font-bold">{asset.aiForecastHorizon}</span>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Institutional demand block holding at ${asset.support.toLocaleString()}. AI neural model evaluation projects {isBullish ? 'bullish continuation' : 'downward retest'} with {asset.aiConfidence}% confidence score.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
