// components/TopBar.tsx
import { useEffect, useState } from "react"

interface TopBarProps {
  part: string;
}

export default function TopBar({ part }: TopBarProps) {
  const [seconds, setSeconds] = useState(0);
  const MAX_TIME = 15 * 60; // 15 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev >= MAX_TIME) {
          clearInterval(interval);
          return MAX_TIME;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  
  const isWarning = seconds >= MAX_TIME - 60; // Last minute warning
  const isCritical = seconds >= MAX_TIME - 30; // Last 30 seconds

  return (
    <div className="p-4 text-center text-sm font-medium bg-emerald-50">
      <div className="flex items-center justify-center gap-4">
        <span>{part.toUpperCase()}</span>
        <span className={`font-mono ${isCritical ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-emerald-600'}`}>
          {timeString}
        </span>
      </div>
    </div>
  );
}
  