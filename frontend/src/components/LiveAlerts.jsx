import { MdWarning } from 'react-icons/md'

export default function LiveAlerts({ alerts }) {
  const latestThree = alerts.slice(-2).reverse()

  return (
    <div className="space-y-4">
      {latestThree.map(alert => (
        <div key={alert.id} className="bg-red-800/20 border border-red-500 text-red-200 px-4 py-3 rounded-md shadow-lg backdrop-blur-md animate-pulse">
          <div className="flex gap-3 items-start">
            <MdWarning className="text-red-400 text-xl mt-1" />
            <div className="text-sm">
              <p className="font-semibold">{alert.type}</p>
              <p className="text-xs mt-1">{alert.message}</p>
              <p className="text-[0.65rem] mt-1 text-gray-400">
                {new Date(alert.id).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
