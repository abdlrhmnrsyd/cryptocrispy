import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import TopBar from './TopBar';
import SearchCommand from './SearchCommand';
import AIAnalysisProgressModal from '../../features/ai-analysis/components/AIAnalysisProgressModal';
import { useThemeStore } from '../../stores/useThemeStore';

export default function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070A11] text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased transition-colors duration-200">
      {/* Sidebar Navigation */}
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Layout Container */}
      <div className="lg:pl-[220px] flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <TopBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content Outlet */}
        <main className="flex-1 p-4 md:p-6 min-w-0 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Modals & Overlays */}
      <SearchCommand />
      <AIAnalysisProgressModal />
    </div>
  );
}
