"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  BookOpen,
  Calendar,
  ChevronLeft,
  Download,
  FileText,
  Filter,
  Headphones,
  Mic,
  Pencil,
  TrendingUp,
} from "lucide-react"
import {Link} from "react-router-dom"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for IELTS results
const mockIeltsResults = [
  {
    id: "ielts-1",
    date: "2023-12-15",
    type: "IELTS Academic",
    overall: 6.5,
    listening: 7.0,
    reading: 6.5,
    writing: 6.0,
    speaking: 6.5,
    feedback: {
      listening: "Good comprehension of main ideas. Work on understanding specific details in longer passages.",
      reading: "Strong on skimming and scanning. Need to improve inference skills.",
      writing: "Task achievement is good. Work on cohesion and coherence.",
      speaking: "Fluent with good pronunciation. Expand vocabulary for complex topics.",
    },
  },
  {
    id: "ielts-2",
    date: "2024-03-10",
    type: "IELTS General",
    overall: 7.0,
    listening: 7.5,
    reading: 7.0,
    writing: 6.5,
    speaking: 7.0,
    feedback: {
      listening: "Improved detail recognition. Continue practicing with different accents.",
      reading: "Good progress on inference. Work on matching headings to paragraphs.",
      writing: "Better coherence. Focus on task response for Task 2.",
      speaking: "Good fluency and range. Work on discussing abstract topics.",
    },
  },
]

// Mock data for other test results
const mockOtherResults = [
  {
    id: "toefl-1",
    date: "2023-11-05",
    type: "TOEFL iBT",
    overall: 92,
    reading: 24,
    listening: 25,
    speaking: 22,
    writing: 21,
  },
  {
    id: "duolingo-1",
    date: "2024-01-20",
    type: "Duolingo English Test",
    overall: 120,
    literacy: 125,
    comprehension: 115,
    conversation: 120,
    production: 120,
  },
]

// Mock data for progress chart
const progressData = [
  { date: "Oct 2023", listening: 6.0, reading: 5.5, writing: 5.5, speaking: 6.0 },
  { date: "Dec 2023", listening: 7.0, reading: 6.5, writing: 6.0, speaking: 6.5 },
  { date: "Mar 2024", listening: 7.5, reading: 7.0, writing: 6.5, speaking: 7.0 },
]

