import { useState } from 'react';
import { User, Shield, Bell, Sparkles, Sliders, Key, Palette, Save, Check, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const { theme, setTheme } = useThemeStore();

  const TABS = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'ai-prefs', label: 'AI Preferences', icon: Sparkles },
    { id: 'trading', label: 'Trading Preferences', icon: Sliders },
    { id: 'apikeys', label: 'API Keys', icon: Key },
    { id: 'appearance', label: 'Appearance & Theme', icon: Palette },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Platform Settings</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Manage account security, AI copilot sensitivity, theme preferences, and trading parameters</p>
      </div>

      {/* Tabs Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-56 shrink-0 space-y-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-50 dark:bg-[#131B26] text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panel Content */}
        <div className="flex-1 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl transition-colors">
          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">Profile Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-600 dark:text-slate-400 font-medium">First Name</label>
                    <input
                      type="text"
                      defaultValue="Abdul Rahman"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#131B26] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-600 dark:text-slate-400 font-medium">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Rasyid"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#131B26] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <label className="text-slate-600 dark:text-slate-400 font-medium">Email Address</label>
                  <input
                    type="email"
                    defaultValue="abdul.rasyid@cryptocrispy.ai"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#131B26] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">Appearance & Theme Settings</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Light Mode Option */}
                  <div
                    onClick={() => setTheme('light')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-3 ${
                      theme === 'light'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sun className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-slate-900 dark:text-white text-sm">Light Mode (Default)</span>
                      </div>
                      {theme === 'light' && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Clean white & royal blue theme designed for high readability in daylight environments.
                    </p>
                    <div className="h-12 bg-white rounded-lg border border-slate-200 p-2 flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-600" />
                      <div className="w-12 h-2 rounded bg-slate-200" />
                      <div className="w-8 h-2 rounded bg-blue-100" />
                    </div>
                  </div>

                  {/* Dark Mode Option */}
                  <div
                    onClick={() => setTheme('dark')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-3 ${
                      theme === 'dark'
                        ? 'border-blue-500 bg-slate-900 dark:bg-blue-950/40'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Moon className="w-5 h-5 text-blue-400" />
                        <span className="font-bold text-slate-900 dark:text-white text-sm">Dark Mode</span>
                      </div>
                      {theme === 'dark' && <Check className="w-4 h-4 text-blue-400" />}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Sleek black & electric blue theme optimized for night trading and institutional market view.
                    </p>
                    <div className="h-12 bg-[#070A11] rounded-lg border border-slate-800 p-2 flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500" />
                      <div className="w-12 h-2 rounded bg-slate-800" />
                      <div className="w-8 h-2 rounded bg-blue-900/40" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai-prefs' && (
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">AI Copilot Sensitivity</h2>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#131B26] border border-slate-200 dark:border-slate-800">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Aggressive Order Block Detection</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Highlight 15m lower timeframe order blocks alongside 4H</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 rounded" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#131B26] border border-slate-200 dark:border-slate-800">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Minimum AI Confidence Threshold</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Only trigger signals with confidence &ge; 80%</div>
                    </div>
                    <select className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-slate-900 dark:text-white text-xs">
                      <option>75%</option>
                      <option defaultValue>80%</option>
                      <option>85%</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'profile' && activeTab !== 'ai-prefs' && activeTab !== 'appearance' && (
              <div className="space-y-4 text-xs text-slate-500 dark:text-slate-400">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
                  {TABS.find((t) => t.id === activeTab)?.label}
                </h2>
                <p>Configure preferences and parameters for {activeTab}. Saved preferences persist automatically across sessions.</p>
              </div>
            )}

            {/* Save Button */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/20"
              >
                {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
                <span>{saved ? 'Settings Saved' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
