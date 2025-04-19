"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface ScoreChartProps {
  scores: {
    fluency: number
    coherence: number
    lexicalResource: number
    grammaticalRange: number
    pronunciation: number
  }
}

export function ScoreChart({ scores }: ScoreChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  // Format score labels for display
  const formatLabel = (key: string): string => {
    switch (key) {
      case "fluency":
        return "Fluency"
      case "coherence":
        return "Coherence"
      case "lexicalResource":
        return "Vocabulary"
      case "grammaticalRange":
        return "Grammar"
      case "pronunciation":
        return "Pronunciation"
      default:
        return key
    }
  }

  return (
    <div className="space-y-4" ref={chartRef}>
      {Object.entries(scores).map(([key, value], index) => (
        <div key={key} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{formatLabel(key)}</span>
            <span className="text-muted-foreground">{Math.round(value * 10) / 10}/9</span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(value / 9) * 100}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
