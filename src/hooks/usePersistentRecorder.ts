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

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    allChunks.current = [];

    recorder.ondataavailable = (e) => {
      allChunks.current.push(e.data);
    };

    recorder.onstop = () => {
      const fullBlob = new Blob(allChunks.current, { type: "audio/webm" });
      setAudioBlob(fullBlob);
    };

    recorder.start(); // no interval needed
    setIsRecording(true);
    startOffset.current = performance.now();
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
