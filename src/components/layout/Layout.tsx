import { Outlet } from "react-router-dom"
import BottomNavigation from "@/components/navigation/BottomNavigation"
import { useTelegram } from "@/context/TelegramContext"
import { useEffect } from "react"

const Layout = () => {
  const { isAuthenticated, login } = useTelegram()

  useEffect(() => {
    if (!isAuthenticated) {
      login()
    }
  }, [isAuthenticated, login])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50">
      <main className="flex-1 container mx-auto pb-22 px-3 pt-4">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  )
}

export default Layout
