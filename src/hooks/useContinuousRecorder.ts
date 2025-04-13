import { useEffect, useRef, useState } from "react"

export interface QuestionTiming {
  part: string
  index: number
  start: number
  end?: number
}

export function useContinuousRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [startTime, setStartTime] = useState<number>(0)
  const [timings, setTimings] = useState<QuestionTiming[]>([])

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])
  const startOffset = useRef(performance.now())

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new MediaRecorder(stream)
    mediaRecorderRef.current = recorder
    setStartTime(performance.now())
    startOffset.current = performance.now()

    recorder.ondataavailable = (e) => {
      chunks.current.push(e.data)
    }

    recorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" })
      setAudioBlob(blob)
    }

    recorder.start()
    setIsRecording(true)
  }

  const stop = () => {
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current?.stop()
      setIsRecording(false)
    }
  }

  const markStart = (part: string, index: number) => {
    const time = (performance.now() - startOffset.current) / 1000
    setTimings(prev => [...prev, { part, index, start: time }])
  }

  const markEnd = () => {
    const time = (performance.now() - startOffset.current) / 1000
    setTimings(prev => {
      const updated = [...prev]
      if (updated.length > 0 && !updated[updated.length - 1].end) {
        updated[updated.length - 1].end = time
      }
      return updated
    })
  }

  return {
    isRecording,
    audioBlob,
    timings,
    start,
    stop,
    markStart,
    markEnd
  }
}
