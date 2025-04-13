import { useEffect, useRef, useState } from "react"
import { set, get, del } from "idb-keyval"

export interface QuestionTiming {
  part: string
  index: number
  start: number
  end?: number
}

const DB_KEY = "ielts_audio_chunks"

export function usePersistentRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [timings, setTimings] = useState<QuestionTiming[]>([])

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const startOffset = useRef(performance.now())

  const allChunks = useRef<Blob[]>([])

  const start = async () => {
    console.log("🎤 Starting persistent recording...")
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    streamRef.current = stream
    const recorder = new MediaRecorder(stream)
    mediaRecorderRef.current = recorder
    allChunks.current = []

    recorder.ondataavailable = async (e) => {
      allChunks.current.push(e.data)
      const storedChunks = await get<Blob[]>(DB_KEY) || []
      storedChunks.push(e.data)
      await set(DB_KEY, storedChunks)
    }

    recorder.onstop = async () => {
      const chunks = await get<Blob[]>(DB_KEY)
      if (chunks) {
        const fullBlob = new Blob(chunks, { type: "audio/webm" })
        setAudioBlob(fullBlob)
        console.log("✅ Final audio recovered from IndexedDB", fullBlob)
      }
    }

    recorder.start(1000) // emit data every second
    setIsRecording(true)
    startOffset.current = performance.now()
  }

  const stop = () => {
    console.log("🛑 Stopping persistent recorder...")
    mediaRecorderRef.current?.stop()
    streamRef.current?.getTracks().forEach(track => track.stop())
    setIsRecording(false)
  }

  const clear = async () => {
    await del(DB_KEY)
    setAudioBlob(null)
    setTimings([])
  }

  const resume = async () => {
    console.log("🔁 Resuming recorder from previous session...")
    await start()
  }

  const markStart = (part: string, index: number) => {
    const t = (performance.now() - startOffset.current) / 1000
    setTimings(prev => [...prev, { part, index, start: t }])
  }

  const markEnd = () => {
    const t = (performance.now() - startOffset.current) / 1000
    setTimings(prev => {
      const updated = [...prev]
      if (updated.length > 0 && !updated[updated.length - 1].end) {
        updated[updated.length - 1].end = t
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
    resume,
    clear,
    markStart,
    markEnd
  }
}
