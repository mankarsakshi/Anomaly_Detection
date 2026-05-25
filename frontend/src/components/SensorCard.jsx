import React from 'react'
import { useEffect, useState } from 'react'
import { LineChart, Line, ResponsiveContainer  } from 'recharts'

const SensorCard = ({ title, value, icon, color = 'text-white', unit = '' }) => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (title === 'Vibration') {
      setHistory(prev => [...prev.slice(-19), { value: Number(value) || 0 }])
    }
  }, [value])
  return (
    <div className="relative group rounded-2xl px-6 py-8 bg-gradient-to-br from-[#1e2129] to-[#13161c] shadow-md border border-neutral-800 hover:shadow-lg transition-all duration-300">
      
      {/* Glow background */}
      <div className={`absolute inset-0 rounded-2xl opacity-10 blur-xl ${color}`} />

      {/* Top-right icon */}
      <div className="absolute top-4 right-4 text-3xl opacity-90 group-hover:scale-110 transition-transform z-10">
        <span className={`${color}`}>{icon}</span>
      </div>

      {/* Content */}
      <p className="text-sm text-neutral-400 z-10 relative">{title}</p>

      {/* Sensor value with conditional animations */}
      {title === 'Vibration' ? (
  <div className="z-10 relative">
    <p className="text-4xl font-extrabold tracking-tight text-white animate-heartbeat">
      {value} <span className="text-sm font-medium text-gray-400">{unit}</span>
    </p>
    <div className="mt-4 w-full h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={history} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ec4899"
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
) : (
  <p className="text-4xl font-extrabold tracking-tight text-white z-10 relative">
    {value} <span className="text-sm font-medium text-gray-400">{unit}</span>
  </p>
)}


      {/* Flow line animation (only for Flow Rate) */}
      {title === 'Flow Rate' && (
        <div className="relative mt-3 h-2 w-full rounded-full overflow-hidden bg-gray-700/30">
          <div className="absolute inset-0 animate-flow bg-gradient-to-r from-indigo-400 via-indigo-200 to-indigo-500 opacity-80" />
        </div>
      )}
    </div>
  )
}

export default SensorCard
