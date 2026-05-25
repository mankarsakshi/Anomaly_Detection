import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdWarning } from 'react-icons/md';

const AlertPanel = ({ alerts = [], layout = 'horizontal' }) => {
  const navigate = useNavigate();
  const latestThree = alerts.slice(0, 3);
  const isVertical = layout === 'vertical';

  return (
    <div className="rounded-xl bg-red-900/10 border border-red-500/20 p-4 backdrop-blur-sm shadow-sm h-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-red-400">🚨 Live Alerts</h2>
        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {latestThree.length}
        </span>
      </div>

      {/* Layout Toggle */}
      <div className={`${isVertical ? 'space-y-3' : 'flex overflow-x-auto gap-3 pb-2'}`}>
        {latestThree.map((alert) => (
          <div
            key={alert.id}
            className={`${
              isVertical ? '' : 'min-w-[280px]'
            } bg-red-800/20 rounded-xl p-4 shadow-md backdrop-blur-sm`}
          >
            <div className="text-red-400 text-xl mb-1">
              <MdWarning />
            </div>
            <div className="text-sm text-white">
              <p className="font-semibold text-red-300">{alert.type}</p>
              <p className="text-xs text-gray-300 mt-1">{alert.message}</p>
              <p className="text-[0.65rem] text-gray-500 mt-1">
                {new Date(alert.id).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/anomaly-logs')}
        className="mt-4 w-full text-sm text-white bg-red-600 hover:bg-red-500 rounded-md py-2 transition"
      >
        View Logs
      </button>
    </div>
  );
};

export default AlertPanel;
