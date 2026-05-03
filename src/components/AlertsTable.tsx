// Three hardcoded alert rows — represents recent sensor events
const alerts = [
  { cell: 'Cell 7', issue: 'High Vibration',   time: '10:42 AM',  severity: 'Critical' },
  { cell: 'Cell 4', issue: 'Voltage Drift',     time: '09:15 AM',  severity: 'Warning'  },
  { cell: 'Cell 2', issue: 'Temperature Spike', time: 'Yesterday', severity: 'Resolved' },
]

// Each severity level gets its own badge color
function severityBadge(severity: string) {
  if (severity === 'Critical') return 'bg-red-100    text-red-700    font-semibold'
  if (severity === 'Warning')  return 'bg-yellow-100 text-yellow-700 font-semibold'
  return 'bg-green-100 text-green-700 font-semibold'
}

export default function AlertsTable() {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Recent Alerts</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wide">
              <th className="pb-2 pr-4">Cell</th>
              <th className="pb-2 pr-4">Issue</th>
              <th className="pb-2 pr-4">Time</th>
              <th className="pb-2">Severity</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, index) => (
              // hover:bg-gray-50 gives the subtle row highlight on mouse-over
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-2.5 pr-4 font-medium text-gray-800">{alert.cell}</td>
                <td className="py-2.5 pr-4 text-gray-600">{alert.issue}</td>
                <td className="py-2.5 pr-4 text-gray-500">{alert.time}</td>
                <td className="py-2.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs ${severityBadge(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
