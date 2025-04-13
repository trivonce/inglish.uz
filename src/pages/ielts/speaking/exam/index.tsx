import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSpeakingTopic } from "@/features/speaking/hooks";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { usePersistentRecorder } from "@/hooks/usePersistentRecorder";
import { useExamStart } from "@/hooks/useExamStart";
import ReadyPrompt from "@/components/ReadyPrompt";

export default function IeltsSpeakingExam() {
  const { id } = useParams<{ id: string }>();
  const { data: topic } = useSpeakingTopic(id!);
  const [currentPart, setCurrentPart] = useState<"part1" | "part2" | "part3">(
    "part1"
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canProceed, setCanProceed] = useState(false);

  const { isStarted, error, requestPermission } = useExamStart();

  const {
    isRecording,
    start,
    stop,
    resume,
    clear,
    timings,
    audioBlob,
    markStart,
    markEnd,
  } = usePersistentRecorder();

  const currentQuestion: any = topic?.questions?.[currentPart]?.[currentIndex];

  useEffect(() => {
    if (isStarted && currentQuestion && !isRecording) {
      start().then(() => markStart(currentPart, currentIndex));
    }
  }, [isStarted, currentQuestion]);

  useEffect(() => {
    if (!currentQuestion?.audioUrl || !isStarted) return;

    const audio = new Audio(currentQuestion.audioUrl);
    audio.play();

    audio.onended = () => {
      markStart(currentPart, currentIndex);
      setTimeout(() => setCanProceed(true), 5000);
    };

    return () => audio.pause();
  }, [currentQuestion?.audioUrl, isStarted]);

  const nextQuestion = () => {
    markEnd();
    setCanProceed(false);

    const nextIndex = currentIndex + 1;
    const currentPartQuestions = topic?.questions?.[currentPart] || [];

    if (nextIndex < currentPartQuestions.length) {
      setCurrentIndex(nextIndex);
    } else if (currentPart === "part1") {
      setCurrentPart("part2");
      setCurrentIndex(0);
    } else if (currentPart === "part2") {
      setCurrentPart("part3");
      setCurrentIndex(0);
    } else {
      stop();
      alert("✅ Test finished!");
      console.log("🎧 Full audio blob:", audioBlob);
      console.log("📍 Timings:", timings);
    }
  };

  if (!isStarted) {
    return (
      <ReadyPrompt
        onAllow={async () => {
          await requestPermission();
          if (!error) {
            await start();
            markStart("part1", 0);
          }
        }}
        error={error}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="p-4 text-center text-sm font-medium bg-gray-100">
        {currentPart.toUpperCase()}
      </div>

      <div className="p-6 flex flex-col items-center gap-4">
        <h1 className="text-xl font-bold">Question {currentIndex + 1}</h1>
        <p className="text-lg">{currentQuestion?.text}</p>
      </div>

      <div className="p-4 flex justify-between items-center">
        <Button onClick={() => alert("Back")}>
          <ArrowLeft />
        </Button>

        <div className="text-center text-sm text-gray-500">
          {isRecording ? (
            <span className="text-red-500 animate-pulse">Recording…</span>
          ) : (
            <span className="text-gray-400">Not recording</span>
          )}
        </div>

        <Button
          onClick={nextQuestion}
          disabled={!canProceed}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Next <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
