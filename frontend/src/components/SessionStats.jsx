import React from 'react';
import { FaDatabase, FaBolt, FaBug, FaCheckCircle } from 'react-icons/fa';

const stats = [
  { label: 'Data Points', value: '15,247', icon: <FaDatabase /> },
  { label: 'Anomalies', value: '23', icon: <FaBug /> },
  { label: 'Uptime', value: '98.7%', icon: <FaCheckCircle /> },
  { label: 'False Positive', value: '0.15%', icon: <FaBolt /> },
];

const SessionStats = () => {
  return (
    <div className="bg-white/5 border border-emerald-500/20 rounded-xl p-4 backdrop-blur-sm">
      <h2 className="text-md font-semibold text-emerald-400 mb-2 flex items-center gap-2">
        📊 Session Stats
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/5 p-3 rounded-md text-center">
            <div className="text-xl font-bold text-emerald-300">{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1 flex justify-center items-center gap-1">
              {stat.icon} {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionStats;
