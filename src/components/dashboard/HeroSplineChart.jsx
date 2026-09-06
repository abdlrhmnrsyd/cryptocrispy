import { useState } from 'react';
import { useThemeStore } from '../../stores/useThemeStore';

export default function HeroSplineChart() {
  const [hoveredPoint, setHoveredPoint] = useState({ x: 540, y: 55, value: '$97,543.0' });
  const { theme } = useThemeStore();

  const svgPath = `M 0 130 
    C 120 120, 200 140, 320 100 
    C 420 70, 460 70, 540 55 
    C 620 40, 660 100, 740 95 
    C 820 90, 880 120, 1000 120`;

  const fillAreaPath = `${svgPath} L 1000 200 L 0 200 Z`;

  return (
    <div className="relative w-full h-44 overflow-hidden select-none">
      <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
        <defs>
          {/* Blue Gradient Fill */}
          <linearGradient id="heroBlueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity={theme === 'dark' ? "0.85" : "0.45"} />
            <stop offset="50%" stopColor="#1D4ED8" stopOpacity={theme === 'dark' ? "0.35" : "0.15"} />
            <stop offset="100%" stopColor={theme === 'dark' ? "#070A11" : "#FFFFFF"} stopOpacity="0.0" />
          </linearGradient>

          {/* Stroke Glow Filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Gradient Area Fill */}
        <path d={fillAreaPath} fill="url(#heroBlueGradient)" />

        {/* Blue Spline Line */}
        <path
          d={svgPath}
          fill="none"
          stroke={theme === 'dark' ? '#3B82F6' : '#2563EB'}
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Hover / Highlight Data Point */}
        <g transform={`translate(${hoveredPoint.x}, ${hoveredPoint.y})`}>
          {/* Pulse Ring */}
          <circle r="9" fill="#3B82F6" opacity="0.35" className="animate-ping" />
          {/* Inner Glowing White Node */}
          <circle r="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" />
        </g>
      </svg>

      {/* Floating Tooltip Box */}
      <div
        className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full"
        style={{ left: '54%', top: '22%' }}
      >
        <div className="bg-slate-900 dark:bg-[#131B26] border border-slate-700 dark:border-blue-500/30 rounded-lg px-2.5 py-1 shadow-2xl text-[11px] font-mono text-white flex items-center gap-1.5">
          <span className="text-[9px] text-slate-400 uppercase">OVERHEAD</span>
          <span className="font-bold text-white">{hoveredPoint.value}</span>
        </div>
      </div>
    </div>
  );
}
