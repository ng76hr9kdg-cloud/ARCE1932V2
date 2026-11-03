'use client'

import { useEffect, useState } from 'react'

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const units: { key: keyof TimeLeft; label: string }[] = [
  { key: 'days', label: 'Giorni' },
  { key: 'hours', label: 'Ore' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Sec' },
]

export function Countdown({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate).getTime()
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(getTimeLeft(target))
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <div
      role="timer"
      aria-live="off"
      aria-label="Conto alla rovescia per la prossima partita"
      className="grid grid-cols-4 gap-1.5"
    >
      {units.map((unit) => (
        <div key={unit.key} className="flex flex-col items-center bg-primary py-2.5 text-white">
          <span className="font-display text-2xl font-semibold leading-none tabular-nums">
            {timeLeft ? String(timeLeft[unit.key]).padStart(2, '0') : '--'}
          </span>
          <span className="mt-1 text-[9px] font-medium uppercase tracking-widest text-white/60">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}
