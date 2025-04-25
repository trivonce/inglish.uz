import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSpeakingTopic } from "@/features/speaking/hooks";
import { usePersistentRecorder } from "@/hooks/usePersistentRecorder";
import { useExamStart } from "@/hooks/useExamStart";
import ReadyPrompt from "@/pages/ielts/speaking/exam/components/ReadyPrompt";
import { showAlert } from "@/lib/alert";
import { useSubmitSpeakingAnswers } from "@/features/speaking/hooks";

// components
import TopBar from "./components/TopBar";
import QuestionContent from "./components/QuestionContent";
import BottomControls from "./components/BottomControls";
import SubmitLoadingScreen from "./components/SubmitLoadingScreen";
import { useTelegramStore } from "@/store/useTelegramStore";

export default function IeltsSpeakingExam() {
  const { id } = useParams<{ id: string }>();
  const { data: topic } = useSpeakingTopic(id!);
  const submitMutation = useSubmitSpeakingAnswers();
  const { user} = useTelegramStore()
  const navigate = useNavigate()

  const [currentPart, setCurrentPart] = useState<1 | 2 | 3>(1);
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

  const currentQuestion = topic?.questions.find(
    q => q.partNumber === currentPart && q.order === currentIndex + 1
  );

  useEffect(() => {
    if (isStarted && currentQuestion && !isRecording) {
      start();
    }
  }, [isStarted, currentQuestion]);

  useEffect(() => {
    console.log('Current question:', currentQuestion);
    console.log('Audio URL:', currentQuestion?.audios?.[0]?.audioUrl);
    
    if (!currentQuestion?.audios?.[0]?.audioUrl || !isStarted) {
      console.log('Skipping audio playback - missing URL or not started');
      return;
    }

    const audio = new Audio(currentQuestion.audios[0].audioUrl);
    console.log('Created audio element');
    
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });

    audio.onended = () => {
      console.log('Audio ended');
      markStart(currentQuestion.id);
      setTimeout(() => setCanProceed(true), 4000);
    };

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [currentQuestion?.audios, isStarted]);

  
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
    formData.append("topicId", id!);
    // formData.append("telegramId", user?.id.toString() || "");
    formData.append("telegramId", "5166960259");
  
    submitMutation.mutate(formData, {
      onSuccess: (data) => {
        window.location.href = `/ielts/speaking/results/${data.speakingAnswerId}`;
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
  
    const currentPartQuestions = topic?.questions.filter(q => q.partNumber === currentPart) || [];
    const nextIndex = currentIndex + 1;
  
    if (nextIndex < currentPartQuestions.length) {
      setCurrentIndex(nextIndex);
    } else if (currentPart === 1) {
      setCurrentPart(2);
      setCurrentIndex(0);
    } else if (currentPart === 2) {
      setCurrentPart(3);
      setCurrentIndex(0);
    } else {
      stop();
      setIsFinished(true);
    }
  };

  console.log(audioBlob, timings)

  const handleLeaveExam = async () => {
    const result = await showAlert({
      title: "Leave Exam?",
      text: `Your progress will be lost. Are you sure you want to leave?`,
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
      onGoBack={() => navigate(-1)}
        onAllow={async () => {
          await requestPermission();
          if (!error) {
            await start();
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
      <TopBar part={`Part ${currentPart}`} />
      {currentQuestion && (
        <QuestionContent index={currentIndex} text={currentQuestion.text} bullets={currentQuestion.bullets} />
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
