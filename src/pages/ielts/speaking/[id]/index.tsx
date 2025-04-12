"use client";

import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Mic,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useSpeakingTopic } from "@/features/speaking/hooks";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SpeakingTopic } from "@/features/speaking/types";
import { showAlert } from '@/lib/alert';

const IeltsSpeakingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: topic, isLoading } = useSpeakingTopic(id as string);
  const navigate = useNavigate();

  const handleBackToTopics = () => {
    navigate("/ielts/speaking");
  };

  const handleStartTest = async () => {
    const result = await showAlert({
      title: 'Start speaking test?',
      text: 'This will begin your IELTS Speaking mock test.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, start',
      cancelButtonText: 'Cancel'
    });
    // In a real app, this would navigate to the test page
    if (result.isConfirmed) {
      navigate(`/speaking/exam/${id}`);
    }
  };

  if (isLoading || !topic) return <div>Loading...</div>;

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
          {/* <div className="flex items-center gap-2 mb-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium bg-white/20`}>Difficulty: {topic.difficulty}</div>
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-white/20">
            <Clock className="h-4 w-4 inline mr-1" /> 11-14 minutes
          </div>
        </div> */}
          <Button
            onClick={handleStartTest}
            className="bg-white text-emerald-700 hover:bg-gray-100"
          >
            <Mic className="h-4 w-4 mr-2" /> Start Mock Test
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-emerald-600" />
                Questions by Part
              </h3>

              <Accordion type="multiple" className="w-full space-y-2">
                {["part1", "part2", "part3"].map((partKey) => {
                  const questions =
                    topic.questions?.[
                      partKey as keyof SpeakingTopic["questions"]
                    ] || [];
                  if (!questions.length) return null;

                  return (
                    <AccordionItem key={partKey} value={partKey}>
                      <AccordionTrigger className="capitalize">
                        {partKey.replace("part", "Part ")}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-3">
                          {questions.map((q, index) => (
                            <li
                              key={index}
                              className="bg-gray-100 rounded-md p-3"
                            >
                              <strong>{index + 1}. </strong>
                              {q.text}
                              {(q.bulletPoints as string[])?.length > 0 && (
                                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700">
                                  {q.bulletPoints?.map(
                                    (point: string, i: number) => (
                                      <li key={i}>{point}</li>
                                    )
                                  )}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>

          {/* <Card>
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
        </Card> */}
        </div>

        {/* <Card>
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
      </Card> */}

        <div className="flex justify-center mt-4">
          <Button
            onClick={handleStartTest}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Mic className="h-4 w-4 mr-2" /> Start Mock Test
          </Button>
        </div>
      </div>
    </>
  );
};

export default IeltsSpeakingDetail;
