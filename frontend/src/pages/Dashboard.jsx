import React from 'react';

import SensorCard from '../components/SensorCard';
import useLivePrediction from '../hooks/useLivePrediction'; 
import LiveAlerts from '../components/LiveAlerts';
import { MdSpeed } from 'react-icons/md'
import { TbDropletFilled } from 'react-icons/tb'
import { LuThermometer, LuActivity } from 'react-icons/lu'
import AIDetectionPanel from '../components/AIDetectionPanel';
import SensorLineChart from '../components/SensorLineChart';
import AnomalyContributorsPanel from '../components/AnomalyContributorsPanel';


const Dashboard = () => {
  const { data, alerts, anomalyResult, chartData, contributors, loading } = useLivePrediction();
  if (loading || !data) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0c10] to-[#1a1d22] text-white">
      <div className="text-center space-y-4 animate-pulse">
        <h1 className="text-2xl font-bold text-cyan-400 tracking-wide">Anomaly Detection</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-cyan-400 mx-auto mb-4" />
        <p className="text-sm text-gray-400 tracking-wider">
         Loading Dashboard
        </p>
      </div>
    </div>
  );
}
  return (
    <div className="flex">
      
      <main className="ml-64 p-8 w-full min-h-screen bg-gradient-to-br from-[#0a0c10] to-[#1a1d22] text-white overflow-y-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Real-Time Dashboard</h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8 items-start">
        {/* Real-time metrics section (2/3 of the width) */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <SensorCard title="Pressure" value={data?.pressure?.toFixed(2)} icon={<MdSpeed />} color="text-cyan-400" unit="PSI" />
          <SensorCard title="Flow Rate" value={data?.flow_rate?.toFixed(2)} icon={<TbDropletFilled />} color="text-indigo-400" unit="m³/h" />
          <SensorCard title="Temperature" value={data?.temperature?.toFixed(2)} icon={<LuThermometer />} color="text-red-400" unit="°C" />
          <SensorCard title="Vibration" value={data?.vibration?.toFixed(4)} icon={<LuActivity />} color="text-pink-400" unit="" />
        </div>

        {/* Live Alerts panel (1/3 of the width) */}
        <div className="bg-red-950/10 border border-red-800 p-4 rounded-xl overflow-y-auto max-h-[500px] min-h-[300px] custom-scroll">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-red-300">Live Alerts</h2>
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" title="Receiving data" />
            </div>
      
            {/* View Logs Button */}
            <button
              onClick={() => window.location.href = '/anomaly-logs'} // Update as needed
              className="text-sm text-gray-400 hover:text-white underline"
            >
              View Logs
            </button>
          </div>
          <LiveAlerts alerts={alerts} />
        </div>
        <AIDetectionPanel anomalyResult={anomalyResult} />
        <AnomalyContributorsPanel contributors={contributors} />
      </div>
        

        <div className="mt-12">
          <SensorLineChart chartData={chartData} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;