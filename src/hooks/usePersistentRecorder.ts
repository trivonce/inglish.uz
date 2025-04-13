import { useState, useRef } from "react";
import { set, get, del } from "idb-keyval";

export interface QuestionTiming {
  part: string;
  index: number;
  start: number;
  end?: number;
}

const DB_KEY = "ielts_audio_chunks";

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

    recorder.ondataavailable = async (e) => {
      allChunks.current.push(e.data);
      const storedChunks = (await get<Blob[]>(DB_KEY)) || [];
      storedChunks.push(e.data);
      await set(DB_KEY, storedChunks);
    };

    recorder.onstop = async () => {
      const chunks = await get<Blob[]>(DB_KEY);
      if (chunks) {
        const fullBlob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(fullBlob);
      }
    };

    recorder.start(1000); // emit chunks every second
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

    await del(DB_KEY);
    setIsRecording(false);
    setAudioBlob(null);
    setTimings([]);
  };

  const resume = async () => {
    await start();
  };

  const markStart = (part: string, index: number) => {
    const t = (performance.now() - startOffset.current) / 1000;
    setTimings((prev) => [...prev, { part, index, start: t }]);
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