const ResultsPage = () => {
  const [selectedExam, setSelectedExam] = useState(mockIeltsResults[1])
  const [filterType, setFilterType] = useState("all")

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-emerald-800">My Results</h1>
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tests</SelectItem>
              <SelectItem value="ielts">IELTS Only</SelectItem>
              <SelectItem value="other">Other Tests</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Overall Summary Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Overall Progress
              </h2>
              <p className="text-gray-600 mt-1">Your English proficiency is improving steadily</p>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-600">Current IELTS Score</div>
                  <div className="text-3xl font-bold text-emerald-700">{selectedExam.overall}</div>
                  <Badge className="mt-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                    +0.5 from last test
                  </Badge>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">CEFR Level</div>
                  <div className="text-3xl font-bold text-emerald-700">B2</div>
                  <div className="text-sm text-gray-600 mt-1">Upper Intermediate</div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <ChartContainer
                config={{
                  listening: {
                    label: "Listening",
                    color: "hsl(var(--chart-1))",
                  },
                  reading: {
                    label: "Reading",
                    color: "hsl(var(--chart-2))",
                  },
                  writing: {
                    label: "Writing",
                    color: "hsl(var(--chart-3))",
                  },
                  speaking: {
                    label: "Speaking",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 9]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="listening" fill="var(--color-listening)" />
                    <Bar dataKey="reading" fill="var(--color-reading)" />
                    <Bar dataKey="writing" fill="var(--color-writing)" />
                    <Bar dataKey="speaking" fill="var(--color-speaking)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Test Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-600" />
            Recent Test Results
          </CardTitle>
          <CardDescription>Select a test to view detailed results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockIeltsResults.map((result) => (
              <div
                key={result.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedExam.id === result.id
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedExam(result)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{result.type}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(result.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Overall Score</div>
                    <div className="text-xl font-bold text-emerald-700">{result.overall}</div>
                  </div>
                </div>
              </div>
            ))}

            {mockOtherResults.map((result) => (
              <div
                key={result.id}
                className="p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{result.type}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(result.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Overall Score</div>
                    <div className="text-xl font-bold text-emerald-700">{result.overall}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-600" />
            Detailed Results for {selectedExam.type}
          </CardTitle>
          <CardDescription>
            Test taken on{" "}
            {new Date(selectedExam.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="listening">Listening</TabsTrigger>
              <TabsTrigger value="reading">Reading</TabsTrigger>
              <TabsTrigger value="writing">Writing</TabsTrigger>
              <TabsTrigger value="speaking">Speaking</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ScoreCard
                  title="Listening"
                  score={selectedExam.listening}
                  icon={<Headphones className="h-5 w-5 text-blue-500" />}
                  color="blue"
                />
                <ScoreCard
                  title="Reading"
                  score={selectedExam.reading}
                  icon={<BookOpen className="h-5 w-5 text-purple-500" />}
                  color="purple"
                />
                <ScoreCard
                  title="Writing"
                  score={selectedExam.writing}
                  icon={<Pencil className="h-5 w-5 text-amber-500" />}
                  color="amber"
                />
                <ScoreCard
                  title="Speaking"
                  score={selectedExam.speaking}
                  icon={<Mic className="h-5 w-5 text-emerald-500" />}
                  color="emerald"
                />
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Score Breakdown</h3>
                <div className="space-y-4">
                  <SkillBreakdown
                    title="Listening"
                    score={selectedExam.listening}
                    color="blue"
                    skills={[
                      { name: "Understanding main ideas", score: 75 },
                      { name: "Recognizing specific details", score: 70 },
                      { name: "Following arguments", score: 65 },
                      { name: "Understanding different accents", score: 60 },
                    ]}
                  />
                  <SkillBreakdown
                    title="Reading"
                    score={selectedExam.reading}
                    color="purple"
                    skills={[
                      { name: "Skimming and scanning", score: 80 },
                      { name: "Understanding main ideas", score: 75 },
                      { name: "Inference skills", score: 65 },
                      { name: "Vocabulary range", score: 70 },
                    ]}
                  />
                  <SkillBreakdown
                    title="Writing"
                    score={selectedExam.writing}
                    color="amber"
                    skills={[
                      { name: "Task achievement", score: 70 },
                      { name: "Coherence and cohesion", score: 65 },
                      { name: "Lexical resource", score: 60 },
                      { name: "Grammatical range", score: 65 },
                    ]}
                  />
                  <SkillBreakdown
                    title="Speaking"
                    score={selectedExam.speaking}
                    color="emerald"
                    skills={[
                      { name: "Fluency and coherence", score: 75 },
                      { name: "Lexical resource", score: 70 },
                      { name: "Grammatical range", score: 65 },
                      { name: "Pronunciation", score: 70 },
                    ]}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="listening" className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Headphones className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Listening Score: {selectedExam.listening}</h3>
                  <p className="text-gray-600 mt-1">
                    Your listening skills are at an upper-intermediate level. You can understand most conversations and
                    lectures at normal speed.
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Feedback & Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{selectedExam.feedback.listening}</p>
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Recommended Practice:</h4>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Listen to academic lectures and take detailed notes</li>
                      <li>Practice with different English accents (British, American, Australian)</li>
                      <li>Complete 3-4 IELTS listening practice tests</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Strengths</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <p>Good at understanding main ideas</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <p>Can follow conversations at normal speed</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <p>Strong comprehension of familiar topics</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Areas to Improve</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <p>Understanding specific details in longer passages</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <p>Following complex arguments and discussions</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <p>Understanding unfamiliar accents</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reading" className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Reading Score: {selectedExam.reading}</h3>
                  <p className="text-gray-600 mt-1">
                    Your reading skills are at an upper-intermediate level. You can understand most academic texts and
                    extract key information.
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Feedback & Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{selectedExam.feedback.reading}</p>
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Recommended Practice:</h4>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Read academic articles and practice summarizing them</li>
                      <li>Practice identifying the main ideas in complex texts</li>
                      <li>Work on inference and prediction skills</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="writing" className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Pencil className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Writing Score: {selectedExam.writing}</h3>
                  <p className="text-gray-600 mt-1">
                    Your writing skills are at an intermediate level. You can express ideas clearly but need to work on
                    organization and complexity.
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Feedback & Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{selectedExam.feedback.writing}</p>
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Recommended Practice:</h4>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Practice writing essays with clear structure (introduction, body, conclusion)</li>
                      <li>Work on using a wider range of vocabulary and complex sentences</li>
                      <li>Review and practice using linking words for better coherence</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="speaking" className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Mic className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Speaking Score: {selectedExam.speaking}</h3>
                  <p className="text-gray-600 mt-1">
                    Your speaking skills are at an upper-intermediate level. You can communicate effectively on a range
                    of topics with good fluency.
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Feedback & Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{selectedExam.feedback.speaking}</p>
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Recommended Practice:</h4>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Practice speaking on abstract topics for 2-3 minutes</li>
                      <li>Record yourself speaking and analyze your pronunciation</li>
                      <li>Expand vocabulary for discussing complex ideas</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Recommended Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-emerald-600" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RecommendationCard
              title="Improve Writing Skills"
              description="Focus on coherence and task response in essays"
              icon={<Pencil className="h-5 w-5 text-amber-500" />}
              actionText="Start Writing Course"
              href="/courses/writing"
            />
            <RecommendationCard
              title="Practice Listening"
              description="Work on understanding specific details in conversations"
              icon={<Headphones className="h-5 w-5 text-blue-500" />}
              actionText="Try Listening Exercises"
              href="/exercises/listening"
            />
            <RecommendationCard
              title="Take Mock Test"
              description="Assess your progress with a full practice test"
              icon={<FileText className="h-5 w-5 text-emerald-500" />}
              actionText="Start Mock Test"
              href="/mock-tests"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface ScoreCardProps {
  title: string
  score: number
  icon: React.ReactNode
  color: string
}

const ScoreCard = ({ title, score, icon, color }: ScoreCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`bg-${color}-100 p-2 rounded-full`}>{icon}</div>
          <div>
            <div className="text-sm font-medium">{title}</div>
            <div className="text-2xl font-bold">{score}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface SkillBreakdownProps {
  title: string
  score: number
  color: string
  skills: { name: string; score: number }[]
}

const SkillBreakdown = ({ title, score, color, skills }: SkillBreakdownProps) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium">{title}</h4>
        <div className={`text-${color}-600 font-bold`}>{score}</div>
      </div>
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{skill.name}</span>
              <span>{skill.score}%</span>
            </div>
            <Progress value={skill.score} className={`h-1.5 bg-${color}-100`} />
          </div>
        ))}
      </div>
    </div>
  )
}

interface RecommendationCardProps {
  title: string
  description: string
  icon: React.ReactNode
  actionText: string
  href: string
}

const RecommendationCard = ({ title, description, icon, actionText, href }: RecommendationCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-emerald-100 p-2 rounded-full">{icon}</div>
          <div>
            <h4 className="font-medium">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <Link to={href}>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">{actionText}</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default ResultsPage
