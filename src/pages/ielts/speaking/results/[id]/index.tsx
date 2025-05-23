import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScoreChart } from "./components/score-chart"
import { OverallScoreCard } from "./components/overall-score-card"
import { QuestionFeedback } from "./components/question-feedback"
import { useSpeakingResult } from "@/features/speaking/hooks"


function roundToNearest(value: number, step: number) {
  return Math.round(value / step) * step;
}

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
    fluency: Math.round(result.feedbacks.reduce((sum: number, f: { fluency: number }) => sum + f.fluency, 0) / result.feedbacks.length),
    coherence: Math.round(result.feedbacks.reduce((sum: number, f: { coherence: number }) => sum + f.coherence, 0) / result.feedbacks.length),
    lexicalResource: Math.round(result.feedbacks.reduce((sum: number, f: { lexicalResource: number }) => sum + f.lexicalResource, 0) / result.feedbacks.length),
    grammaticalRange: Math.round(result.feedbacks.reduce((sum: number, f: { grammaticalRange: number }) => sum + f.grammaticalRange, 0) / result.feedbacks.length),
    pronunciation: Math.round(result.feedbacks.reduce((sum: number, f: { pronunciation: number }) => sum + f.pronunciation, 0) / result.feedbacks.length),
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

  // Show loading toast while processing
  useEffect(() => {
    if (result?.status === 'PENDING') {
      const toastId = toast.loading("Processing your speaking test...", {
        duration: Infinity,
      });

      return () => {
        toast.dismiss(toastId);
      };
    } else if (result?.status === 'COMPLETED') {
      toast.success("Results are ready!");
    } else if (result?.status === 'FAILED') {
      toast.error("Failed to process your speaking test");
    } else if (result?.status === 'TOO_SHORT') {
      toast.error("Your recording was too short");
    }
  }, [result?.status]);

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

  if (result.status === 'PENDING') {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-medium">Processing your speaking test</h2>
          <p className="text-muted-foreground">This may take a few minutes. Please wait while we analyze your responses.</p>
        </div>
      </div>
    )
  }

  if (result.status === 'TOO_SHORT') {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium">Recording Too Short</h2>
          <p className="text-muted-foreground">Your recording was too short to be analyzed. Please try again with a longer response.</p>
          <div className="pt-4">
            <Link to={`/ielts/speaking/topic/${result?.topic?.id}`}>
            <Button 
              variant="outline"
              className="text-amber-600 border-amber-200 hover:bg-amber-50"
            >
              Try Again
            </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (result.status === 'FAILED') {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium">Processing Failed</h2>
          <p className="text-muted-foreground">We couldn't process your recording. This might be due to technical issues or poor audio quality.</p>
          <div className="pt-4 space-x-4">
            {/* <Button 
              variant="outline" 
              onClick={() => window.location.href = '/ielts/speaking'}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Try Again
            </Button> */}
            <a href="https://t.me/trivonce">
            <Button 
              variant="outline"
              className="text-gray-600 border-gray-200 hover:bg-gray-50"
            >
              Contact Support
            </Button>
            </a>

          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container space-y-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Speaking Test Results</h1>
            <p className="text-muted-foreground mt-1">
              Topic: {result?.topic?.title || 'Unknown Topic'} • {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </motion.div>


          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <OverallScoreCard score={roundToNearest(Number(result?.bandScore), 0.5) || 0} />
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
            </motion.div> */}
          </div>

          <Accordion type="single" collapsible className="w-full bg-white rounded-md">
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
              <AccordionItem className="px-4" key={index} value={`item-${index}`}>
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

          {/* <motion.div
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
          </motion.div> */}
    </div>
  )
}
