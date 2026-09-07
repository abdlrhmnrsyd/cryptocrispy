import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/common/AppShell';
import OverviewPage from './pages/OverviewPage';
import MarketsPage from './pages/MarketsPage';
import AIAnalystPage from './pages/AIAnalystPage';
import ScannerPage from './pages/ScannerPage';
import SignalsPage from './pages/SignalsPage';
import WatchlistPage from './pages/WatchlistPage';
import PortfolioPage from './pages/PortfolioPage';
import BotsPage from './pages/BotsPage';
import InsightsPage from './pages/InsightsPage';
import AlertsPage from './pages/AlertsPage';
import TradeSimulatorPage from './pages/TradeSimulatorPage';
import DeveloperApiPage from './pages/DeveloperApiPage';
import SubscriptionPage from './pages/SubscriptionPage';
import HelpPage from './pages/HelpPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Application Shell */}
        <Route element={<AppShell />}>
          {/* 1. Dashboard */}
          <Route path="/" element={<OverviewPage />} />
          <Route path="dashboard" element={<Navigate to="/" replace />} />
          <Route path="overview" element={<Navigate to="/" replace />} />

          {/* 2. Portfolio */}
          <Route path="portfolio" element={<PortfolioPage />} />

          {/* 3. AI Assistant */}
          <Route path="ai-assistant" element={<AIAnalystPage />} />
          <Route path="ai-analyst" element={<Navigate to="/ai-assistant" replace />} />

          {/* 4. AI Bot */}
          <Route path="ai-bot" element={<BotsPage />} />
          <Route path="bots" element={<Navigate to="/ai-bot" replace />} />

          {/* 5. Insights */}
          <Route path="insights" element={<InsightsPage />} />

          {/* 6. Alert System */}
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="alert-system" element={<Navigate to="/alerts" replace />} />

          {/* 7. Trade Simulator (Coming Soon) */}
          <Route path="trade-simulator" element={<TradeSimulatorPage />} />

          {/* 8. Developer API */}
          <Route path="developer" element={<DeveloperApiPage />} />

          {/* 9. Subscription */}
          <Route path="subscription" element={<SubscriptionPage />} />

          {/* 10. Help */}
          <Route path="help" element={<HelpPage />} />

          {/* 11. Profile */}
          <Route path="profile" element={<SettingsPage />} />
          <Route path="settings" element={<Navigate to="/profile" replace />} />

          {/* Additional quick routes & workspaces */}
          <Route path="markets" element={<MarketsPage />} />
          <Route path="scanner" element={<ScannerPage />} />
          <Route path="signals" element={<SignalsPage />} />
          <Route path="watchlist" element={<WatchlistPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
