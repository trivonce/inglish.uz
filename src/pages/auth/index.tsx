"use client"

import type React from "react"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTelegram } from "@/context/TelegramContext"
import { MessageCircle, Lock, Shield, Sparkles } from "lucide-react"

export default function AuthPage() {
  const { isAuthenticated, login } = useTelegram()
  const navigate = useNavigate()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  const handleTelegramAuth = () => {
    // Call the login function from the Telegram context
    login()

    // In a real implementation with Telegram Mini Apps, you would use:
    // if (telegramApp) {
    //   telegramApp.expand() // Expand the mini app if needed
    // }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-teal-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-4">
            <MessageCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-emerald-800">Inglish.uz</h1>
          <p className="text-gray-600 mt-2">Your journey to English fluency starts here</p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-center mb-6">Welcome to Inglish.uz</h2>

            <p className="text-center text-gray-600 mb-8">
              Please authorize with Telegram to access all features and track your progress.
            </p>

            <Button
              onClick={handleTelegramAuth}
              className="w-full bg-[#0088cc] hover:bg-[#0077b5] flex items-center justify-center gap-2 py-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              Authorize with Telegram
            </Button>

            <div className="mt-8 space-y-4">
              <FeatureItem
                icon={<Shield className="h-5 w-5 text-emerald-600" />}
                title="Secure Login"
                description="Your data is protected with Telegram's security"
              />
              <FeatureItem
                icon={<Lock className="h-5 w-5 text-emerald-600" />}
                title="Privacy First"
                description="We only access the information you allow"
              />
              <FeatureItem
                icon={<Sparkles className="h-5 w-5 text-emerald-600" />}
                title="Personalized Experience"
                description="Track your progress and get customized lessons"
              />
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-gray-500 text-sm mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

interface FeatureItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureItem = ({ icon, title, description }: FeatureItemProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-emerald-50 p-2 rounded-full">{icon}</div>
      <div>
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}
