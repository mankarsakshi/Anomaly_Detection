import React, { useEffect, useState } from 'react';

export default function AnomalyLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Pull logs from localStorage 
    const stored = JSON.parse(localStorage.getItem('anomalyLogs') || '[]');
    setLogs(stored.reverse()); // newest first
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0c10] to-[#1a1d22] text-white p-8 ml-64">
      <h1 className="text-2xl font-bold mb-6">Anomaly Logs</h1>

      {logs.length === 0 ? (
        <p className="text-gray-400">No anomalies logged yet.</p>
      ) : (
        <div className="space-y-4">
          {logs.map((log, i) => (
            <div key={i} className="border border-red-800 bg-red-950/10 rounded-lg p-4">
              <p className="text-sm text-gray-400">{log.time}</p>
              <p className="text-lg font-semibold text-red-400">Score: {log.score.toFixed(3)}</p>
              <p className="text-sm mt-1">
                <strong>Pressure:</strong> {log.input.pressure} PSI, 
                <strong> Flow Rate:</strong> {log.input.flow_rate} m³/h, 
                <strong> Temp:</strong> {log.input.temperature}°C, 
                <strong> Vib:</strong> {log.input.vibration}
              </p>
              {log.contributors?.length > 0 && (
                <div className="mt-2 text-yellow-300 text-sm">
                  <strong>Contributors:</strong>{' '}
                  {log.contributors.map(c => c.feature).join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
