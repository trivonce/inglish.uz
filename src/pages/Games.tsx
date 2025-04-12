import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Construction, Gamepad2 } from "lucide-react"

const Games = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-emerald-800">Games</h1>
        <p className="text-gray-600">Learn English through fun activities</p>
      </header>

      <div className="flex justify-center items-center py-8">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <Construction className="h-16 w-16 text-emerald-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Coming Soon!</h2>
            <p className="text-gray-600 mb-6">
              Our team is working hard to create exciting games to help you learn English. Check back soon for updates!
            </p>
            <div className="flex gap-4">
              <Gamepad2 className="h-12 w-12 text-emerald-400 animate-pulse" />
              <Gamepad2 className="h-12 w-12 text-emerald-500 animate-pulse delay-100" />
              <Gamepad2 className="h-12 w-12 text-emerald-600 animate-pulse delay-200" />
            </div>
            <div className="mt-8">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Get Notified</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Game Previews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GamePreview
            title="Word Match"
            description="Match English words with their meanings"
            image="/placeholder.svg?height=200&width=300"
          />
          <GamePreview
            title="Sentence Builder"
            description="Create correct sentences from word blocks"
            image="/placeholder.svg?height=200&width=300"
          />
          <GamePreview
            title="Pronunciation Hero"
            description="Practice your pronunciation with fun challenges"
            image="/placeholder.svg?height=200&width=300"
          />
          <GamePreview
            title="Grammar Quest"
            description="Adventure through grammar challenges"
            image="/placeholder.svg?height=200&width=300"
          />
        </div>
      </section>
    </div>
  )
}

interface GamePreviewProps {
  title: string
  description: string
  image: string
}

const GamePreview = ({ title, description, image }: GamePreviewProps) => {
  return (
    <Card className="overflow-hidden h-full opacity-70">
      <div className="h-32 overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="mt-2">
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Coming Soon</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default Games
