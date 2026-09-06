import { useEffect, useRef } from 'react';

export default function TradingViewChart({ symbol = 'BTCUSDT', timeframe = '4H' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Convert symbol format ('BTC/USDT' -> 'BINANCE:BTCUSDT')
    const formattedSymbol = symbol.includes('/')
      ? `BINANCE:${symbol.replace('/', '')}`
      : symbol.includes(':')
      ? symbol
      : `BINANCE:${symbol}`;

    // Convert timeframe to TradingView format
    let interval = '240';
    if (timeframe === '5m') interval = '5';
    if (timeframe === '15m') interval = '15';
    if (timeframe === '1H') interval = '60';
    if (timeframe === '4H') interval = '240';
    if (timeframe === '1D') interval = 'D';

    // Delay initialization slightly so browser flexbox layout finishes sizing
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = '';

      const widgetDiv = document.createElement('div');
      widgetDiv.className = 'tradingview-widget-container__widget';
      widgetDiv.style.height = '100%';
      widgetDiv.style.width = '100%';

      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;

      const widgetOptions = {
        autosize: true,
        symbol: formattedSymbol,
        interval: interval,
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        enable_publishing: false,
        allow_symbol_change: true,
        backgroundColor: '#09090B',
        gridColor: '#1F1F23',
        hide_side_toolbar: false,
        calendar: false,
        support_host: 'https://www.tradingview.com',
      };

      script.innerHTML = JSON.stringify(widgetOptions);

      containerRef.current.appendChild(widgetDiv);
      containerRef.current.appendChild(script);

      // Instant Fallback if script loading is delayed or blocked
      setTimeout(() => {
        if (containerRef.current) {
          const iframeCheck = containerRef.current.querySelector('iframe');
          if (!iframeCheck) {
            const encodedSymbol = encodeURIComponent(formattedSymbol);
            containerRef.current.innerHTML = `
              <iframe
                src="https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=en&symbol=${encodedSymbol}&interval=${interval}&theme=dark&backgroundColor=%2309090B#{"page-uri":"localhost"}"
                style="width: 100%; height: 100%; border: none;"
                title="TradingView Chart"
              ></iframe>
            `;
          }
        }
      }, 800);
    }, 50);

    return () => clearTimeout(timer);
  }, [symbol, timeframe]);

  return (
    <div className="w-full h-[520px] bg-[#09090B] rounded-xl overflow-hidden border border-[#27272A] relative">
      <div
        ref={containerRef}
        className="tradingview-widget-container w-full h-[520px]"
        style={{ height: '520px', width: '100%' }}
      />
    </div>
  );
}
