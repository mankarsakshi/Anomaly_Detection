import React from 'react'
import { FaRobot } from 'react-icons/fa'

const AIDetectionPanel = ({ anomalyResult }) => {
  const isAnomaly = anomalyResult;
  

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#111319] to-[#1e2229] border border-blue-800 shadow-md px-6 py-5">
      {/* Header with icon and version */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <FaRobot className="text-blue-400 text-xl" />
          <h2 className="text-lg font-semibold text-blue-300">AI Detection Engine</h2>
        </div>
        <span className="text-xs bg-blue-900/40 text-blue-300 px-2 py-1 rounded-full">
          Isolation Forest v2.1
        </span>
      </div>

      {/* Anomaly status */}
      <div className="flex items-center gap-2 mb-2">
        <span className={`h-2 w-2 rounded-full ${isAnomaly ? 'bg-red-500 animate-ping' : 'bg-green-400'}`} />
        <p className={`text-sm ${isAnomaly ? 'text-red-400' : 'text-green-400'}`}>
          {isAnomaly ? 'Anomaly Detected' : 'Normal Operation'}
        </p>
      </div>

      {/* Status bar */}
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mt-2">
        <div
          className={`absolute top-0 left-0 h-full ${isAnomaly ? 'bg-red-500' : 'bg-green-400'} animate-pulse`}
          style={{ width: isAnomaly ? '100%' : '85%' }}
        />
      </div>

      {/* Bottom note */}
      <p className="text-[0.65rem] text-gray-500 text-center mt-2 tracking-widest">LIVE MONITORING</p>
    </div>
  )
}

export default AIDetectionPanel
