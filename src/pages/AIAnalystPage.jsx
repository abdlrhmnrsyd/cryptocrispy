import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Check, ArrowRight, CornerDownLeft } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col bg-[#111113] border border-[#27272A] rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 bg-[#09090B] border-b border-[#27272A] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              AI Trading Analyst
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                GPT-4o Market Core
              </span>
            </h1>
            <p className="text-xs text-[#71717A]">Autonomous institutional market structure & order flow analyst</p>
          </div>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="p-3 bg-[#18181B]/40 border-b border-[#27272A] flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[11px] font-semibold text-[#71717A] uppercase shrink-0">Prompts:</span>
        {SUGGESTED_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handlePromptClick(prompt)}
            className="px-3 py-1 rounded-full bg-[#18181B] hover:bg-violet-600/20 text-[#A1A1AA] hover:text-violet-300 border border-[#27272A] hover:border-violet-500/30 shrink-0 transition-colors"
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
                  ? 'bg-violet-600 text-white'
                  : 'bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`p-4 rounded-2xl border ${
                msg.sender === 'user'
                  ? 'bg-violet-600/20 border-violet-500/30 text-white'
                  : 'bg-[#18181B] border-[#27272A] text-[#FAFAFA] space-y-2'
              }`}
            >
              {msg.sentiment && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {msg.sentiment}
                  </span>
                  {msg.confidence && (
                    <span className="text-[10px] text-violet-400 font-mono">Confidence: {msg.confidence}%</span>
                  )}
                </div>
              )}

              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

              <div className="text-[10px] text-[#71717A] text-right font-mono mt-1">{msg.timestamp}</div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 bg-[#09090B] border-t border-[#27272A] flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Ask AI Analyst about ${activeSymbol} or market setups...`}
          className="flex-1 px-4 py-2.5 bg-[#111113] border border-[#27272A] rounded-xl text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-violet-500/50"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white transition-all shadow-md shadow-violet-600/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
