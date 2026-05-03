import VibrationChart from './components/VibrationChart'
import BatteryCellGrid from './components/BatteryCellGrid'
import AlertsTable from './components/AlertsTable'

// Format today's date as "May 3, 2026" — runs once on load
function getTodayDate(): string {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Three summary cards — values are hardcoded to keep things simple and explainable
const statCards = [
  {
    label: 'Battery Health',
    value: '87%',
    badge: 'Good',
    badgeColor: 'bg-green-100 text-green-700',
    icon: '🔋',
  },
  {
    label: 'Vibration Status',
    value: 'Normal',
    badge: 'Normal',
    badgeColor: 'bg-green-100 text-green-700',
    icon: '📈',
  },
  {
    label: 'Last Scan',
    value: '2 min ago',
    badge: 'Live',
    badgeColor: 'bg-blue-100 text-blue-700',
    icon: '🕐',
  },
]

export default function App() {
  return (
    // min-h-screen so the footer always sits at the bottom of at least the full viewport
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── HEADER ── */}
      <header style={{ backgroundColor: '#1e3a5f' }} className="px-6 py-4 flex items-center justify-between">
        {/* Left side: app name + live indicator */}
        <div className="flex items-center gap-3">
          <h1 className="text-white text-xl font-bold tracking-tight">
            EVident Sensor Dashboard
          </h1>
          {/* Pulsing green dot — animation defined in index.css */}
          <div className="flex items-center gap-1.5">
            <span className="live-dot inline-block w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="text-green-300 text-sm font-medium">Live</span>
          </div>
        </div>

        {/* Right side: date and attribution */}
        <div className="text-right">
          <p className="text-blue-200 text-sm">{getTodayDate()}</p>
          <p className="text-blue-300 text-xs mt-0.5">Built by Pawan Kumar | Portfolio Demo</p>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-6 space-y-6">

        {/* ── STAT CARDS ROW ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
              {/* Icon circle */}
              <div className="text-2xl w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                {card.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{card.label}</p>
                <p className="text-2xl font-bold text-gray-800 leading-tight">{card.value}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── LIVE VIBRATION CHART ── */}
        {/* VibrationChart manages its own state with useState + setInterval */}
        <VibrationChart />

        {/* ── BATTERY CELL GRID + ALERTS TABLE — side by side on wide screens ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BatteryCellGrid />
          <AlertsTable />
        </div>

      </main>

      {/* ── FOOTER ── */}
      <footer className="text-center text-xs text-gray-400 py-4 border-t border-gray-200 px-4">
        Demo project built by Pawan Kumar to showcase frontend skills for EVident Battery internship | UIC Computer Science
      </footer>

    </div>
  )
}
