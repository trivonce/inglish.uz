import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Play, Pause, Download } from "lucide-react"
import { toast } from "sonner"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScoreChart } from "./components/score-chart"
import { OverallScoreCard } from "./components/overall-score-card"
import { QuestionFeedback } from "./components/question-feedback"
import { useSpeakingResult } from "@/features/speaking/hooks"

export default function ResultsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: result, isLoading } = useSpeakingResult(id!);
  const [activeTab, setActiveTab] = useState("overview")
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  console.log(result) 

  // Calculate overall score (average of all band scores)
  const overallScore = result?.feedbacks?.length ? Math.round(
    result.feedbacks.reduce((sum: number, feedback: { bandScore: number }) => sum + feedback.bandScore, 0) / result.feedbacks.length,
  ) : 0;

  // Calculate average scores for each criterion
  const averageScores = result?.feedbacks?.length ? {
    fluency: result.feedbacks.reduce((sum: number, f: { fluency: number }) => sum + f.fluency, 0) / result.feedbacks.length,
    coherence: result.feedbacks.reduce((sum: number, f: { coherence: number }) => sum + f.coherence, 0) / result.feedbacks.length,
    lexicalResource: result.feedbacks.reduce((sum: number, f: { lexicalResource: number }) => sum + f.lexicalResource, 0) / result.feedbacks.length,
    grammaticalRange: result.feedbacks.reduce((sum: number, f: { grammaticalRange: number }) => sum + f.grammaticalRange, 0) / result.feedbacks.length,
    pronunciation: result.feedbacks.reduce((sum: number, f: { pronunciation: number }) => sum + f.pronunciation, 0) / result.feedbacks.length,
  } : {
    fluency: 0,
    coherence: 0,
    lexicalResource: 0,
    grammaticalRange: 0,
    pronunciation: 0,
  };

  // Initialize audio
  useEffect(() => {
    if (result?.audioUrl) {
      setAudio(new Audio(result.audioUrl))
    }

    return () => {
      if (audio) {
        audio.pause()
        audio.src = ""
      }
    }
  }, [result?.audioUrl])

  // Handle audio playback
  const togglePlayback = () => {
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error)
        toast.error("Failed to play audio recording")
      })
    }

    setIsPlaying(!isPlaying)
  }

  // Handle audio events
  useEffect(() => {
    if (!audio) return

    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("ended", handleEnded)
    }
  }, [audio])

  // Handle download recording
  const handleDownload = () => {
    if (!result?.audioUrl) return

    const link = document.createElement("a")
    link.href = result.audioUrl
    link.download = `speaking-test-${result.id}.webm`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.success("Download started")
  }

  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg">Loading your results...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <p className="text-lg text-red-500">Failed to load results</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Speaking Test Results</h1>
            <p className="text-muted-foreground mt-1">
              Topic: {result?.topic?.title || 'Unknown Topic'} • {new Date().toLocaleDateString()}
            </p>
          </div>
          {/* <div className="flex items-center gap-2">
            <Button onClick={togglePlayback} variant="outline" size="sm">
              {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isPlaying ? "Pause Recording" : "Play Recording"}
            </Button>
            <Button onClick={handleDownload} variant="ghost" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div> */}
        </div>
      </motion.div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <OverallScoreCard score={overallScore} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Performance Breakdown</CardTitle>
                  <CardDescription>Your scores across different criteria</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScoreChart scores={averageScores} />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Key Areas for Improvement</CardTitle>
                <CardDescription>Based on your performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Lexical Resource</span>
                    <span className="text-muted-foreground">
                      {Math.round(averageScores.lexicalResource * 10) / 10}/9
                    </span>
                  </div>
                  <Progress value={averageScores.lexicalResource * 11.1} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Expand your vocabulary and use more varied expressions in your responses.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Coherence</span>
                    <span className="text-muted-foreground">{Math.round(averageScores.coherence * 10) / 10}/9</span>
                  </div>
                  <Progress value={averageScores.coherence * 11.1} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Work on organizing your ideas more clearly and using appropriate linking words.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6 mt-6">
          <Accordion type="single" collapsible className="w-full">
            {result?.feedbacks?.length ? result.feedbacks.map((feedback: {
              questionId: string;
              questionText: string;
              bandScore: number;
              fluency: number;
              coherence: number;
              lexicalResource: number;
              grammaticalRange: number;
              pronunciation: number;
              comment: string;
              suggestions: string;
              transcript: string;
            }, index: number) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <span>Question {index + 1}</span>
                    <Badge variant="outline" className="ml-2">
                      {feedback.bandScore}/9
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <QuestionFeedback feedback={feedback} />
                </AccordionContent>
              </AccordionItem>
            )) : (
              <div className="text-center py-4 text-muted-foreground">
                No feedback available
              </div>
            )}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  )
}
