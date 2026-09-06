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
import AlertsPage from './pages/AlertsPage';
import DeveloperApiPage from './pages/DeveloperApiPage';
import SubscriptionPage from './pages/SubscriptionPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<OverviewPage />} />
          <Route path="markets" element={<MarketsPage />} />
          <Route path="ai-analyst" element={<AIAnalystPage />} />
          <Route path="scanner" element={<ScannerPage />} />
          <Route path="signals" element={<SignalsPage />} />
          <Route path="watchlist" element={<WatchlistPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="bots" element={<BotsPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="developer" element={<DeveloperApiPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
