import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User } from 'lucide-react';
import { useAIStore } from '../stores/useAIStore';
import { useMarketStore } from '../stores/useMarketStore';

export default function AIAnalystPage() {
  const { chatMessages, sendChatMessage } = useAIStore();
  const { activeSymbol } = useMarketStore();
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  const SUGGESTED_PROMPTS = [
    'Analyze BTC structure for next 4H',
    'Find high-confidence bullish setups',
    'Scan market for liquidity sweeps',
    'Explain key support & resistance for ETH',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText, activeSymbol);
    setInputText('');
  };

  const handlePromptClick = (prompt) => {
    sendChatMessage(prompt, activeSymbol);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-2xl transition-colors">
      {/* Header */}
      <div className="p-4 bg-slate-50 dark:bg-[#070A11] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              AI Trading Analyst
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                GPT-4o Market Core
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Autonomous institutional market structure & order flow analyst</p>
          </div>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="p-3 bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase shrink-0">Prompts:</span>
        {SUGGESTED_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handlePromptClick(prompt)}
            className="px-3 py-1 rounded-full bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-600/20 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 shrink-0 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Conversation Thread */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 text-xs">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-2xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`p-4 rounded-2xl border ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-50 dark:bg-[#131B26] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 space-y-2'
              }`}
            >
              {msg.sentiment && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {msg.sentiment}
                  </span>
                  {msg.confidence && (
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">Confidence: {msg.confidence}%</span>
                  )}
                </div>
              )}

              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

              <div className={`text-[10px] text-right font-mono mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 bg-slate-50 dark:bg-[#070A11] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Ask AI Analyst about ${activeSymbol} or market setups...`}
          className="flex-1 px-4 py-2.5 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition-all shadow-md shadow-blue-600/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
