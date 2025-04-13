import { useState } from "react"

export function useExamStart() {
    const [isStarted, setIsStarted] = useState(false)
    const [error, setError] = useState<string | null>(null)
  
    const requestPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        console.log(stream)
        stream.getTracks().forEach(track => track.stop())
        setIsStarted(true)
        setError(null)
      } catch (err) {
        setError("🎙️ Microphone permission is required to start the exam.")
        console.error("Mic permission denied:", err)
      }
    }
  
    return {
      isStarted,
      error,
      requestPermission
    }
  }
  
