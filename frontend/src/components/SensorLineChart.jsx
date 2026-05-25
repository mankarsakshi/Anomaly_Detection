import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SensorLineChart({ chartData }) {
  return (
    <div className="bg-[#1e1f24] p-4 rounded-xl border border-gray-700 shadow-md">
      <h2 className="text-white text-lg font-semibold mb-2">Live Sensor Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pressure" stroke="#06b6d4" dot={false} />
          <Line type="monotone" dataKey="flow_rate" stroke="#6366f1" dot={false} />
          <Line type="monotone" dataKey="temperature" stroke="#f43f5e" dot={false} />
          <Line type="monotone" dataKey="vibration" stroke="#ec4899" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
