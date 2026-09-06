import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import TopBar from './TopBar';
import SearchCommand from './SearchCommand';
import AIAnalysisProgressModal from '../../features/ai-analysis/components/AIAnalysisProgressModal';

export default function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex flex-col font-sans antialiased">
      {/* Sidebar Navigation */}
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Layout Container */}
      <div className="lg:pl-[230px] flex-1 flex flex-col min-w-0">
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
