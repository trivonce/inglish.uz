"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
      photo_url?: string
    }
  }
  ready: () => void
  expand: () => void
  close: () => void
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    isProgressVisible: boolean
    show: () => void
    hide: () => void
    enable: () => void
    disable: () => void
    showProgress: (leaveActive: boolean) => void
    hideProgress: () => void
    setText: (text: string) => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
  }
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

interface TelegramContextType {
  telegramApp: TelegramWebApp | null
  user: {
    id: number
    first_name: string
    last_name?: string
    username?: string
    language_code?: string
    photo_url?: string
  } | null
  isAuthenticated: boolean
  login: () => void
}

const TelegramContext = createContext<TelegramContextType>({
  telegramApp: null,
  user: null,
  isAuthenticated: false,
  login: () => {},
})

export const useTelegram = () => useContext(TelegramContext)

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  const [telegramApp, setTelegramApp] = useState<TelegramWebApp | null>(null)
  const [user, setUser] = useState<TelegramContextType["user"]>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tgApp = window.Telegram.WebApp
      setTelegramApp(tgApp)

      // If user data is available in Telegram WebApp
      if (tgApp.initDataUnsafe.user) {
        setUser(tgApp.initDataUnsafe.user)
        setIsAuthenticated(true)
      }

      // Tell Telegram WebApp that we are ready
      tgApp.ready()
    }
  }, [])

  const login = () => {
    // In a real app, you would implement proper Telegram authentication
    // For demo purposes, we're simulating a successful login
    if (telegramApp) {
      // In a real implementation, you would validate the auth data with your backend
      setIsAuthenticated(true)

      // Mock user data if not available from Telegram
      if (!user) {
        setUser({
          id: 123456789,
          first_name: "Demo",
          username: "demo_user",
          photo_url: "/placeholder.svg?height=100&width=100",
        })
      }
    }
  }

  return (
    <TelegramContext.Provider value={{ telegramApp, user, isAuthenticated, login }}>
      {children}
    </TelegramContext.Provider>
  )
}
