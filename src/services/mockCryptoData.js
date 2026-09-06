// Realistic mock crypto market data, institutional metrics & AI prediction generator for Lightweight Charts

export const CRYPTO_ASSETS = [
  {
    symbol: 'BTC/USDT',
    base: 'BTC',
    quote: 'USDT',
    name: 'Bitcoin',
    rank: 1,
    price: 112481.50,
    change24h: 2.84,
    high24h: 113900.00,
    low24h: 108950.00,
    volume24h: '48.2B',
    marketCap: '2.21T',
    fundingRate: '+0.0125%',
    openInterest: '$14.8B',
    longRatio: 68, // 68% Long, 32% Short
    takerBuyRatio: 56.4,
    rsi: 64.2,
    macdStatus: 'Bullish Cross',
    aiSentiment: 'Bullish',
    aiConfidence: 91,
    aiTargetPrice: 116800.00,
    aiStopLoss: 108400.00,
    aiForecastHorizon: '24H',
    liquidityScore: 'Very High',
    volatility: 'Moderate',
    support: 109200.00,
    resistance: 114800.00,
    fvgLevel: 110450.00,
    orderBlock: 108800.00,
    sparkline: [108500, 109200, 108900, 110400, 111200, 110800, 112481],
    category: 'Layer 1',
  },
  {
    symbol: 'ETH/USDT',
    base: 'ETH',
    quote: 'USDT',
    name: 'Ethereum',
    rank: 2,
    price: 4421.80,
    change24h: 1.42,
    high24h: 4490.00,
    low24h: 4320.00,
    volume24h: '24.6B',
    marketCap: '531B',
    fundingRate: '+0.0084%',
    openInterest: '$8.2B',
    longRatio: 62,
    takerBuyRatio: 52.8,
    rsi: 58.6,
    macdStatus: 'Bullish Hold',
    aiSentiment: 'Bullish',
    aiConfidence: 84,
    aiTargetPrice: 4620.00,
    aiStopLoss: 4280.00,
    aiForecastHorizon: '24H',
    liquidityScore: 'High',
    volatility: 'Low',
    support: 4310.00,
    resistance: 4550.00,
    fvgLevel: 4360.00,
    orderBlock: 4280.00,
    sparkline: [4310, 4340, 4320, 4380, 4410, 4390, 4421],
    category: 'Layer 1',
  },
  {
    symbol: 'SOL/USDT',
    base: 'SOL',
    quote: 'USDT',
    name: 'Solana',
    rank: 3,
    price: 218.45,
    change24h: -0.82,
    high24h: 226.10,
    low24h: 214.30,
    volume24h: '9.4B',
    marketCap: '102B',
    fundingRate: '-0.0042%',
    openInterest: '$2.9B',
    longRatio: 44,
    takerBuyRatio: 47.1,
    rsi: 48.2,
    macdStatus: 'Bearish Divergence',
    aiSentiment: 'Bearish',
    aiConfidence: 76,
    aiTargetPrice: 204.00,
    aiStopLoss: 228.50,
    aiForecastHorizon: '24H',
    liquidityScore: 'High',
    volatility: 'High',
    support: 210.00,
    resistance: 228.00,
    fvgLevel: 222.00,
    orderBlock: 208.00,
    sparkline: [224, 222, 226, 220, 219, 217, 218.45],
    category: 'Layer 1',
  },
  {
    symbol: 'XRP/USDT',
    base: 'XRP',
    quote: 'USDT',
    name: 'Ripple',
    rank: 4,
    price: 2.45,
    change24h: 5.12,
    high24h: 2.58,
    low24h: 2.31,
    volume24h: '6.8B',
    marketCap: '138B',
    fundingRate: '+0.0185%',
    openInterest: '$3.4B',
    longRatio: 74,
    takerBuyRatio: 61.2,
    rsi: 71.4,
    macdStatus: 'Aggressive Breakout',
    aiSentiment: 'Bullish',
    aiConfidence: 89,
    aiTargetPrice: 2.75,
    aiStopLoss: 2.28,
    aiForecastHorizon: '24H',
    liquidityScore: 'High',
    volatility: 'High',
    support: 2.30,
    resistance: 2.65,
    fvgLevel: 2.38,
    orderBlock: 2.25,
    sparkline: [2.30, 2.32, 2.36, 2.40, 2.48, 2.42, 2.45],
    category: 'Payments',
  },
  {
    symbol: 'AVAX/USDT',
    base: 'AVAX',
    quote: 'USDT',
    name: 'Avalanche',
    rank: 12,
    price: 34.12,
    change24h: 3.65,
    high24h: 35.40,
    low24h: 32.80,
    volume24h: '1.2B',
    marketCap: '14.1B',
    fundingRate: '+0.0092%',
    openInterest: '$620M',
    longRatio: 59,
    takerBuyRatio: 54.0,
    rsi: 56.8,
    macdStatus: 'Bullish Cross',
    aiSentiment: 'Bullish',
    aiConfidence: 79,
    aiTargetPrice: 37.50,
    aiStopLoss: 32.00,
    aiForecastHorizon: '24H',
    liquidityScore: 'Moderate',
    volatility: 'Moderate',
    support: 32.50,
    resistance: 36.20,
    fvgLevel: 33.20,
    orderBlock: 31.90,
    sparkline: [32.8, 33.1, 33.0, 33.7, 34.5, 33.9, 34.12],
    category: 'Layer 1',
  },
  {
    symbol: 'BNB/USDT',
    base: 'BNB',
    quote: 'USDT',
    name: 'BNB',
    rank: 5,
    price: 685.20,
    change24h: 0.95,
    high24h: 694.00,
    low24h: 678.00,
    volume24h: '2.1B',
    marketCap: '99.4B',
    fundingRate: '+0.0050%',
    openInterest: '$1.8B',
    longRatio: 51,
    takerBuyRatio: 50.4,
    rsi: 52.1,
    macdStatus: 'Neutral Compression',
    aiSentiment: 'Neutral',
    aiConfidence: 68,
    aiTargetPrice: 705.00,
    aiStopLoss: 668.00,
    aiForecastHorizon: '24H',
    liquidityScore: 'High',
    volatility: 'Low',
    support: 670.00,
    resistance: 705.00,
    fvgLevel: 680.00,
    orderBlock: 665.00,
    sparkline: [678, 681, 680, 684, 686, 683, 685.2],
    category: 'Exchange',
  }
];

