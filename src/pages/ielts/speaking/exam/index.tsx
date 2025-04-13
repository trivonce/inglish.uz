import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSpeakingTopic } from "@/features/speaking/hooks";
import { usePersistentRecorder } from "@/hooks/usePersistentRecorder";
import { useExamStart } from "@/hooks/useExamStart";
import ReadyPrompt from "@/components/ReadyPrompt";
import { showAlert } from "@/lib/alert";
import { useSubmitSpeakingAnswers } from "@/features/speaking/hooks";

// components
import TopBar from "./components/TopBar";
import QuestionContent from "./components/QuestionContent";
import BottomControls from "./components/BottomControls";
import SubmitLoadingScreen from "./components/SubmitLoadingScreen";

export default function IeltsSpeakingExam() {
  const { id } = useParams<{ id: string }>();
  const { data: topic } = useSpeakingTopic(id!);
  const submitMutation = useSubmitSpeakingAnswers(id!);

  const [currentPart, setCurrentPart] = useState<"part1" | "part2" | "part3">("part1");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isStarted, error, requestPermission } = useExamStart();
  const {
    isRecording,
    start,
    stop,
    clear,
    audioBlob,
    timings,
    markStart,
    markEnd,
  } = usePersistentRecorder();

  const currentQuestion: any = topic?.questions?.[currentPart]?.[currentIndex];

  useEffect(() => {
    if (isStarted && currentQuestion && !isRecording) {
      start();
    }
  }, [isStarted, currentQuestion]);

  useEffect(() => {
    if (!currentQuestion?.audio || !isStarted) return;

    const audio = new Audio(currentQuestion.audio);
    audio.play();

    audio.onended = () => {
      markStart(currentPart, currentIndex);
      setTimeout(() => setCanProceed(true), 5000);
    };

    return () => audio.pause();
  }, [currentQuestion?.audio, isStarted]);

  
  const handleSubmitResults = () => {
    console.log('sending')
    console.log(audioBlob, timings)
    if (!audioBlob || timings.length === 0) {
      console.warn("Audio or timings not ready");

      return
    }
  
    setIsSubmitting(true);
  
    const formData = new FormData();
    formData.append("audio", audioBlob);
    formData.append("timings", JSON.stringify(timings));
    formData.append("telegramId", "5166960259"); // trivonce
  
    submitMutation.mutate(formData, {
      onSuccess: (data) => {
        window.location.href = `/ielts/speaking/result/${data.submissionId}`;
      },
      onError: (error) => {
        console.error(error);
        alert("❌ Failed to submit. Please try again.");
        setIsSubmitting(false);
      },
    });
  };
  
  useEffect(() => {
    if (isFinished && audioBlob && timings.length > 0 && !isSubmitting) {
      console.log("🎯 Submitting now...");
      handleSubmitResults();
    }
  }, [isFinished, audioBlob, timings]);

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
      setIsFinished(true);

      console.log('Exam is Finished')
    }
  };

  console.log(audioBlob, timings)

  const handleLeaveExam = async () => {
    const result = await showAlert({
      title: "Leave Exam?",
      text: `Your progress (answers and audio for ${currentIndex + 1} question(s)) will be lost. Are you sure you want to leave?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, leave",
      cancelButtonText: "Cancel",
    });

    
  
    if (result.isConfirmed) {
      await clear();
      stop();
  
      const deleteRequest = indexedDB.deleteDatabase("keyval-store");
  
      deleteRequest.onsuccess = () => {
        console.log("✅ IndexedDB deleted successfully");
        window.location.href = "/ielts/speaking";
      };
  
      deleteRequest.onerror = (e) => {
        console.error("❌ Error deleting IndexedDB", e);
        window.location.href = "/ielts/speaking";
      };
  
      deleteRequest.onblocked = () => {
        console.warn("⚠️ IndexedDB deletion blocked — maybe another tab is using it");
        window.location.href = "/ielts/speaking";
      };
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

  if (isFinished || isSubmitting) {
    return <SubmitLoadingScreen />;
  }
  
  return (
    <div className="h-screen flex flex-col justify-between">
      <TopBar part={currentPart} />
      {currentQuestion && (
        <QuestionContent index={currentIndex} text={currentQuestion.text} />
      )}
      <BottomControls
        onLeave={handleLeaveExam}
        onNext={nextQuestion}
        canProceed={canProceed}
        isRecording={isRecording}
      />
    </div>
  );
}
