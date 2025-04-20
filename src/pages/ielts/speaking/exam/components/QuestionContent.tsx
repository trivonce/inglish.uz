import { Card, CardContent } from "@/components/ui/card"
import { Mic, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface QuestionContentProps {
  index: number
  text: string
  totalQuestions?: number
  timeRemaining?: number
  maxTime?: number
  bullets?: string[]
}

export default function QuestionContent({
  index,
  text,
  totalQuestions = 3,
  timeRemaining,
  maxTime = 120,
  bullets = [],
}: QuestionContentProps) {
  // Calculate progress percentage
  const progressPercentage = ((index + 1) / totalQuestions) * 100

  // Calculate time progress if timeRemaining is provided
  const timeProgress = timeRemaining !== undefined ? (timeRemaining / maxTime) * 100 : undefined

  // Format time remaining in MM:SS if provided
  const formattedTime =
    timeRemaining !== undefined
      ? `${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, "0")}`
      : undefined

  return (
    <div className="max-w-2xl mx-auto w-full px-4">

      <Card className="border-1 border-emerald-100 shadow-emerald-100 shadow-md">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="bg-emerald-50 p-3 rounded-full">
              <Mic className="h-6 w-6 text-emerald-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Question {index + 1}</h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">{text}</p>
              {bullets.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-md">
                <h1 className="text-base text-left text-gray-600 font-medium mb-0.5">You should say:</h1>
                <ul className="text-left text-gray-500">
                  
                  {bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-emerald-600">–</span>
                      <span className="text-gray-500 font-normal text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      
    </div>
  )
}
