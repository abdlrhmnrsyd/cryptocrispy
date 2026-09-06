import { useState } from 'react';
import { Code2, Key, Copy, Check, Terminal, ShieldCheck, ExternalLink } from 'lucide-react';

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
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Code2 className="w-5 h-5 text-violet-400" />
          Developer API & Webhooks
        </h1>
        <p className="text-xs text-[#A1A1AA]">Programmatic access to CryptoCrispy AI market intelligence, signals, and orderbook streams</p>
      </div>

      {/* API Key Box */}
      <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272A] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-violet-400" />
            <h2 className="text-sm font-bold text-white">Live Production API Key</h2>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            ACTIVE • 50,000 req/mo
          </span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={apiKey}
            className="flex-1 px-3.5 py-2 bg-[#18181B] border border-[#27272A] rounded-xl font-mono text-xs text-white focus:outline-none"
          />
          <button
            onClick={copyKey}
            className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Key'}</span>
          </button>
        </div>
      </div>

      {/* cURL Example Snippet */}
      <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272A] space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-violet-400" />
            Request Example (cURL)
          </span>
          <span className="text-[10px] text-[#71717A]">GET /v2/ai/intelligence</span>
        </div>

        <pre className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] font-mono text-xs text-violet-300 overflow-x-auto">
{`curl -X GET "https://api.cryptocrispy.ai/v2/ai/intelligence?symbol=BTCUSDT" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json"`}
        </pre>
      </div>

      {/* Endpoints Table */}
      <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272A] space-y-3">
        <h2 className="text-sm font-bold text-white">Available REST & WebSocket Endpoints</h2>
        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400">GET</span>
              <span className="font-mono text-white">/v2/ai/intelligence</span>
            </div>
            <span className="text-[#71717A]">Fetch real-time AI sentiment & order block confidence</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400">GET</span>
              <span className="font-mono text-white">/v2/signals/active</span>
            </div>
            <span className="text-[#71717A]">Retrieve high-confluence AI long/short setups</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-violet-500/10 text-violet-300">WSS</span>
              <span className="font-mono text-white">wss://stream.cryptocrispy.ai/v2/market-sweeps</span>
            </div>
            <span className="text-[#71717A]">Real-time liquidity sweep notification socket</span>
          </div>
        </div>
      </div>
    </div>
  );
}
