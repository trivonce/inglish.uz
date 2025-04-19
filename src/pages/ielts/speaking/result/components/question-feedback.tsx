"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface QuestionFeedbackProps {
  feedback: {
    questionId: string
    questionText: string
    bandScore: number
    fluency: number
    coherence: number
    lexicalResource: number
    grammaticalRange: number
    pronunciation: number
    comment: string
    suggestions: string
    transcript: string
  }
}

export function QuestionFeedback({ feedback }: QuestionFeedbackProps) {
  // Helper function to get color based on score

  const getScoreColor = (score: number) => {
    if (score >= 7) return "bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
    if (score >= 5) return "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  return (
    <div className="space-y-4 py-2">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {[
          { label: "Fluency", score: feedback.fluency },
          { label: "Coherence", score: feedback.coherence },
          { label: "Vocabulary", score: feedback.lexicalResource },
          { label: "Grammar", score: feedback.grammaticalRange },
          { label: "Pronunciation", score: feedback.pronunciation },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center p-2 rounded-lg bg-muted">
            <span className="text-xs text-muted-foreground mb-1">{item.label}</span>
            <Badge variant="outline" className={`${getScoreColor(item.score)} border-0`}>
              {item.score}/9
            </Badge>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-sm">Your Response:</h4>
              <p className="text-sm italic mt-1 p-2 bg-muted rounded-md">"{feedback.transcript}"</p>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium text-sm">Feedback:</h4>
              <p className="text-sm mt-1">{feedback.comment}</p>
            </div>

            <div>
              <h4 className="font-medium text-sm">Suggestions for Improvement:</h4>
              <p className="text-sm mt-1">{feedback.suggestions}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <div className="space-y-2">
        <h4 className="font-medium text-sm">Example Response:</h4>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm">
              {feedback.questionText === "Do you like to travel?"
                ? "Yes, I absolutely love traveling. It's one of my greatest passions because it allows me to experience different cultures and broaden my horizons. I particularly enjoy visiting historical sites and trying local cuisines. Last year, I had the opportunity to visit Japan, and the experience was truly unforgettable."
                : feedback.questionText === "Describe a memorable trip."
                  ? "One of my most memorable trips was to Barcelona, Spain, three years ago. What made it special was the combination of stunning architecture, particularly Gaudi's works like the Sagrada Familia, the vibrant atmosphere of Las Ramblas, and the delicious Spanish cuisine. I spent five days exploring the city, visiting museums during the day and enjoying local restaurants in the evening. The highlight was definitely watching the sunset from Park Güell with its panoramic views of the entire city."
                  : "People are drawn to travel for numerous reasons. Firstly, it offers an escape from routine and allows individuals to relax and recharge. Additionally, traveling exposes people to different cultures, traditions, and perspectives, which broadens their worldview and fosters understanding. Many travelers also seek personal growth through challenging experiences outside their comfort zone. Furthermore, creating memories and sharing experiences with loved ones strengthens relationships. Finally, there's the simple joy of discovery – seeing new landscapes, tasting different foods, and experiencing unique cultural practices firsthand."}
            </p>
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}
