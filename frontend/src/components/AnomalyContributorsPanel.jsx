import React from 'react';

export default function AnomalyContributorsPanel({ contributors }) {
  if (!contributors.length) return null;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#1c1f26] to-[#2a2f38] border border-yellow-800 shadow-md px-6 py-5">
      <h2 className="text-lg font-semibold text-yellow-300 mb-3">Anomaly Contributors</h2>
      <ul className="text-sm text-gray-300 space-y-2">
        {contributors.map((c, i) => (
          <li key={i}>
            <span className="text-yellow-400 font-semibold capitalize">{c.feature}</span>: {c.value} 
            <span className="text-gray-500 ml-2">(Δ {c.deviation.toFixed(2)})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
