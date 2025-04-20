import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Welcome from "@/pages/Welcome";
// import Home from "@/pages/Home";
import Profile from "@/pages/profile";
import { TelegramProvider } from "@/context/TelegramContext";

// pages
import IeltsLayout from "@/components/layout/IeltsLayout";
import IeltsSpeaking from "@/pages/ielts/speaking";
import IeltsWriting from "@/pages/ielts/writing";
import IeltsReading from "@/pages/ielts/reading";
import IeltsListening from "@/pages/ielts/listening";
import IeltsPage from "@/pages/ielts";
import GamesPage from "@/pages/games";
import AuthPage from "@/pages/auth";
import HomePage from "@/pages/home";

// ielts speaking
import IeltsSpeakingExam from "@/pages/ielts/speaking/exam";
import IeltsSpeakingResults from "@/pages/ielts/speaking/results";
import IeltsSpeakingTopic from "@/pages/ielts/speaking/[id]";
import IeltsSpeakingResult from "@/pages/ielts/speaking/results/[id]";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTelegramStore } from "./store/useTelegramStore";

const App = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const { setUser, user } = useTelegramStore();

  const queryClient = new QueryClient()

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
  // comment

  useEffect(() => {
    console.log('window', window)
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    } else {
      console.error("Telegram WebApp not found.");
    }
  }, []);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
  
    if (!tg) {
      console.warn("❌ Telegram WebApp not found.");
      return;
    }
  
    tg.ready(); 
  
    const user = tg.initDataUnsafe?.user;
  
    if (user) {
      setUser(user);
    } else {
      console.warn("⚠️ No Telegram user found in initDataUnsafe.");
    }
  }, []);

// if (true) {
//   import("eruda").then((eruda) => {
//     eruda.default.init();
//   });
// }

  return (
    <QueryClientProvider client={queryClient}>
      <TelegramProvider>
        {isFirstVisit ? (
          <Welcome onComplete={handleWelcomeComplete} />
        ) : (
          <Routes>
            <Route path="/speaking/exam/:id" element={<IeltsSpeakingExam />} />

            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="games" element={<GamesPage />} />

              <Route path="ielts" element={<IeltsLayout />}>
                <Route index element={<IeltsPage />} />
                <Route path="speaking" element={<IeltsSpeaking />} />
                <Route
                  path="speaking/topic/:id"
                  element={<IeltsSpeakingTopic />}
                />
                <Route
                  path="speaking/results"
                  element={<IeltsSpeakingResults />}
                />
                <Route
                  path="speaking/results/:id"
                  element={<IeltsSpeakingResult />}
                />
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
    </QueryClientProvider>
  );
};

export default App;
