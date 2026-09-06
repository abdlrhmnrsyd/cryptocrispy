import { Sparkles, Check, Loader2, ArrowUpRight, X } from 'lucide-react';
import { useAIStore } from '../../../stores/useAIStore';
import { ANALYSIS_STEPS } from '../../../services/aiEngine';
import { useNavigate } from 'react-router-dom';
import { useMarketStore } from '../../../stores/useMarketStore';

export default function AIAnalysisProgressModal() {
  const navigate = useNavigate();
  const { isAnalysisModalOpen, closeAnalysisModal, isAnalyzing, analysisStepIndex, analysisReport } = useAIStore();
  const { setActiveSymbol } = useMarketStore();

  if (!isAnalysisModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-[#0D1117] border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-blue-50 dark:bg-gradient-to-r dark:from-blue-950/40 dark:via-[#0D1117] dark:to-[#0D1117] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">AI Copilot Analysis</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                ✦ Analyzing {analysisReport ? analysisReport.symbol : 'Crypto Asset'}
              </div>
            </div>
          </div>
          <button onClick={closeAnalysisModal} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5">
          {isAnalyzing ? (
            /* Step-by-Step Generator Process */
            <div className="space-y-3">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-4 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                <span>Running deep neural network evaluation on orderbook and price action...</span>
              </div>

              {ANALYSIS_STEPS.map((step, idx) => {
                const isDone = idx < analysisStepIndex;
                const isCurrent = idx === analysisStepIndex;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
                      isDone
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                        : isCurrent
                        ? 'bg-blue-500/10 border-blue-500/40 text-blue-600 dark:text-blue-300 font-medium'
                        : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">
                      {isDone ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : isCurrent ? (
                        <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                      )}
                    </div>
                    <span className="text-xs font-mono">{step.label}</span>
                  </div>
                );
              })}
            </div>
          ) : analysisReport ? (
            /* AI Analysis Result Panel */
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Header Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#131B26] border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500">Market Sentiment</div>
                  <div className={`text-base font-bold mt-0.5 ${analysisReport.sentiment === 'BULLISH' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {analysisReport.sentiment}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#131B26] border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500">AI Confidence</div>
                  <div className="text-base font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                    {analysisReport.confidence}%
                  </div>
                </div>
              </div>

              {/* AI Summary */}
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                {analysisReport.summary}
              </div>

              {/* Key Observations */}
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white mb-2">Key Confluence Observations</div>
                <div className="space-y-1.5 text-xs">
                  {analysisReport.keyObservations.map((obs, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{obs.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Levels */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#131B26] border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-semibold text-slate-900 dark:text-white mb-2">Key Technical Levels</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Support:</span> <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">{analysisReport.keyLevels.support}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Resistance:</span> <span className="font-mono text-red-600 dark:text-red-400 font-medium">{analysisReport.keyLevels.resistance}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>FVG Zone:</span> <span className="font-mono text-blue-600 dark:text-blue-400 font-medium">{analysisReport.keyLevels.fvg}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Order Block:</span> <span className="font-mono text-cyan-600 dark:text-cyan-400 font-medium">{analysisReport.keyLevels.orderBlock}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    closeAnalysisModal();
                    setActiveSymbol(analysisReport.symbol);
                    navigate('/markets');
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/30"
                >
                  <span>Open in Trading Terminal</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
