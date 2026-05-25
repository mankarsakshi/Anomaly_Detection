import { FaExclamationTriangle } from 'react-icons/fa';

const AlertCard = ({ message, timestamp }) => (
  <div className="flex items-start bg-red-900/40 border border-red-600 rounded-lg p-3 gap-3 w-full">
    <div className="text-red-400 mt-1">
      <FaExclamationTriangle className="text-xl" />
    </div>

   
    <div className="flex-1">
      <p className="text-red-400 font-semibold text-sm">Anomaly Detected</p>
      <p className="text-xs text-white/80 leading-tight">{message}</p>
      <p className="text-[0.7rem] text-gray-400 mt-1">{timestamp}</p>
    </div>
  </div>
);

export default AlertCard;