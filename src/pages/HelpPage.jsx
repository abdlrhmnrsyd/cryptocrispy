import { useState } from 'react';
import {
  LifeBuoy,
  Search,
  BookOpen,
  Bot,
  Zap,
  Key,
  ShieldCheck,
  ChevronDown,
  MessageSquare,
  Send,
  ExternalLink,
  CheckCircle2,
  X,
  Headphones
} from 'lucide-react';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(0);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const FAQS = [
    {
      q: 'How does the CryptoCrispy AI Assistant generate trading forecasts?',
      a: 'The AI Assistant leverages fine-tuned transformer models trained on multi-timeframe order flow, liquidity cluster maps, funding rates, and on-chain whale transfers. Forecasts incorporate probabilistic confidence intervals rather than deterministic guarantees.'
    },
    {
      q: 'Are my connected exchange API keys secure?',
      a: 'All API keys are encrypted at rest using AES-256-GCM and stored in isolated hardware security modules (HSM). CryptoCrispy only requests "Read" and "Spot/Margin Trade" scopes. We never request or permit withdrawal permissions.'
    },
    {
      q: 'How does the Paper Trade Simulator work?',
      a: 'The Simulator provides a $100,000 USD virtual credit line that interacts directly with real-time level-2 orderbooks from Binance and Bybit. Slippage and simulated latency mimic real execution without financial risk.'
    },
    {
      q: 'How do I set up automated Telegram and Discord alert webhooks?',
      a: 'Navigate to Alert System, configure your desired trigger condition (e.g., Whale Spike > $5M or AI Confidence >= 85%), click "Notification Channels", and paste your Discord Webhook URL or Telegram Bot Token.'
    },
    {
      q: 'What are the rate limits for the Developer API?',
      a: 'Free Starter tiers include 10,000 calls/month (10 req/sec). Pro and Institutional tiers provide up to 500,000 calls/month (100 req/sec) with dedicated low-latency WebSocket endpoints.'
    }
  ];

  const SYSTEM_SERVICES = [
    { name: 'Core Matching Engine', status: 'Operational', uptime: '99.99%', latency: '8ms' },
    { name: 'AI Deep Inference Cluster', status: 'Operational', uptime: '99.96%', latency: '240ms' },
    { name: 'WebSocket L2 Ticker Stream', status: 'Operational', uptime: '99.98%', latency: '12ms' },
    { name: 'External Webhook Delivery', status: 'Operational', uptime: '100.0%', latency: '45ms' },
  ];

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setShowTicketModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
      {/* Header Banner with Search */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2.5">
              <LifeBuoy className="w-6 h-6" />
              Help & Documentation Center
            </h1>
            <p className="text-xs md:text-sm text-blue-100 max-w-2xl">
              Find technical guides, learn how to configure algorithmic bots, and explore developer API integrations.
            </p>
          </div>

          <button
            onClick={() => setShowTicketModal(true)}
            className="px-4 py-2 rounded-xl bg-white text-blue-700 font-semibold text-xs shadow-md hover:bg-blue-50 transition-all flex items-center gap-2 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <Headphones className="w-4 h-4" />
            <span>Contact Priority Support</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, FAQs, error codes, and tutorials..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200 text-xs focus:outline-none focus:bg-white/20 transition-all"
          />
        </div>
      </div>

      {/* 4 Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 hover:border-blue-500/40 transition-all cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-bold text-slate-900 dark:text-white">Platform Quickstart</h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Step-by-step onboarding to navigate charts, order flow, and risk settings.</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 hover:border-blue-500/40 transition-all cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-bold text-slate-900 dark:text-white">AI Bot Strategies</h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Detailed logic behind Grid, DCA, and Momentum Scalper automation bots.</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 hover:border-blue-500/40 transition-all cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Key className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-bold text-slate-900 dark:text-white">API Key Security</h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">How to generate IP-restricted API keys and establish secure webhook signatures.</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 hover:border-blue-500/40 transition-all cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-bold text-slate-900 dark:text-white">Signals & Alerts</h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Configure multi-channel push alerts for institutional orderbook sweeps.</p>
        </div>
      </div>

      {/* 2-Column: FAQs & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQs Accordion (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Common questions from professional and algorithmic traders</p>
          </div>

          <div className="space-y-2.5">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-3.5 text-left flex items-center justify-between gap-3 bg-slate-50/60 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                  >
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-3.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-[#0D1117] border-t border-slate-100 dark:border-slate-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Infrastructure Status (1 Col) */}
        <div className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                System Health & Status
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">All Systems Operational</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-3 font-mono text-xs">
            {SYSTEM_SERVICES.map((srv, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200 font-sans">
                  <span>{srv.name}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 text-[10px] uppercase font-mono">{srv.status}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Uptime: {srv.uptime}</span>
                  <span>Latency: {srv.latency}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-xs space-y-1">
            <span className="font-bold text-blue-700 dark:text-blue-300">Need immediate assistance?</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Join the official Discord channel for live dev support and quant trader community discussions.
            </p>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-1"
            >
              <span>Join CryptoCrispy Discord</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Support Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <Headphones className="w-4 h-4 text-blue-500" />
                <span>Submit Support Ticket</span>
              </div>
              <button
                onClick={() => setShowTicketModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {ticketSubmitted ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Ticket Received #CC-8429</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Our quant engineering team typically responds in under 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-400">Category</label>
                  <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white">
                    <option>AI Assistant & Forecasts</option>
                    <option>Trading Bot Execution</option>
                    <option>API Key & Webhook Delivery</option>
                    <option>Billing & Subscription</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-400">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief description of issue"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-medium text-slate-600 dark:text-slate-400">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please include details, error timestamps, or asset symbols..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Ticket to Engineers</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