export const MOCK_SIGNALS = [
  {
    id: 'sig-1',
    symbol: 'BTC/USDT',
    direction: 'LONG',
    entry: 109400.00,
    target: 116200.00,
    stopLoss: 107900.00,
    riskReward: '1:4.53',
    confidence: 91,
    status: 'ACTIVE',
    setupType: 'Liquidity Sweep + 4H FVG',
    timeAgo: '14m ago',
    details: 'BTC swept sell-side liquidity below 108.9k, printing strong bullish engulfing candle on 15m timeframe.'
  },
  {
    id: 'sig-2',
    symbol: 'XRP/USDT',
    direction: 'LONG',
    entry: 2.34,
    target: 2.68,
    stopLoss: 2.25,
    riskReward: '1:3.78',
    confidence: 89,
    status: 'ACTIVE',
    setupType: 'Breakout Continuation',
    timeAgo: '42m ago',
    details: 'Break of local structure with 3x average volume expansion and institutional order block holding.'
  },
  {
    id: 'sig-3',
    symbol: 'ETH/USDT',
    direction: 'LONG',
    entry: 4340.00,
    target: 4520.00,
    stopLoss: 4290.00,
    riskReward: '1:3.60',
    confidence: 84,
    status: 'ACTIVE',
    setupType: 'Demand Rejection',
    timeAgo: '1h 12m ago',
    details: 'Price retested 4H demand zone with bullish RSI divergence and positive delta pressure.'
  },
  {
    id: 'sig-4',
    symbol: 'SOL/USDT',
    direction: 'SHORT',
    entry: 224.00,
    target: 208.50,
    stopLoss: 229.50,
    riskReward: '1:2.82',
    confidence: 76,
    status: 'WATCHING',
    setupType: 'Supply Block Retest',
    timeAgo: '2h 45m ago',
    details: 'Heavy rejection from key 225 resistance with decreasing buy volume and bearish MACD cross.'
  }
];

export const MOCK_ALERTS = [
  {
    id: 'alt-1',
    symbol: 'BTC/USDT',
    type: 'LIQUIDITY_SWEEP',
    title: 'BTC Liquidity Sweep Detected',
    confidence: 91,
    timeAgo: '2 minutes ago',
    severity: 'HIGH',
    description: 'Sell-side liquidity cleared at $108,950 with immediate aggressive spot buying recovery.'
  },
  {
    id: 'alt-2',
    symbol: 'XRP/USDT',
    type: 'VOLUME_SPIKE',
    title: 'XRP Institutional Volume Surge (+340%)',
    confidence: 89,
    timeAgo: '18 minutes ago',
    severity: 'HIGH',
    description: '15m volume exceeded 24-hour peak with delta skew heavily skewed toward taker buys.'
  },
  {
    id: 'alt-3',
    symbol: 'ETH/USDT',
    type: 'ORDER_BLOCK',
    title: 'ETH 4H Bullish Order Block Defended',
    confidence: 84,
    timeAgo: '45 minutes ago',
    severity: 'MEDIUM',
    description: 'Institutional buying block between $4,320 - $4,350 held on 3 consecutive lower timeframe retests.'
  }
];

