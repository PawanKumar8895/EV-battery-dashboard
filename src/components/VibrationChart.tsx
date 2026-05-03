// VibrationChart.tsx
// Shows real EV battery SOC (State of Charge) data from a Kaggle dataset
// instead of random numbers. Data is from a "heavy user" EV recorded Feb 2020.
// We play it back one point at a time using setInterval to simulate live feed.

import { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer, Label
} from 'recharts'

// --- REAL DATA from Kaggle "EV Sensors Dataset" (heavy_user.csv) ---
// Each point is one hourly reading from the actual vehicle sensor log.
// SOC = State of Charge (%) — how full the battery is at that hour.
const REAL_SOC_DATA = [
  { time: '06:00', SOC: 85.5 },
  { time: '07:00', SOC: 83.2 },
  { time: '08:00', SOC: 80.8 },
  { time: '09:00', SOC: 78.3 },
  { time: '10:00', SOC: 75.8 },
  { time: '11:00', SOC: 73.4 },
  { time: '12:00', SOC: 70.8 },
  { time: '13:00', SOC: 68.6 },
  { time: '14:00', SOC: 66.1 },
  { time: '15:00', SOC: 63.8 },
  { time: '16:00', SOC: 61.6 },
  { time: '17:00', SOC: 59.3 },
  { time: '18:00', SOC: 57.0 },
  { time: '19:00', SOC: 54.4 },
  { time: '20:00', SOC: 54.4 },
  { time: '21:00', SOC: 54.4 },
  { time: '22:00', SOC: 54.4 },
  { time: '23:00', SOC: 52.0 },
  { time: '00:00', SOC: 49.6 },
  { time: '01:00', SOC: 80.0 }, // recharged overnight
]

export default function VibrationChart() {
  // We start by showing the first 8 real data points
  const [visibleData, setVisibleData] = useState(REAL_SOC_DATA.slice(0, 8))
  // This index tracks which point we'll add next
  const [index, setIndex] = useState(8)

  useEffect(() => {
    // Every 2 seconds, add the next real data point and drop the oldest
    // This makes it look like a live feed scrolling forward
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = prev < REAL_SOC_DATA.length ? prev : 0 // loop back
        setVisibleData((current) => {
          const newPoint = REAL_SOC_DATA[next % REAL_SOC_DATA.length]
          const updated = [...current.slice(1), newPoint] // drop first, add new
          return updated
        })
        return next + 1
      })
    }, 2000)

    return () => clearInterval(interval) // cleanup on unmount
  }, [])

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="mb-1">
        <h2 className="text-base font-semibold text-gray-800">
          Live Battery Charge Feed
        </h2>
        {/* Tell the viewer where this data comes from */}
        <p className="text-xs text-gray-400 mt-0.5">
          Real sensor data · Kaggle EV Dataset (Heavy User, Feb 2020) · Replaying hourly readings
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={visibleData} margin={{ top: 10, right: 30, left: 10, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

          <XAxis dataKey="time" tick={{ fontSize: 11 }}>
            <Label value="Time of Day" offset={-10} position="insideBottom" style={{ fontSize: 11, fill: '#888' }} />
          </XAxis>

          <YAxis domain={[20, 100]} tick={{ fontSize: 11 }}>
            <Label value="SOC (%)" angle={-90} position="insideLeft" offset={10} style={{ fontSize: 11, fill: '#888' }} />
          </YAxis>

          <Tooltip formatter={(value: number) => [`${value}%`, 'Battery Charge']} />

          {/* Red dashed line at 20% — low battery warning threshold */}
          <ReferenceLine y={20} stroke="red" strokeDasharray="4 4" label={{ value: 'Low Battery', position: 'right', fontSize: 10, fill: 'red' }} />

          <Line
            type="monotone"
            dataKey="SOC"
            stroke="#1e3a5f"
            strokeWidth={2}
            dot={{ r: 3 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}