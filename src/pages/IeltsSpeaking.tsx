"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Clock, ChevronRight, ChevronLeft, BarChart3 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const IeltsSpeaking = () => {
  const [activeTest, setActiveTest] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(60) // seconds

  const mockTests = [
    { id: "part1", title: "Part 1: Introduction", duration: "4-5 minutes" },
    { id: "part2", title: "Part 2: Individual Long Turn", duration: "3-4 minutes" },
    { id: "part3", title: "Part 3: Two-way Discussion", duration: "4-5 minutes" },
  ]

  const questions = [
    "Let's talk about your hometown. What do you like most about living there?",
    "Do you prefer living in a house or an apartment? Why?",
    "What kind of transport do you usually use? Why?",
    "Do you enjoy reading books? What kind of books do you like to read?",
    "How often do you use the internet and what do you use it for?",
  ]

  const handleStartTest = (testId: string) => {
    setActiveTest(testId)
    setCurrentQuestion(0)
    setTimeRemaining(60)
  }

  const handleToggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real app, you would start/stop recording here
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeRemaining(60)
      setIsRecording(false)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setTimeRemaining(60)
      setIsRecording(false)
    }
  }

  const handleBackToTests = () => {
    setActiveTest(null)
    setIsRecording(false)
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-emerald-800">IELTS Speaking</h1>
        <p className="text-gray-600">Practice for your IELTS speaking test</p>
      </header>

      {!activeTest ? (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2">Mock Speaking Test</h2>
              <p className="mb-4">
                Practice all three parts of the IELTS Speaking test with our mock tests. Get feedback on your
                performance and improve your score.
              </p>
              <div className="flex items-center gap-2">
                <Mic className="h-5 w-5" />
                <span>Realistic test experience</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {mockTests.map((test) => (
              <Card key={test.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{test.title}</h3>
                    <p className="text-sm text-gray-500">Duration: {test.duration}</p>
                  </div>
                  <Button onClick={() => handleStartTest(test.id)} className="bg-emerald-600 hover:bg-emerald-700">
                    Start
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">IELTS Speaking Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Speak clearly and at a natural pace</li>
                <li>• Use a variety of vocabulary and grammatical structures</li>
                <li>• Develop your answers with examples and explanations</li>
                <li>• Don't memorize answers - be natural and spontaneous</li>
                <li>• Practice regularly with different topics</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          <Button variant="outline" onClick={handleBackToTests} className="mb-2">
            Back to Tests
          </Button>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>
                    {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>

              <Progress value={(currentQuestion / (questions.length - 1)) * 100} className="mb-6" />

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-800">{questions[currentQuestion]}</p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <Button
                  onClick={handleToggleRecording}
                  className={`w-16 h-16 rounded-full ${
                    isRecording ? "bg-red-500 hover:bg-red-600" : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </Button>
                <span className="text-sm text-gray-600">{isRecording ? "Stop Recording" : "Start Recording"}</span>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Your Recent Attempts</h3>
                <Button variant="ghost" size="sm" className="text-emerald-600">
                  <BarChart3 className="h-4 w-4 mr-1" /> View All
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Part 1 - Introduction</span>
                  <span className="text-emerald-600 font-medium">6.5/9</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Part 2 - Long Turn</span>
                  <span className="text-emerald-600 font-medium">7.0/9</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default IeltsSpeaking
