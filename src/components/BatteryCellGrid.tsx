// All 8 battery cells are hardcoded here — no backend needed
// Status drives the color: healthy=green, warning=yellow, fault=red
const cells = [
  { id: 1, status: 'Healthy' },
  { id: 2, status: 'Healthy' },
  { id: 3, status: 'Healthy' },
  { id: 4, status: 'Warning' },
  { id: 5, status: 'Healthy' },
  { id: 6, status: 'Healthy' },
  { id: 7, status: 'Fault'   },
  { id: 8, status: 'Healthy' },
]

// Map each status string to Tailwind classes for background, border, and text
function statusStyles(status: string) {
  if (status === 'Warning') return 'bg-yellow-50 border-yellow-400 text-yellow-700'
  if (status === 'Fault')   return 'bg-red-50   border-red-400   text-red-700'
  return 'bg-green-50 border-green-400 text-green-700'
}

// Badge colors are slightly darker than the card background so they stand out
function badgeStyles(status: string) {
  if (status === 'Warning') return 'bg-yellow-100 text-yellow-800'
  if (status === 'Fault')   return 'bg-red-100   text-red-800'
  return 'bg-green-100 text-green-800'
}

export default function BatteryCellGrid() {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-base font-semibold text-gray-700 mb-4">
        Battery Cell Status
      </h2>

      {/* 4 columns on medium+ screens, 2 columns on small screens */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cells.map((cell) => (
          <div
            key={cell.id}
            className={`border-2 rounded-lg p-3 flex flex-col items-center gap-1 ${statusStyles(cell.status)}`}
          >
            <span className="text-sm font-semibold">Cell {cell.id}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeStyles(cell.status)}`}>
              {cell.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
