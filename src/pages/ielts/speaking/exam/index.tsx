"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Mic, ChevronRight, ArrowBigRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function IeltsSpeakingExam() {
  const [time, setTime] = useState(120) // 2 minutes in seconds
  const [isRecording, setIsRecording] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  // Sample questions
  const questions = [
    {
      part: "Part 1",
      question: "Can you tell me about your hometown?",
    },
    {
      part: "Part 1",
      question: "What do you like most about living there?",
    },
    {
      part: "Part 2",
      question:
        "Describe a book you have recently read. You should say:\n- what the book was\n- what it was about\n- why you decided to read it\n- and explain how you felt about it.",
    },
  ]

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [time])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Toggle recording state
  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  // Go to next question
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setTime(120) // Reset timer for new question
    }
  }

  // Go to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setTime(120) // Reset timer for new question
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top timer bar */}
      <div className="bg-white p-4 border-b shadow-sm">
        <div className="flex justify-center">
          <div className="px-4 py-2 bg-gray-100 rounded-full font-mono text-lg font-semibold">{formatTime(time)}</div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-2xl p-6 shadow-md">
          <h2 className="text-lg font-medium text-gray-500 mb-2">{questions[currentQuestion].part}</h2>
          <h1 className="text-2xl font-bold mb-4">Question {currentQuestion + 1}</h1>
          <p className="text-lg whitespace-pre-line">{questions[currentQuestion].question}</p>
        </Card>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-5 left-3 w-[calc(100%-24px)] bg-white p-3 rounded-xl shadow">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          
        <span className="flex items-center gap-2">
          <Button className="bg-slate-200 text-slate-800" onClick={prevQuestion}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
            <p className="text-sm text-slate-300 font-medium">Go back</p>
          </span>
         

          <Button
            size="lg"
            className={`rounded-full absolute left-1/2 -translate-x-1/2 w-20 h-20 ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"}`}
            onClick={toggleRecording}
          >
            <Mic className="!h-10 !w-10" />
          </Button>

          <span className="flex items-center gap-2">
            <p className="text-sm text-slate-300 font-medium">Next</p>
          <Button variant="outline" className="bg-emerald-100 border-emerald-100 text-emerald-700" onClick={nextQuestion} disabled={currentQuestion === questions.length - 1}>
            <ArrowRight className="" />
          </Button>
          </span>
        </div>
      </div>
    </div>
  )
}
