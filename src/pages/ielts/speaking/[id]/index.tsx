"use client"

import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mic, BookOpen, Clock, CheckCircle2, AlertCircle } from "lucide-react"

// Topic information mapping
const topicInfo = {
  work: {
    title: "Work & Career",
    description: "Questions about your job, workplace, career aspirations, and work-related experiences.",
    difficulty: "Medium",
    questionTypes: [
      "Your current or past job",
      "Job responsibilities",
      "Work environment",
      "Career choices and plans",
      "Work-life balance",
    ],
    sampleQuestions: [
      "What is your job/what do you do for a living?",
      "Why did you choose this job?",
      "What are the main responsibilities of your job?",
      "What skills are important for your job?",
      "Would you like to change your job in the future?",
    ],
    tips: [
      "Use specific examples from your work experience",
      "Discuss both positive and negative aspects of your job",
      "Use professional vocabulary related to your field",
      "Practice describing your daily routine at work",
    ],
    commonVocabulary: [
      "responsibilities",
      "qualifications",
      "colleagues",
      "challenging",
      "rewarding",
      "deadline",
      "promotion",
      "career path",
    ],
  },
  education: {
    title: "Education",
    description: "Questions about your studies, educational experiences, and learning preferences.",
    difficulty: "Easy",
    questionTypes: [
      "Your current or past studies",
      "School or university experiences",
      "Learning methods and preferences",
      "Educational systems",
      "Future study plans",
    ],
    sampleQuestions: [
      "What are you studying currently?",
      "Why did you choose this subject?",
      "What do you enjoy most about your studies?",
      "Do you prefer to study alone or in a group?",
      "How has education changed in your country in recent years?",
    ],
    tips: [
      "Discuss your educational journey and choices",
      "Compare different learning methods you've experienced",
      "Talk about your favorite subjects and why you enjoy them",
      "Mention any challenges you've faced in your education",
    ],
    commonVocabulary: [
      "curriculum",
      "assignment",
      "lecture",
      "academic",
      "graduate",
      "discipline",
      "semester",
      "research",
    ],
  },
  home: {
    title: "Home & Living",
    description: "Questions about your hometown, accommodation, and living environment.",
    difficulty: "Easy",
    questionTypes: [
      "Your hometown or city",
      "Your accommodation",
      "Neighborhood and local area",
      "Home decoration and design",
      "Living preferences",
    ],
    sampleQuestions: [
      "Where is your hometown located?",
      "What do you like most about your hometown?",
      "Has your hometown changed much in recent years?",
      "Would you recommend your hometown as a place to visit?",
      "Do you think you will continue living in your hometown in the future?",
    ],
    tips: [
      "Describe your hometown using specific landmarks or features",
      "Discuss both advantages and disadvantages of where you live",
      "Compare your hometown to other places you've visited",
      "Talk about changes you've observed over time",
    ],
    commonVocabulary: [
      "accommodation",
      "neighborhood",
      "convenient",
      "facilities",
      "residential",
      "commute",
      "suburban",
      "community",
    ],
  },
  // Add more topics as needed
  default: {
    title: "Speaking Topic",
    description: "General IELTS speaking topic with various question types.",
    difficulty: "Medium",
    questionTypes: [
      "Personal experiences",
      "Opinions and preferences",
      "Comparisons",
      "Past, present and future",
      "Hypothetical situations",
    ],
    sampleQuestions: [
      "Tell me about your experience with this topic.",
      "Why is this topic important to you?",
      "How has this topic changed in recent years?",
      "What aspects of this topic do you find most interesting?",
      "How do you think this topic will develop in the future?",
    ],
    tips: [
      "Use specific examples from your personal experience",
      "Structure your answers with an introduction, main points, and conclusion",
      "Use a variety of vocabulary and grammatical structures",
      "Express your opinions clearly with supporting reasons",
    ],
    commonVocabulary: [
      "perspective",
      "significant",
      "consider",
      "beneficial",
      "drawback",
      "aspect",
      "influence",
      "preference",
    ],
  },
}

const IeltsSpeakingDetail = () => {
  const { topicId } = useParams<{ topicId: string }>()
  const navigate = useNavigate()

  // Get the information for this topic
  const topic = topicId && topicId in topicInfo ? topicInfo[topicId as keyof typeof topicInfo] : topicInfo.default

  const handleBackToTopics = () => {
    navigate("/ielts/speaking")
  }

  const handleStartTest = () => {
    // In a real app, this would navigate to the test page
    // navigate(`/ielts/speaking/${topicId}/test`)
    alert("Starting mock test for: " + topic.title)
  }

  return (
      <>
      <div hidden className="mb-4 flex justify-center">
        <div
          onClick={handleBackToTopics}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 
                    text-emerald-700 rounded-full shadow-sm hover:shadow-md transition-all duration-300 
                    border border-emerald-100 cursor-pointer group"
        >
          <div className="bg-white p-1 rounded-full shadow-sm group-hover:-translate-x-1 transition-transform duration-300">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <span className="font-medium">Back to Topics</span>
        </div>
      </div>
    <div className="space-y-4">

      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">{topic.title}</h1>
        <p className="mb-4">{topic.description}</p>
        <div className="flex items-center gap-2 mb-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium bg-white/20`}>Difficulty: {topic.difficulty}</div>
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-white/20">
            <Clock className="h-4 w-4 inline mr-1" /> 11-14 minutes
          </div>
        </div>
        <Button onClick={handleStartTest} className="bg-white text-emerald-700 hover:bg-gray-100">
          <Mic className="h-4 w-4 mr-2" /> Start Mock Test
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-emerald-600" />
              Question Types
            </h3>
            <ul className="space-y-2">
              {topic.questionTypes.map((type, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" />
                  <span>{type}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-emerald-600" />
              Tips for this Topic
            </h3>
            <ul className="space-y-2">
              {topic.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="min-w-4 text-emerald-600">•</div>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Sample Questions</h3>
          <div className="space-y-3">
            {topic.sampleQuestions.map((question, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-md">
                {index + 1}. {question}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Useful Vocabulary</h3>
          <div className="flex flex-wrap gap-2">
            {topic.commonVocabulary.map((word, index) => (
              <span key={index} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-sm">
                {word}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-4">
        <Button onClick={handleStartTest} className="bg-emerald-600 hover:bg-emerald-700">
          <Mic className="h-4 w-4 mr-2" /> Start Mock Test
        </Button>
      </div>
    </div></>
  )
}

export default IeltsSpeakingDetail
