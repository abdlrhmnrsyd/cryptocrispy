import { useEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries, HistogramSeries, LineSeries } from 'lightweight-charts';
import { generateCandlestickData } from '../../../services/mockCryptoData';
import { useThemeStore } from '../../../stores/useThemeStore';

export default function MarketChart({ asset, timeframe = '4H', overlays = {} }) {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [renderError, setRenderError] = useState(false);
  const [chartData, setChartData] = useState({ candles: [], prediction: null });
  const { theme } = useThemeStore();

  useEffect(() => {
    if (!asset || !asset.price) return;

    const interval = timeframe === '5m' ? 300 : timeframe === '15m' ? 900 : timeframe === '1H' ? 3600 : 14400;
    const generated = generateCandlestickData(asset.price, 60, interval);
    setChartData(generated);

    if (!chartContainerRef.current) return;
    const container = chartContainerRef.current;
    container.innerHTML = ''; // Clean previous DOM

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 520;

    const isDark = theme === 'dark';
    const bgColor = isDark ? '#0D1117' : '#FFFFFF';
    const textColor = isDark ? '#94A3B8' : '#475569';
    const gridColor = isDark ? '#1E293B' : '#F1F5F9';
    const borderColor = isDark ? '#1E293B' : '#E2E8F0';
    const accentBlue = isDark ? '#3B82F6' : '#2563EB';

    let chart;
    try {
      // Lightweight Charts v5 Instance Creation
      chart = createChart(container, {
        width,
        height,
        layout: {
          background: { color: bgColor },
          textColor: textColor,
          fontFamily: "'Inter', sans-serif",
        },
        grid: {
          vertLines: { color: gridColor },
          horzLines: { color: gridColor },
        },
        crosshair: {
          mode: 1,
          vertLine: { color: accentBlue, width: 1, style: 3 },
          horzLine: { color: accentBlue, width: 1, style: 3 },
        },
        rightPriceScale: {
          borderColor: borderColor,
          textColor: textColor,
        },
        timeScale: {
          borderColor: borderColor,
          timeVisible: true,
          secondsVisible: false,
        },
        handleScroll: true,
        handleScale: true,
      });

      chartInstanceRef.current = chart;

      // 1. Candlestick Series
      const candleSeries = chart.addSeries
        ? chart.addSeries(CandlestickSeries, {
            upColor: '#10B981',
            downColor: '#EF4444',
            borderVisible: false,
            wickUpColor: '#10B981',
            wickDownColor: '#EF4444',
          })
        : chart.addCandlestickSeries({
            upColor: '#10B981',
            downColor: '#EF4444',
            borderVisible: false,
            wickUpColor: '#10B981',
            wickDownColor: '#EF4444',
          });

      // 2. Volume Series
      const volumeSeries = chart.addSeries
        ? chart.addSeries(HistogramSeries, {
            color: borderColor,
            priceFormat: { type: 'volume' },
            priceScaleId: 'volume',
          })
        : chart.addHistogramSeries({
            color: borderColor,
            priceFormat: { type: 'volume' },
            priceScaleId: 'volume',
          });

      if (chart.priceScale) {
        chart.priceScale('volume').applyOptions({
          scaleMargins: { top: 0.8, bottom: 0 },
        });
      }

      if (generated.candles && generated.candles.length > 0) {
        candleSeries.setData(generated.candles);

        const volumeData = generated.candles.map((item) => ({
          time: item.time,
          value: item.volume || 100,
          color: item.close >= item.open ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
        }));
        volumeSeries.setData(volumeData);
      }

      // 3. AI Prediction Path
      if (generated.prediction?.line && generated.prediction.line.length > 0) {
        const predictionSeries = chart.addSeries
          ? chart.addSeries(LineSeries, {
              color: accentBlue,
              lineWidth: 2.5,
              lineStyle: 2,
              title: 'AI Forecast Path',
            })
          : chart.addLineSeries({
              color: accentBlue,
              lineWidth: 2.5,
              lineStyle: 2,
              title: 'AI Forecast Path',
            });

        predictionSeries.setData(generated.prediction.line);
      }

      // 4. Overlays: Support, Resistance, FVG, Order Block
      if (overlays.supportResistance) {
        if (asset.support) {
          candleSeries.createPriceLine({
            price: asset.support,
            color: '#10B981',
            lineWidth: 1,
            lineStyle: 2,
            axisLabelVisible: true,
            title: `AI Support ($${asset.support.toLocaleString()})`,
          });
        }
        if (asset.resistance) {
          candleSeries.createPriceLine({
            price: asset.resistance,
            color: '#EF4444',
            lineWidth: 1,
            lineStyle: 2,
            axisLabelVisible: true,
            title: `AI Resistance ($${asset.resistance.toLocaleString()})`,
          });
        }
      }

      chart.timeScale().fitContent();
      setRenderError(false);
    } catch (err) {
      console.warn('Lightweight Charts canvas error, using high-precision SVG fallback renderer:', err);
      setRenderError(true);
    }

    const handleResize = () => {
      if (chartContainerRef.current && chartInstanceRef.current) {
        try {
          chartInstanceRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
          });
        } catch (e) {}
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.remove();
        } catch (e) {}
        chartInstanceRef.current = null;
      }
    };
  }, [asset, timeframe, overlays, theme]);

  // High-precision SVG Candlestick Fallback Component if Canvas fails
  if (renderError || !chartData.candles || chartData.candles.length === 0) {
    const candles = chartData.candles.slice(-40);
    const prices = candles.flatMap((c) => [c.high, c.low]);
    const minPrice = Math.min(...prices) || asset.price * 0.95;
    const maxPrice = Math.max(...prices) || asset.price * 1.05;
    const range = maxPrice - minPrice || 1;

    return (
      <div className="w-full h-[520px] bg-white dark:bg-[#0D1117] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between relative">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2 font-mono">
          <span>{asset.symbol} • {timeframe} SVG Chart</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">${asset.price.toLocaleString()}</span>
        </div>

        {/* SVG Candlesticks Render */}
        <div className="relative w-full h-[430px]">
          <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="100" x2="800" y2="100" stroke={theme === 'dark' ? '#1E293B' : '#F1F5F9'} strokeWidth="1" />
            <line x1="0" y1="200" x2="800" y2="200" stroke={theme === 'dark' ? '#1E293B' : '#F1F5F9'} strokeWidth="1" />
            <line x1="0" y1="300" x2="800" y2="300" stroke={theme === 'dark' ? '#1E293B' : '#F1F5F9'} strokeWidth="1" />

            {/* Support / Resistance Lines */}
            {overlays.supportResistance && (
              <>
                <line x1="0" y1="330" x2="800" y2="330" stroke="#10B981" strokeDasharray="4" strokeWidth="1.5" />
                <text x="700" y="325" fill="#10B981" fontSize="10" fontFamily="mono">Support</text>
                <line x1="0" y1="70" x2="800" y2="70" stroke="#EF4444" strokeDasharray="4" strokeWidth="1.5" />
                <text x="700" y="65" fill="#EF4444" fontSize="10" fontFamily="mono">Resistance</text>
              </>
            )}

            {/* Render Candlesticks */}
            {candles.map((c, i) => {
              const x = (i / candles.length) * 760 + 20;
              const isUp = c.close >= c.open;
              const yHigh = 360 - ((c.high - minPrice) / range) * 320;
              const yLow = 360 - ((c.low - minPrice) / range) * 320;
              const yOpen = 360 - ((c.open - minPrice) / range) * 320;
              const yClose = 360 - ((c.close - minPrice) / range) * 320;

              const yTop = Math.min(yOpen, yClose);
              const height = Math.max(Math.abs(yClose - yOpen), 3);
              const color = isUp ? '#10B981' : '#EF4444';

              return (
                <g key={i}>
                  {/* Wick */}
                  <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={color} strokeWidth="1.5" />
                  {/* Body */}
                  <rect x={x - 6} y={yTop} width="12" height={height} fill={color} rx="1" />
                </g>
              );
            })}

            {/* Projected AI Line */}
            <path
              d="M 600 210 Q 680 160, 780 120"
              fill="none"
              stroke={theme === 'dark' ? '#3B82F6' : '#2563EB'}
              strokeWidth="3"
              strokeDasharray="5"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-[520px] bg-white dark:bg-[#0D1117] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative transition-colors"
      style={{ height: '520px' }}
    >
      <div ref={chartContainerRef} className="w-full h-[520px]" style={{ height: '520px' }} />
    </div>
  );
}
