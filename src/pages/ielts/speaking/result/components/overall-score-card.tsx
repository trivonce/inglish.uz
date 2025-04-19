"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface OverallScoreCardProps {
  score: number
}

export function OverallScoreCard({ score }: OverallScoreCardProps) {
  // Determine score level and color
  const getScoreInfo = (score: number) => {
    if (score >= 7) return { level: "Advanced", color: "text-primary-600" }
    if (score >= 5) return { level: "Intermediate", color: "text-primary-400" }
    return { level: "Basic", color: "text-red-500" }
  }

  const { level, color } = getScoreInfo(score)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Overall Score</CardTitle>
        <CardDescription>Your speaking test performance</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-4">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200 dark:text-gray-700"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <motion.circle
              className={color}
              strokeWidth="10"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
              initial={{ strokeDasharray: 251.2, strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * score) / 9 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <motion.span
              className={`text-4xl font-bold ${color}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {score}
            </motion.span>
            <span className="text-sm text-muted-foreground">out of 9</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className={`text-xl font-semibold ${color}`}>{level}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {score >= 7
              ? "You have excellent command of the language"
              : score >= 5
                ? "You have a good command with some limitations"
                : "You need significant improvement"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
