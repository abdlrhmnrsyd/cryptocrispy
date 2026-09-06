import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AssetDonutChart() {
  const items = [
    { label: 'Subscriptions', amount: '$148.40', color: '#3B82F6' },
    { label: 'Mortgage', amount: '$824.28', color: '#A855F7' },
    { label: 'Food & dining', amount: '$614.16', color: '#F97316' },
    { label: 'Groceries', amount: '$642.48', color: '#10B981' },
  ];

  return (
    <div className="card-dark rounded-2xl p-5 space-y-4">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white tracking-tight">Monthly spending</h3>
        <button className="px-2.5 py-1 rounded-lg bg-[#181820] border border-[#22222E] text-[11px] font-semibold text-[#9A9AB0] hover:text-white flex items-center gap-1">
          <span>✦ This month</span>
          <ChevronDown className="w-3 h-3 text-[#626278]" />
        </button>
      </div>

      {/* Donut Chart & Itemized Legend Row */}
      <div className="flex items-center gap-6 pt-2">
        {/* Segmented SVG Donut matching screenshot */}
        <div className="relative w-32 h-32 shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Purple segment */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#A855F7"
              strokeWidth="16"
              strokeDasharray="60 180"
              strokeDashoffset="0"
            />
            {/* Cyan segment */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="16"
              strokeDasharray="40 200"
              strokeDashoffset="-65"
            />
            {/* Orange segment */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#F97316"
              strokeWidth="16"
              strokeDasharray="50 190"
              strokeDashoffset="-110"
            />
            {/* Green segment */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#10B981"
              strokeWidth="16"
              strokeDasharray="55 185"
              strokeDashoffset="-165"
            />
            {/* Blue segment */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="16"
              strokeDasharray="30 210"
              strokeDashoffset="-225"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 rounded-full bg-[#121218]" />
          </div>
        </div>

        {/* Legend Grid matching screenshot */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 flex-1 text-xs">
          {items.map((item) => (
            <div key={item.label} className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] text-[#9A9AB0]">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.label}</span>
              </div>
              <div className="font-bold text-white font-mono pl-3.5">{item.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
