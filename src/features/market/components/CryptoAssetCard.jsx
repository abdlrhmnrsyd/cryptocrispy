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
    <div className="bg-white dark:bg-[#0E1626] border border-slate-300 dark:border-slate-700/90 hover:border-blue-500/80 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 shadow-md hover:shadow-xl dark:shadow-2xl space-y-4.5 relative group">
      {/* AI Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700/70 text-xs">
        <div className="flex items-center gap-2 font-black text-blue-600 dark:text-blue-400">
          <span className="p-1.5 rounded-lg bg-blue-500/15 border border-blue-500/40 text-blue-600 dark:text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <span className="uppercase tracking-widest text-[11px]">AI Neural Forecast</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWatchlist(asset.symbol)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95 cursor-pointer"
            title={bookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'text-amber-500 fill-amber-500' : ''}`} />
          </button>
          <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/90 px-2.5 py-0.5 rounded-full border border-slate-300 dark:border-slate-700">
            Horizon: 24H
          </span>
        </div>
      </div>

      {/* 1. Symbol & Price Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-[#162238] border border-slate-300 dark:border-slate-700 flex items-center justify-center font-black text-slate-900 dark:text-white text-base shadow-xs">
            {asset.base.slice(0, 3)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-900 dark:text-white text-lg tracking-tight">{asset.symbol}</span>
              <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700">
                #{asset.rank}
              </span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 font-semibold">{asset.name} • {asset.category}</div>
          </div>
        </div>

        {/* AI Sentiment Badge & Action Menu */}
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-xl text-xs font-black tracking-wider flex items-center gap-1.5 shadow-xs ${
              isBullish
                ? 'bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/50'
                : 'bg-rose-500/15 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>{asset.aiConfidence}% {asset.aiSentiment.toUpperCase()}</span>
          </span>

          {/* Asset Dropdown Controls Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#131D30] border border-blue-500/50 rounded-2xl shadow-2xl z-50 p-2 text-xs space-y-2">
                <div className="px-2 py-1 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase">
                  Chart Timeframe
                </div>
                <div className="grid grid-cols-5 gap-1 bg-slate-100 dark:bg-[#0A101D] p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                  {['5m', '15m', '1H', '4H', '1D'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => {
                        setTimeframe(tf);
                        setIsDropdownOpen(false);
                      }}
                      className={`py-1 text-[11px] font-bold rounded-lg cursor-pointer ${
                        timeframe === tf ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>

                <div className="px-2 py-1 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase">
                  AI Overlays
                </div>

                <button
                  onClick={() => setShowPrediction(!showPrediction)}
                  className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0A101D] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-medium cursor-pointer"
                >
                  <span>AI Future Forecast Path</span>
                  <Check className={`w-3.5 h-3.5 text-blue-500 ${showPrediction ? 'opacity-100' : 'opacity-0'}`} />
                </button>

                <button
                  onClick={() => setShowOverlays(!showOverlays)}
                  className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0A101D] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-medium cursor-pointer"
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
                    className="flex items-center gap-2 w-full px-2.5 py-1.5 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg font-bold cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{bookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      openAnalysisModal(asset);
                    }}
                    className="flex items-center gap-2 w-full px-2.5 py-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-600/20 rounded-lg font-bold cursor-pointer"
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
                    className="flex items-center gap-2 w-full px-2.5 py-1.5 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0A101D] rounded-lg font-bold cursor-pointer"
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
      <div className="flex items-end justify-between pt-1">
        <div>
          <div className="text-[10px] text-slate-600 dark:text-slate-300 uppercase font-black tracking-wider">Live Price</div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white leading-tight">
            ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="text-right">
          <div
            className={`text-sm font-black flex items-center justify-end gap-1 ${
              asset.change24h >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {asset.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {asset.change24h >= 0 ? '+' : ''}
            {asset.change24h}%
          </div>
          <div className="text-[11px] text-slate-600 dark:text-slate-300 font-mono font-bold">Vol ${asset.volume24h}</div>
        </div>
      </div>

      {/* 3. Embedded Interactive Chart */}
      <div className="h-[230px] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800/80">
        <CardEmbeddedChart
          asset={asset}
          timeframe={timeframe}
          showPrediction={showPrediction}
          showOverlays={showOverlays}
        />
      </div>

      {/* 4. AI Target & Stop Loss Summary Row */}
      <div className="grid grid-cols-2 gap-2.5 text-xs font-mono p-2.5 rounded-xl bg-slate-100 dark:bg-[#131D30] border border-slate-300 dark:border-slate-700/80">
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#0A101D] border border-emerald-500/30">
          <span className="text-[10px] text-slate-600 dark:text-slate-300 font-sans font-bold uppercase">AI Target TP</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">${asset.aiTargetPrice.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#0A101D] border border-rose-500/30">
          <span className="text-[10px] text-slate-600 dark:text-slate-300 font-sans font-bold uppercase">AI Stop SL</span>
          <span className="text-rose-600 dark:text-rose-400 font-extrabold text-xs">${asset.aiStopLoss.toLocaleString()}</span>
        </div>
      </div>

      {/* 5. Institutional Market Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono p-3 rounded-xl bg-slate-100 dark:bg-[#131D30] border border-slate-300 dark:border-slate-700/80">
        <div>
          <span className="text-[9px] uppercase font-sans font-extrabold text-slate-600 dark:text-slate-300 block">Funding Rate</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{asset.fundingRate}</span>
        </div>
        <div>
          <span className="text-[9px] uppercase font-sans font-extrabold text-slate-600 dark:text-slate-300 block">Open Interest</span>
          <span className="text-slate-900 dark:text-white font-extrabold">{asset.openInterest}</span>
        </div>
        <div>
          <span className="text-[9px] uppercase font-sans font-extrabold text-slate-600 dark:text-slate-300 block">Long/Short</span>
          <span className="text-blue-600 dark:text-blue-400 font-extrabold">{asset.longRatio}% Long</span>
        </div>
        <div>
          <span className="text-[9px] uppercase font-sans font-extrabold text-slate-600 dark:text-slate-300 block">RSI Index</span>
          <span className="text-slate-900 dark:text-white font-extrabold">{asset.rsi}</span>
        </div>
      </div>

      {/* Expandable AI Reasoning Section */}
      <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-white transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>AI Reasoning & Confluence Breakdown</span>
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-blue-500" /> : <ChevronDown className="w-4 h-4 text-blue-500" />}
        </button>

        {isExpanded && (
          <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-[#0A101D] border border-blue-500/40 text-xs space-y-2 animate-in fade-in duration-200">
            <div className="flex justify-between text-[11px] font-mono border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <span className="text-slate-500 dark:text-slate-400">AI Forecast Horizon:</span>
              <span className="text-slate-900 dark:text-white font-bold">{asset.aiForecastHorizon}</span>
            </div>
            <div className="text-[11px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
              Institutional demand block holding at ${asset.support.toLocaleString()}. AI neural model evaluation projects {isBullish ? 'bullish continuation' : 'downward retest'} with {asset.aiConfidence}% confidence score.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
