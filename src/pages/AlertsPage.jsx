import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Sparkles,
  ArrowUpRight,
  Plus,
  X,
  CheckCircle2,
  Trash2,
  Sliders,
  Send,
  Radio,
  Clock,
  Filter
} from 'lucide-react';
import { MOCK_ALERTS } from '../services/mockCryptoData';
import { useMarketStore } from '../stores/useMarketStore';

export default function AlertsPage() {
  const navigate = useNavigate();
  const { setActiveSymbol } = useMarketStore();
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const [activeTab, setActiveTab] = useState('STREAM'); // 'STREAM' | 'RULES'
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [alertSymbol, setAlertSymbol] = useState('BTC');
  const [alertCondition, setAlertCondition] = useState('PRICE_ABOVE');
  const [alertTarget, setAlertTarget] = useState('110000');
  const [alertChannel, setAlertChannel] = useState('TELEGRAM');
  const [toastMessage, setToastMessage] = useState(null);

  // Active custom rules configured by user
  const [customRules, setCustomRules] = useState([
    { id: 1, symbol: 'BTC', condition: 'Price crosses above', target: '$110,000', channel: 'Telegram & Browser', active: true },
    { id: 2, symbol: 'ETH', condition: 'Whale transfer over', target: '$10,000,000', channel: 'Discord Webhook', active: true },
    { id: 3, symbol: 'SOL', condition: 'AI Confidence setup >=', target: '85%', channel: 'Telegram', active: false },
  ]);

  const handleCreateAlert = (e) => {
    e.preventDefault();
    const newRule = {
      id: Date.now(),
      symbol: alertSymbol,
      condition: alertCondition === 'PRICE_ABOVE' ? 'Price crosses above' : 'Price falls below',
      target: `$${parseInt(alertTarget || 0).toLocaleString()}`,
      channel: alertChannel,
      active: true,
    };
    setCustomRules([newRule, ...customRules]);
    setShowCreateModal(false);
    setToastMessage(`Custom alert rule for ${alertSymbol} created successfully!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleRuleActive = (ruleId) => {
    setCustomRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, active: !r.active } : r))
    );
  };

  const deleteRule = (ruleId) => {
    setCustomRules((prev) => prev.filter((r) => r.id !== ruleId));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-blue-600" />
            Alert System & Real-Time Telemetry
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time automated notification engine for orderbook sweeps, liquidation cascades, and custom price triggers
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-md shadow-blue-500/25 active:scale-95 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Create Custom Alert</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('STREAM')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'STREAM'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Live AI Alert Stream ({alerts.length})
        </button>
        <button
          onClick={() => setActiveTab('RULES')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'RULES'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Configured Alert Rules ({customRules.length})
        </button>
      </div>

      {/* Tab 1: Live Alert Stream */}
      {activeTab === 'STREAM' && (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    alert.severity === 'HIGH'
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30'
                      : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{alert.title}</span>
                    <span className="text-[10px] font-mono text-slate-400">• {alert.timeAgo}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 max-w-xl leading-relaxed">{alert.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px]">
                    <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                      {alert.symbol}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">{alert.confidence}% Confidence Score</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveSymbol(alert.symbol);
                  navigate('/markets');
                }}
                className="py-2 px-3.5 rounded-xl bg-blue-50 dark:bg-blue-600/20 hover:bg-blue-100 dark:hover:bg-blue-600/30 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 shrink-0 transition-all cursor-pointer"
              >
                <span>View Analysis</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Configured Alert Rules */}
      {activeTab === 'RULES' && (
        <div className="space-y-3">
          {customRules.map((rule) => (
            <div
              key={rule.id}
              className="p-4 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold font-mono text-xs text-slate-800 dark:text-slate-200">
                  {rule.symbol}
                </span>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {rule.condition} <span className="font-mono text-blue-600 dark:text-blue-400">{rule.target}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Channels: <span className="text-slate-600 dark:text-slate-300 font-medium">{rule.channel}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleRuleActive(rule.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    rule.active
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {rule.active ? 'ACTIVE' : 'MUTED'}
                </button>
                <button
                  onClick={() => deleteRule(rule.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
                  title="Delete Alert"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Alert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <Bell className="w-4 h-4 text-blue-500" />
                <span>Create New Custom Alert</span>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAlert} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-slate-600 dark:text-slate-400">Target Asset</label>
                <select
                  value={alertSymbol}
                  onChange={(e) => setAlertSymbol(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-mono"
                >
                  <option>BTC</option>
                  <option>ETH</option>
                  <option>SOL</option>
                  <option>XRP</option>
                  <option>DOGE</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-600 dark:text-slate-400">Trigger Condition</label>
                <select
                  value={alertCondition}
                  onChange={(e) => setAlertCondition(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                >
                  <option value="PRICE_ABOVE">Price Crosses Above Target</option>
                  <option value="PRICE_BELOW">Price Falls Below Target</option>
                  <option value="WHALE_SPIKE">Institutional Whale Transfer &gt; $5M</option>
                  <option value="VOLATILITY">Sudden 15m Volatility Spike &gt; 3%</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-600 dark:text-slate-400">Target Price / Threshold ($)</label>
                <input
                  type="number"
                  required
                  value={alertTarget}
                  onChange={(e) => setAlertTarget(e.target.value)}
                  placeholder="110000"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-600 dark:text-slate-400">Notification Channel</label>
                <select
                  value={alertChannel}
                  onChange={(e) => setAlertChannel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                >
                  <option>Telegram Bot & Browser Push</option>
                  <option>Discord Webhook Channel</option>
                  <option>SMS Text Message (VIP)</option>
                  <option>In-App Silent Telemetry</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Save & Activate Trigger</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-medium shadow-2xl border border-slate-800 animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
