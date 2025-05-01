import { useState } from "react"

export function useExamStart() {
  const [isStarted, setIsStarted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requestPermission = async (): Promise<MediaStream | null> => {
    console.log('🎙️ Requesting mic permission...')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setIsStarted(true)
      setError(null)
      return stream
    } catch (err) {
      setError("🎙️ Microphone permission is required to start the exam.")
      console.error("Mic permission denied:", err)
      return null
    }
  }

  return {
    isStarted,
    error,
    requestPermission
  }
}
