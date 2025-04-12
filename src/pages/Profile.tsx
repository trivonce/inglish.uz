import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTelegram } from "@/context/TelegramContext"
import { Award, BarChart3, BookOpen, Calendar, Clock, Settings, Star, Trophy, User, Mic } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const Profile = () => {
  const { user } = useTelegram()

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-800">Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
              {user?.photo_url ? (
                <img
                  src={user.photo_url || "/placeholder.svg"}
                  alt={user.first_name}
                  className="h-20 w-20 rounded-full"
                />
              ) : (
                <User className="h-10 w-10 text-emerald-600" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {user?.first_name || "User"} {user?.last_name || ""}
              </h2>
              <p className="text-gray-600">@{user?.username || "username"}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-medium">
                  Intermediate
                </span>
                <span className="text-gray-500 text-xs">Member since April 2023</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <StatCard icon={<Trophy className="h-5 w-5 text-amber-500" />} value="1,250" label="XP Points" />
        <StatCard icon={<Calendar className="h-5 w-5 text-emerald-500" />} value="15" label="Day Streak" />
        <StatCard icon={<BookOpen className="h-5 w-5 text-blue-500" />} value="120" label="Words Learned" />
        <StatCard icon={<Clock className="h-5 w-5 text-purple-500" />} value="8h 30m" label="Study Time" />
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-emerald-600" />
            Your Progress
          </h3>

          <div className="space-y-4">
            <ProgressItem label="Vocabulary" value={65} level="Intermediate" />
            <ProgressItem label="Grammar" value={48} level="Pre-Intermediate" />
            <ProgressItem label="Speaking" value={72} level="Upper Intermediate" />
            <ProgressItem label="Listening" value={58} level="Intermediate" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-emerald-600" />
            Achievements
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <AchievementItem icon={<Star className="h-6 w-6 text-amber-500" />} title="First Lesson" unlocked={true} />
            <AchievementItem
              icon={<Trophy className="h-6 w-6 text-amber-500" />}
              title="5-Day Streak"
              unlocked={true}
            />
            <AchievementItem icon={<Award className="h-6 w-6 text-amber-500" />} title="Quiz Master" unlocked={true} />
            <AchievementItem icon={<BookOpen className="h-6 w-6 text-gray-400" />} title="100 Words" unlocked={false} />
            <AchievementItem icon={<Mic className="h-6 w-6 text-gray-400" />} title="Speaking Pro" unlocked={false} />
            <AchievementItem
              icon={<Calendar className="h-6 w-6 text-gray-400" />}
              title="30-Day Streak"
              unlocked={false}
            />
          </div>
        </CardContent>
      </Card>

      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">View Detailed Statistics</Button>
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  value: string
  label: string
}

const StatCard = ({ icon, value, label }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="mb-2">{icon}</div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </CardContent>
    </Card>
  )
}

interface ProgressItemProps {
  label: string
  value: number
  level: string
}

const ProgressItem = ({ label, value, level }: ProgressItemProps) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="font-medium">{label}</span>
        <span className="text-sm text-gray-600">{level}</span>
      </div>
      <Progress value={value} className="h-2" />
      <div className="text-right text-xs text-gray-500">{value}%</div>
    </div>
  )
}

interface AchievementItemProps {
  icon: React.ReactNode
  title: string
  unlocked: boolean
}

const AchievementItem = ({ icon, title, unlocked }: AchievementItemProps) => {
  return (
    <div
      className={`flex flex-col items-center text-center p-2 rounded-lg ${
        unlocked ? "bg-amber-50" : "bg-gray-50 opacity-60"
      }`}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs font-medium">{title}</span>
    </div>
  )
}

export default Profile
