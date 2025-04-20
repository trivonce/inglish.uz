import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Lottie from "lottie-react"
import { ArrowRight, LogOut, Mic, MicOff, Pause, Play } from "lucide-react"
import recordingAnimation from "@/assets/lottie/recording.json"
import { motion, AnimatePresence } from "framer-motion"

interface BottomControlsProps {
  onLeave: () => void
  onNext: () => void
  canProceed: boolean
  isRecording: boolean
  recordingTime?: number
  onTogglePause?: () => void
  isPaused?: boolean
}

export default function BottomControls({
  onLeave,
  onNext,
  canProceed,
  isRecording,
  recordingTime = 0,
  onTogglePause,
  isPaused = false,
}: BottomControlsProps) {
  // Format recording time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Animation for recording indicator
  const [dots, setDots] = useState(".")

  useEffect(() => {
    if (!isRecording || isPaused) return

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [isRecording, isPaused])

  return (
    <div className="sticky bottom-0 border-t bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] py-4">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            onClick={onLeave}
          >
            <LogOut className="h-4 w-4 mr-2 rotate-180" />
            Leave
          </Button>

          <div className="flex flex-col items-center">
            <AnimatePresence>
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden h-10 flex items-center justify-center"
                >
                  <Lottie 
                    animationData={recordingAnimation} 
                    loop={true} 
                    className="h-25"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            {isRecording && onTogglePause && (
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full h-10 w-10 ${
                  isPaused
                    ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    : "border-amber-200 text-amber-700 hover:bg-amber-50"
                }`}
                onClick={onTogglePause}
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
            )}

            <Button onClick={onNext} disabled={!canProceed} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
