import type React from "react"
import { NavLink } from "react-router-dom"
import { Home, GamepadIcon, User, BookOpen } from "lucide-react"

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-3 left-3 right-3 rounded-xl bg-white/50 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-around items-center h-16">
          <NavItem to="/" icon={<Home />} label="Home" />
          <NavItem to="/games" icon={<GamepadIcon />} label="Games" />
          <NavItem to="/ielts" icon={<BookOpen />} label="IELTS" />
          <NavItem to="/profile" icon={<User />} label="Profile" />
        </div>
      </div>
    </nav>
  )
}

interface NavItemProps {
  to: string
  icon: React.ReactNode
  label: string
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center w-full py-1 ${
          isActive ? "text-emerald-600 font-medium" : "text-gray-500 hover:text-emerald-500"
        }`
      }
    >
      <div className="w-6 h-6">{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  )
}

export default BottomNavigation
