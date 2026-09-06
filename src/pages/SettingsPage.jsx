import { useState } from 'react';
import { User, Shield, Bell, Sparkles, Sliders, Key, Palette, CreditCard, Save, Check } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const TABS = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'ai-prefs', label: 'AI Preferences', icon: Sparkles },
    { id: 'trading', label: 'Trading Preferences', icon: Sliders },
    { id: 'apikeys', label: 'API Keys', icon: Key },
    { id: 'appearance', label: 'Appearance', icon: Palette },
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
        <h1 className="text-xl font-bold text-white tracking-tight">Platform Settings</h1>
        <p className="text-xs text-[#A1A1AA]">Manage account security, AI copilot sensitivity, and trading preferences</p>
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
                    ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-[#111113]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panel Content */}
        <div className="flex-1 bg-[#111113] border border-[#27272A] rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-white pb-2 border-b border-[#27272A]">Profile Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-[#A1A1AA] font-medium">First Name</label>
                    <input
                      type="text"
                      defaultValue="Abdul Rahman"
                      className="w-full px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-white focus:outline-none focus:border-violet-500/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#A1A1AA] font-medium">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Rasyid"
                      className="w-full px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-white focus:outline-none focus:border-violet-500/50"
                    />
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <label className="text-[#A1A1AA] font-medium">Email Address</label>
                  <input
                    type="email"
                    defaultValue="abdul.rasyid@cryptocrispy.ai"
                    className="w-full px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-white focus:outline-none focus:border-violet-500/50"
                  />
                </div>
              </div>
            )}

            {activeTab === 'ai-prefs' && (
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-white pb-2 border-b border-[#27272A]">AI Copilot Sensitivity</h2>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
                    <div>
                      <div className="font-bold text-white">Aggressive Order Block Detection</div>
                      <div className="text-[10px] text-[#71717A]">Highlight 15m lower timeframe order blocks alongside 4H</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-violet-600 rounded" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
                    <div>
                      <div className="font-bold text-white">Minimum AI Confidence Threshold</div>
                      <div className="text-[10px] text-[#71717A]">Only trigger signals with confidence &ge; 80%</div>
                    </div>
                    <select className="px-2 py-1 bg-[#09090B] border border-[#27272A] rounded text-white text-xs">
                      <option>75%</option>
                      <option selected>80%</option>
                      <option>85%</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'profile' && activeTab !== 'ai-prefs' && (
              <div className="space-y-4 text-xs text-[#A1A1AA]">
                <h2 className="text-sm font-bold text-white pb-2 border-b border-[#27272A]">
                  {TABS.find((t) => t.id === activeTab)?.label}
                </h2>
                <p>Configure preferences and parameters for {activeTab}. Saved preferences persist automatically across sessions.</p>
              </div>
            )}

            {/* Save Button */}
            <div className="pt-4 border-t border-[#27272A] flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-violet-600/20"
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
