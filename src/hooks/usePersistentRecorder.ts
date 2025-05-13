import { getSupportedAudioMimeType } from "@/lib/media";
import { useState, useRef } from "react";

export interface QuestionTiming {
  questionId: string;
  start: number;
  end?: number;
}

export function usePersistentRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [timings, setTimings] = useState<QuestionTiming[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const startOffset = useRef(performance.now());
  const allChunks = useRef<Blob[]>([]);

  const start = async (stream?: MediaStream) => {
    if (isRecording || mediaRecorderRef.current?.state === "recording") {
      console.log("🎙️ Already recording, skip start()");
      return;
    }
  
    if (stream) {
      streamRef.current = stream;
    }
  
    if (!streamRef.current) {
      console.warn("⚠️ No stream provided to start()");
      return;
    }
  
    allChunks.current = [];
  
    const mimeType = getSupportedAudioMimeType();
    const recorder = new MediaRecorder(streamRef.current, mimeType ? { mimeType } : {});
    mediaRecorderRef.current = recorder;
  
    recorder.ondataavailable = (e) => {
      allChunks.current.push(e.data);
    };
  
    recorder.onstop = () => {
      const fullBlob = new Blob(allChunks.current, { type: mimeType || 'audio/webm' });
      setAudioBlob(fullBlob);
    };    
  
    recorder.start();
    setIsRecording(true);
    startOffset.current = performance.now();
    console.log("✅ Recording started");
  };  

  const stop = () => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setIsRecording(false);
  };

  const clear = async () => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());

    mediaRecorderRef.current = null;
    streamRef.current = null;
    allChunks.current = [];

    setIsRecording(false);
    setAudioBlob(null);
    setTimings([]);
  };

  const resume = async () => {
    await start();
  };

  const markStart = (questionId: string) => {
    // First, mark end for the previous question if it exists
    if (timings.length > 0 && !timings[timings.length - 1].end) {
      const t = (performance.now() - startOffset.current) / 1000;
      setTimings(prev => {
        const updated = [...prev];
        updated[updated.length - 1].end = t;
        return updated;
      });
    }

    const t = (performance.now() - startOffset.current) / 1000;
    setTimings((prev) => [...prev, { questionId, start: t }]);
  };
  

  const markEnd = () => {
    const t = (performance.now() - startOffset.current) / 1000;
    setTimings((prev) => {
      const updated = [...prev];
      if (updated.length > 0 && !updated[updated.length - 1].end) {
        updated[updated.length - 1].end = t;
      }
      return updated;
    });
  };

  return {
    isRecording,
    audioBlob,
    timings,
    start,
    stop,
    resume,
    clear,
    markStart,
    markEnd,
  };
}
