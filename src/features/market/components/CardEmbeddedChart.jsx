import { useEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries, HistogramSeries, LineSeries } from 'lightweight-charts';
import { generateCandlestickData } from '../../../services/mockCryptoData';

export default function CardEmbeddedChart({ asset, timeframe = '4H', showPrediction = true, showOverlays = true }) {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [renderError, setRenderError] = useState(false);
  const [chartData, setChartData] = useState({ candles: [], prediction: null });

  useEffect(() => {
    if (!asset || !asset.price) return;

    const interval = timeframe === '5m' ? 300 : timeframe === '15m' ? 900 : timeframe === '1H' ? 3600 : 14400;
    const generated = generateCandlestickData(asset.price, 45, interval);
    setChartData(generated);

    if (!chartContainerRef.current) return;
    const container = chartContainerRef.current;
    container.innerHTML = '';

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 230;

    let chart;
    try {
      // Lightweight Charts v5 Instance Creation
      chart = createChart(container, {
        width,
        height,
        layout: {
          background: { color: '#09090B' },
          textColor: '#71717A',
          fontFamily: "'Inter', sans-serif",
        },
        grid: {
          vertLines: { color: '#16161A' },
          horzLines: { color: '#16161A' },
        },
        crosshair: {
          mode: 1,
          vertLine: { color: '#8B5CF6', width: 1, style: 3 },
          horzLine: { color: '#8B5CF6', width: 1, style: 3 },
        },
        rightPriceScale: {
          borderColor: '#27272A',
          textColor: '#A1A1AA',
          scaleMargins: { top: 0.1, bottom: 0.2 },
        },
        timeScale: {
          borderColor: '#27272A',
          timeVisible: true,
          secondsVisible: false,
        },
        handleScroll: true,
        handleScale: true,
      });

      chartInstanceRef.current = chart;

      // 1. Candlestick Series (v5 API: chart.addSeries(CandlestickSeries))
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

      // 2. Volume Series (v5 API: chart.addSeries(HistogramSeries))
      const volumeSeries = chart.addSeries
        ? chart.addSeries(HistogramSeries, {
            color: '#27272A',
            priceFormat: { type: 'volume' },
            priceScaleId: 'volume',
          })
        : chart.addHistogramSeries({
            color: '#27272A',
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
          color: item.close >= item.open ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)',
        }));
        volumeSeries.setData(volumeData);
      }

      // 3. AI Prediction Path (v5 API: chart.addSeries(LineSeries))
      if (showPrediction && generated.prediction?.line && generated.prediction.line.length > 0) {
        const predictionSeries = chart.addSeries
          ? chart.addSeries(LineSeries, {
              color: '#8B5CF6',
              lineWidth: 2,
              lineStyle: 2,
              title: 'AI Forecast Path',
            })
          : chart.addLineSeries({
              color: '#8B5CF6',
              lineWidth: 2,
              lineStyle: 2,
              title: 'AI Forecast Path',
            });

        predictionSeries.setData(generated.prediction.line);
      }

      // 4. Overlays: Target TP & SL
      if (showOverlays) {
        if (asset.aiTargetPrice) {
          candleSeries.createPriceLine({
            price: asset.aiTargetPrice,
            color: '#10B981',
            lineWidth: 1,
            lineStyle: 2,
            axisLabelVisible: true,
            title: `AI TP ($${asset.aiTargetPrice.toLocaleString()})`,
          });
        }
        if (asset.aiStopLoss) {
          candleSeries.createPriceLine({
            price: asset.aiStopLoss,
            color: '#EF4444',
            lineWidth: 1,
            lineStyle: 2,
            axisLabelVisible: true,
            title: `AI SL ($${asset.aiStopLoss.toLocaleString()})`,
          });
        }
      }

      chart.timeScale().fitContent();
      setRenderError(false);
    } catch (err) {
      console.warn('CardEmbeddedChart error, using SVG fallback renderer:', err);
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
  }, [asset, timeframe, showPrediction, showOverlays]);

  // High-precision SVG Candlestick Fallback Component if Canvas fails
  if (renderError || !chartData.candles || chartData.candles.length === 0) {
    const candles = chartData.candles.slice(-25);
    const prices = candles.flatMap((c) => [c.high, c.low]);
    const minPrice = Math.min(...prices) || asset.price * 0.95;
    const maxPrice = Math.max(...prices) || asset.price * 1.05;
    const range = maxPrice - minPrice || 1;

    return (
      <div className="w-full h-[230px] bg-[#09090B] rounded-lg overflow-hidden border border-[#27272A]/70 p-2 flex flex-col justify-between relative">
        <div className="relative w-full h-[210px]">
          <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="50" x2="400" y2="50" stroke="#16161A" strokeWidth="1" />
            <line x1="0" y1="100" x2="400" y2="100" stroke="#16161A" strokeWidth="1" />
            <line x1="0" y1="150" x2="400" y2="150" stroke="#16161A" strokeWidth="1" />

            {/* Candlesticks */}
            {candles.map((c, i) => {
              const x = (i / candles.length) * 380 + 10;
              const isUp = c.close >= c.open;
              const yHigh = 180 - ((c.high - minPrice) / range) * 160;
              const yLow = 180 - ((c.low - minPrice) / range) * 160;
              const yOpen = 180 - ((c.open - minPrice) / range) * 160;
              const yClose = 180 - ((c.close - minPrice) / range) * 160;

              const yTop = Math.min(yOpen, yClose);
              const height = Math.max(Math.abs(yClose - yOpen), 2);
              const color = isUp ? '#10B981' : '#EF4444';

              return (
                <g key={i}>
                  <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={color} strokeWidth="1.5" />
                  <rect x={x - 4} y={yTop} width="8" height={height} fill={color} rx="1" />
                </g>
              );
            })}

            {/* AI Projected Path */}
            {showPrediction && (
              <path
                d="M 300 100 Q 340 70, 390 50"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2.5"
                strokeDasharray="4"
              />
            )}
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-[230px] bg-[#09090B] rounded-lg overflow-hidden border border-[#27272A]/70 relative"
      style={{ height: '230px' }}
    >
      <div ref={chartContainerRef} className="w-full h-[230px]" style={{ height: '230px' }} />
    </div>
  );
}
