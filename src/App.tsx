import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Welcome from "@/pages/Welcome";
// import Home from "@/pages/Home";
import Games from "@/pages/Games";
import Profile from "@/pages/Profile";
import { TelegramProvider } from "@/context/TelegramContext";

// pages
import IeltsLayout from "./components/layout/IeltsLayout.tsx";
import IeltsSpeaking from "@/pages/ielts/speaking";
import IeltsWriting from "@/pages/ielts/writing";
import IeltsReading from "@/pages/ielts/reading";
import IeltsListening from "@/pages/ielts/listening";
import IeltsPage from "@/pages/ielts";
import AuthPage from "@/pages/auth";
import HomePage from "@/pages/home";
import IeltsSpeakingExam from "@/pages/ielts/speaking/exam";
import IeltsSpeakingTopic from "./pages/ielts/speaking/[id]";

const App = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (hasVisited) {
      setIsFirstVisit(false);
    }
  }, []);

  const handleWelcomeComplete = () => {
    localStorage.setItem("hasVisited", "true");
    setIsFirstVisit(false);
  };

  return (
    <TelegramProvider>
      {isFirstVisit ? (
        <Welcome onComplete={handleWelcomeComplete} />
      ) : (
        <Routes>
          <Route path='/speaking/exam/:id' element={<IeltsSpeakingExam />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="games" element={<Games />} />

            <Route path="ielts" element={<IeltsLayout />}>
              <Route index element={<IeltsPage />} />
              <Route path="speaking" element={<IeltsSpeaking />} />
              <Route path="speaking/topic/:id" element={<IeltsSpeakingTopic />} />
              <Route path="writing" element={<IeltsWriting />} />
              <Route path="reading" element={<IeltsReading />} />
              <Route path="listening" element={<IeltsListening />} />
            </Route>

            <Route path="profile" element={<Profile />} />
            <Route path="auth" element={<AuthPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      )}
    </TelegramProvider>
  );
};

export default App;