export const MOCK_BOTS = [
  {
    id: 'bot-1',
    name: 'CryptoCrispy AI Trend Rider',
    strategy: 'Multi-Timeframe Order Block & Momentum',
    status: 'ACTIVE',
    pairs: ['BTC/USDT', 'ETH/USDT'],
    winRate: 78.4,
    totalTrades: 312,
    pnl30d: '+24.8%',
    drawdown: '3.2%',
    allocated: '$15,000'
  },
  {
    id: 'bot-2',
    name: 'Liquidity Hunter Bot',
    strategy: 'High-Frequency Sweep & Reversal Execution',
    status: 'ACTIVE',
    pairs: ['SOL/USDT', 'XRP/USDT', 'AVAX/USDT'],
    winRate: 71.2,
    totalTrades: 580,
    pnl30d: '+18.5%',
    drawdown: '4.8%',
    allocated: '$8,500'
  },
  {
    id: 'bot-3',
    name: 'FVG Scalper AI',
    strategy: 'Fair Value Gap Inefficiency Arbitrage',
    status: 'PAUSED',
    pairs: ['NEAR/USDT', 'LINK/USDT'],
    winRate: 64.0,
    totalTrades: 194,
    pnl30d: '+9.2%',
    drawdown: '5.1%',
    allocated: '$5,000'
  }
];

export const MOCK_PORTFOLIO = {
  totalBalance: 48920.45,
  change24hAmount: +1245.80,
  change24hPercent: +2.61,
  totalPnlAmount: +12420.10,
  totalPnlPercent: +34.02,
  allocations: [
    { asset: 'BTC', name: 'Bitcoin', amount: 0.28, value: 31494.82, percent: 64.38, color: '#F7931A', avgBuy: 82400 },
    { asset: 'ETH', name: 'Ethereum', amount: 2.15, value: 9506.87, percent: 19.43, color: '#627EEA', avgBuy: 3200 },
    { asset: 'SOL', name: 'Solana', amount: 18.5, value: 4041.32, percent: 8.26, color: '#14F195', avgBuy: 185 },
    { asset: 'USDT', name: 'Tether USD', amount: 3877.44, value: 3877.44, percent: 7.93, color: '#26A17B', avgBuy: 1.00 }
  ],
  history: [
    { time: '2026-08-07', value: 36500 },
    { time: '2026-08-14', value: 38200 },
    { time: '2026-08-21', value: 41000 },
    { time: '2026-08-28', value: 44500 },
    { time: '2026-09-01', value: 46800 },
    { time: '2026-09-06', value: 48920 }
  ]
};

// Generates candlestick data + AI Prediction trajectory for Lightweight Charts
export function generateCandlestickData(basePrice, days = 60, intervalSeconds = 3600 * 4) {
  const result = [];
  const nowTime = Math.floor(Date.now() / 1000);
  let time = nowTime - days * 86400;
  let price = basePrice * 0.85;

  // Past Historical Candles
  const numPastCandles = Math.floor((days * 86400) / intervalSeconds);
  for (let i = 0; i < numPastCandles; i++) {
    const volatility = 0.012;
    const change = (Math.random() - 0.48) * volatility * price;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * volatility * price * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * price * 0.5;

    result.push({
      time: time + i * intervalSeconds,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.floor(Math.random() * 500 + 100)
    });

    price = close;
  }

  // Ensure last historical candle close matches basePrice
  if (result.length > 0) {
    const last = result[result.length - 1];
    last.close = basePrice;
    last.high = Math.max(last.high, basePrice);
    last.low = Math.min(last.low, basePrice);
  }

  // Future AI Prediction Line Data (Extending into next 15 candles)
  const lastTime = result[result.length - 1]?.time || nowTime;
  const isBullish = basePrice > 100 ? true : false;
  const predictionLine = [{ time: lastTime, value: basePrice }];
  const upperBand = [{ time: lastTime, value: basePrice }];
  const lowerBand = [{ time: lastTime, value: basePrice }];

  let predPrice = basePrice;
  for (let step = 1; step <= 18; step++) {
    const futureTime = lastTime + step * intervalSeconds;
    const drift = (isBullish ? 0.004 : -0.003) * basePrice;
    const noise = (Math.random() - 0.5) * 0.002 * basePrice;
    predPrice += drift + noise;

    const spread = (step * 0.003) * basePrice;

    predictionLine.push({ time: futureTime, value: parseFloat(predPrice.toFixed(2)) });
    upperBand.push({ time: futureTime, value: parseFloat((predPrice + spread).toFixed(2)) });
    lowerBand.push({ time: futureTime, value: parseFloat((predPrice - spread).toFixed(2)) });
  }

  return {
    candles: result,
    prediction: {
      line: predictionLine,
      upperBand,
      lowerBand,
    }
  };
}
