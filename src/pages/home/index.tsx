import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTelegram } from "@/context/TelegramContext"
import { BookOpen, Mic, Trophy, Zap } from "lucide-react"
import { Link } from "react-router-dom"

const HomePage = () => {
  const { user } = useTelegram()

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-emerald-800">Hello, {user?.first_name || "Student"}!</h1>
          <p className="text-gray-600">Ready to improve your English today?</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
          {user?.photo_url ? (
            <img src={user.photo_url || "/placeholder.svg"} alt={user.first_name} className="h-10 w-10 rounded-full" />
          ) : (
            <span className="text-emerald-600 font-bold">{user?.first_name?.charAt(0) || "U"}</span>
          )}
        </div>
      </header>

      <section className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Daily Challenge</h2>
        <p className="mb-4">Complete today's challenge to earn extra points!</p>
        <Button variant="secondary" className="bg-white text-emerald-700 hover:bg-gray-100">
          Start Challenge
        </Button>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Continue Learning</h2>
        <div className="grid grid-cols-2 gap-4">
          <FeatureCard
            title="IELTS Speaking"
            description="Practice for your exam"
            icon={<Mic className="h-6 w-6 text-emerald-600" />}
            to="/ielts-speaking"
          />
          <FeatureCard
            title="Fun Games"
            description="Learn while playing"
            icon={<Zap className="h-6 w-6 text-emerald-600" />}
            to="/games"
          />
          <FeatureCard
            title="Vocabulary"
            description="Expand your word bank"
            icon={<BookOpen className="h-6 w-6 text-emerald-600" />}
            to="/"
          />
          <FeatureCard
            title="Achievements"
            description="Track your progress"
            icon={<Trophy className="h-6 w-6 text-emerald-600" />}
            to="/profile"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <ActivityItem title="IELTS Speaking Practice" time="2 hours ago" score="8/10" />
              <ActivityItem title="Vocabulary Quiz" time="Yesterday" score="15/20" />
              <ActivityItem title="Grammar Challenge" time="2 days ago" score="90%" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  to: string
}

const FeatureCard = ({ title, description, icon, to }: FeatureCardProps) => {
  return (
    <Link to={to}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="mb-2 mt-2">{icon}</div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

interface ActivityItemProps {
  title: string
  time: string
  score: string
}

const ActivityItem = ({ title, time, score }: ActivityItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
      <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-medium">{score}</div>
    </div>
  )
}

export default HomePage
