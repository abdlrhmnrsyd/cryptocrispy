import { useState } from 'react';
import { Code2, Key, Copy, Check, Terminal } from 'lucide-react';

export default function DeveloperApiPage() {
  const [copied, setCopied] = useState(false);
  const apiKey = 'cc_live_9f82a17e04b2c918374d6190a';

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Code2 className="w-5 h-5 text-blue-500" />
          Developer API & Webhooks
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Programmatic access to CryptoCrispy AI market intelligence, signals, and orderbook streams</p>
      </div>

      {/* API Key Box */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Live Production API Key</h2>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded">
            ACTIVE • 50,000 req/mo
          </span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={apiKey}
            className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-[#131B26] border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-xs text-slate-900 dark:text-white focus:outline-none"
          />
          <button
            onClick={copyKey}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Key'}</span>
          </button>
        </div>
      </div>

      {/* cURL Example Snippet */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-500" />
            Request Example (cURL)
          </span>
          <span className="text-[10px] text-slate-400">GET /v2/ai/intelligence</span>
        </div>

        <pre className="p-4 rounded-xl bg-slate-900 dark:bg-[#070A11] border border-slate-800 font-mono text-xs text-blue-300 overflow-x-auto">
{`curl -X GET "https://api.cryptocrispy.ai/v2/ai/intelligence?symbol=BTCUSDT" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json"`}
        </pre>
      </div>

      {/* Endpoints Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Available REST & WebSocket Endpoints</h2>
        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">GET</span>
              <span className="font-mono text-slate-900 dark:text-white">/v2/ai/intelligence</span>
            </div>
            <span className="text-slate-500 dark:text-slate-400">Fetch real-time AI sentiment & order block confidence</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">GET</span>
              <span className="font-mono text-slate-900 dark:text-white">/v2/signals/active</span>
            </div>
            <span className="text-slate-500 dark:text-slate-400">Retrieve high-confluence AI long/short setups</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400">WSS</span>
              <span className="font-mono text-slate-900 dark:text-white">wss://stream.cryptocrispy.ai/v2/market-sweeps</span>
            </div>
            <span className="text-slate-500 dark:text-slate-400">Real-time liquidity sweep notification socket</span>
          </div>
        </div>
      </div>
    </div>
  );
}
