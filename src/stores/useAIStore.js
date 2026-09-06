import { create } from 'zustand';
import { ANALYSIS_STEPS, generateAIReport, queryAIAssistant } from '../services/aiEngine';

export const useAIStore = create((set, get) => ({
  isAnalyzing: false,
  analysisStepIndex: 0,
  analysisReport: null,
  isAnalysisModalOpen: false,
  chatMessages: [
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Hello! I am your AI Market Intelligence Analyst. Ask me anything about current crypto market structures, liquidity sweeps, or volume profiles.`,
      confidence: 95,
      sentiment: 'BULLISH',
      timestamp: 'Just now',
    },
  ],

  openAnalysisModal: (asset) => {
    set({ isAnalyzing: true, analysisStepIndex: 0, isAnalysisModalOpen: true, analysisReport: null });
    
    // Simulate step progress
    const interval = setInterval(() => {
      const nextIdx = get().analysisStepIndex + 1;
      if (nextIdx < ANALYSIS_STEPS.length) {
        set({ analysisStepIndex: nextIdx });
      } else {
        clearInterval(interval);
        const report = generateAIReport(asset);
        set({ isAnalyzing: false, analysisReport: report });
      }
    }, 450);
  },

  closeAnalysisModal: () => set({ isAnalysisModalOpen: false }),

  sendChatMessage: (userText, activeSymbol = 'BTC/USDT') => {
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    set((state) => ({ chatMessages: [...state.chatMessages, userMsg] }));

    setTimeout(() => {
      const aiReply = queryAIAssistant(userText, activeSymbol);
      set((state) => ({
        chatMessages: [...state.chatMessages, { ...aiReply, id: `ai-${Date.now()}` }],
      }));
    }, 600);
  },
}));
