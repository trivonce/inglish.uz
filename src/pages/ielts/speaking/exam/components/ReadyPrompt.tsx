"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, ArrowLeft, Clock, Volume2, CheckCircle, AlertCircle } from "lucide-react"

interface ReadyPromptProps {
  onAllow: () => void
  onGoBack?: () => void
  error?: string | null
}

export default function ReadyPrompt({ onAllow, onGoBack, error }: ReadyPromptProps) {
  const testRules = [
    { icon: <Mic className="h-5 w-5 text-emerald-600" />, text: "Speak clearly and at a natural pace" },
    { icon: <Clock className="h-5 w-5 text-emerald-600" />, text: "You'll have 1-2 minutes to answer each question" },
    { icon: <Volume2 className="h-5 w-5 text-emerald-600" />, text: "Ensure you're in a quiet environment" },
    {
      icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
      text: "Complete all parts of the test for accurate scoring",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full shadow-lg border-emerald-100">
        <CardHeader className="text-center border-b pb-6">
          <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Mic className="h-8 w-8 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-emerald-700">Ready to Begin Your Speaking Test?</CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            This test evaluates your English speaking skills through a series of questions
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Before you start:</h3>
            <ul className="space-y-3">
              {testRules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-0.5">{rule.icon}</div>
                  <span className="text-gray-700">{rule.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <p className="text-sm text-emerald-800 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>This test requires microphone access. Please allow when prompted.</span>
            </p>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            onClick={onGoBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={onAllow}>
            I'm Ready
          </Button>
        </CardFooter>
      </Card>

      <p className="text-xs text-gray-500 mt-6 max-w-md text-center">
        By proceeding, you agree to our terms and conditions regarding audio recording and assessment.
      </p>
    </div>
  )
}
