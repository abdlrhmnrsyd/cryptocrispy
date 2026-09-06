import { useState } from 'react';

export default function HeroSplineChart() {
  const [hoveredPoint, setHoveredPoint] = useState({ x: 540, y: 55, value: '$97,543.0' });

  // Smooth SVG Spline curve points
  const points = [
    { x: 0, y: 130 },
    { x: 80, y: 125 },
    { x: 160, y: 135 },
    { x: 240, y: 120 },
    { x: 320, y: 100 },
    { x: 400, y: 105 },
    { x: 480, y: 75 },
    { x: 540, y: 55, value: '$97,543.0' },
    { x: 620, y: 80 },
    { x: 700, y: 110 },
    { x: 780, y: 95 },
    { x: 860, y: 115 },
    { x: 940, y: 105 },
    { x: 1000, y: 120 },
  ];

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
          {/* Deep Electric Blue Gradient Fill matching screenshot */}
          <linearGradient id="heroBlueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#1D4ED8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0B0B0E" stopOpacity="0.0" />
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
          stroke="#3B82F6"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Hover / Highlight Data Point matching screenshot */}
        <g transform={`translate(${hoveredPoint.x}, ${hoveredPoint.y})`}>
          {/* Pulse Ring */}
          <circle r="9" fill="#3B82F6" opacity="0.35" className="animate-ping" />
          {/* Inner Glowing White Node */}
          <circle r="5" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="3" />
        </g>
      </svg>

      {/* Floating Tooltip Box matching screenshot */}
      <div
        className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full"
        style={{ left: '54%', top: '22%' }}
      >
        <div className="bg-[#181822] border border-white/10 rounded-lg px-2.5 py-1 shadow-2xl text-[11px] font-mono text-white flex items-center gap-1.5">
          <span className="text-[9px] text-[#9A9AB0] uppercase">OVERHEAD</span>
          <span className="font-bold text-white">{hoveredPoint.value}</span>
        </div>
      </div>
    </div>
  );
}
