import { useEffect, useState } from 'react';
import axios from 'axios';

const useLivePrediction = () => {
  const [data, setData] = useState(null);
  const [anomalyResult, setAnomalyResult] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const NORMAL_RANGES = {
      pressure: [135, 165],
      flow_rate: [11.0, 13.0],
      temperature: [23, 37],
      vibration: [0.015, 0.06],
    };

    const getContributors = (input) => {
      return Object.entries(NORMAL_RANGES)
        .map(([key, [min, max]]) => {
          const value = input[key];
          let deviation = 0;

          if (value < min) deviation = min - value;
          else if (value > max) deviation = value - max;

          return {
            feature: key,
            value,
            deviation: Math.abs(deviation),
            status: deviation === 0 ? 'normal' : 'deviated',
          };
        })
        .filter((c) => c.status === 'deviated')
        .sort((a, b) => b.deviation - a.deviation);
    };

    const interval = setInterval(async () => {
      try {
        console.log("CALLING LIVE API...");

        const response = await axios.get('http://127.0.0.1:8000/predict-live');
        const row = response.data;

        console.log("LIVE DATA:", row);

        setData(row);
        setAnomalyResult(row.is_anomaly);

        if (row.is_anomaly) {
          const contributorsList = getContributors(row);
          setContributors(contributorsList);

          const newAlert = {
            id: Date.now(),
            type: 'Anomaly Detected',
            message: `AI detected anomaly at temperature: ${row.temperature}`,
            time: new Date().toLocaleTimeString(),
            score: row.score,
            input: row,
            contributors: contributorsList,
          };

          setAlerts((prev) => [...prev, newAlert]);

          const prevLogs = JSON.parse(localStorage.getItem('anomalyLogs') || '[]');
          localStorage.setItem('anomalyLogs', JSON.stringify([...prevLogs, newAlert]));
        }

        const timestamp = new Date().toLocaleTimeString();
        setChartData((prev) => {
          const newPoint = {
            time: timestamp,
            pressure: row.pressure,
            flow_rate: row.flow_rate,
            temperature: row.temperature,
            vibration: row.vibration,
          };

          const updated = [...prev, newPoint];
          return updated.length > 20 ? updated.slice(-20) : updated;
        });

        setLoading(false);
      } catch (err) {
        console.error("Live fetch error:", err.message);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return { data, anomalyResult, alerts, loading, chartData, contributors };
};

export default useLivePrediction;