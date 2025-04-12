"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface WelcomeProps {
  onComplete: () => void
}

const Welcome = ({ onComplete }: WelcomeProps) => {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Welcome to Inglish.uz",
      description: "Your fun journey to English fluency starts here!",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Interactive Learning",
      description: "Engage with fun games and activities designed to improve your English skills.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "IELTS Speaking Practice",
      description: "Prepare for your IELTS exam with our mock speaking tests.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      title: "Track Your Progress",
      description: "Monitor your improvement and celebrate your achievements.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-teal-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <img
              src={steps[currentStep].image || "/placeholder.svg"}
              alt={steps[currentStep].title}
              className="h-48 w-48 object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold text-center text-emerald-700 mb-4">{steps[currentStep].title}</h1>

          <p className="text-center text-gray-600 mb-8">{steps[currentStep].description}</p>

          <div className="flex justify-center mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${index === currentStep ? "bg-emerald-500" : "bg-gray-300"}`}
              />
            ))}
          </div>

          <Button onClick={handleNext} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            {currentStep < steps.length - 1 ? (
              <span className="flex items-center justify-center">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </span>
            ) : (
              "Get Started"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Welcome
