"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  GraduationCap,
  Shuffle,
  Clock,
  Play,
  AlertCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useSpeakingTopics } from "@/features/speaking/hooks";
import { Skeleton } from "@/components/ui/skeleton";

// Define speaking topics with icons
const speakingTopics = [
  {
    id: "work",
    title: "Work & Career",
    icon: <Briefcase className="h-6 w-6" />,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "education",
    title: "Education",
    icon: <GraduationCap className="h-6 w-6" />,
    color: "from-green-400 to-green-600",
  },
];

const IeltsSpeaking = () => {
  const navigate = useNavigate();
  const { data: topics, isLoading } = useSpeakingTopics();

  const handleRandomTopic = () => {
    if (!topics?.length) return;
    const randomIndex = Math.floor(Math.random() * topics.length);
    const randomTopic = topics[randomIndex];
    navigate(`/ielts/speaking/topic/${randomTopic.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-emerald-800">
            IELTS Speaking Topics
          </h1>
          <p className="text-gray-600">
            Select a topic to practice or try a random one
          </p>
        </div>
      </div>

      <div>
        <Button
          onClick={handleRandomTopic}
          className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2 w-full"
          disabled={isLoading || !topics?.length}
        >
          <Shuffle className="h-4 w-4" />
          Random Topic
        </Button>

        <h1 className="font-medium text-lg mt-5 mb-2">Topics</h1>
        
        {isLoading ? (
          <div className="flex flex-col gap-2">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-16" />
                        <Separator className="!h-3" orientation="vertical" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : !topics?.length ? (
          <Card className="border-0 bg-amber-50">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-amber-100 p-3 rounded-full mb-4">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium text-amber-800 mb-2">No Topics Available</h3>
              <p className="text-amber-700 text-sm">
                There are currently no speaking topics available. Please check back later.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-2">
            {topics.map((topic) => (
              <Link onClick={(e) => {e.stopPropagation()}} key={topic.id} to={`/ielts/speaking/topic/${topic.id}`}>
                <Card className="hover:shadow-lg transition-all cursor-pointer overflow-hidden border-0 p-2 flex flex-row justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img className="w-10 h-10 rounded-md" src={topic.icon} />
                    <div className="space-y-1">
                      <h3 className="font-medium text-sm line-clamp-1">{topic.title}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-slate-500">{topic.questionsCount} questions</p>
                        {/* <Separator className="!h-3" orientation="vertical" /> */}
                        {/* <p className="text-xs text-slate-500">{0} users</p> */}
                      </div>
                    </div>
                  </div>
                  <Button variant="secondary" className="">
                    <Play className="text-gray-600" />
                  </Button>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">Ready for your exam?</h3>
            <p className="text-sm">
              Practice makes perfect. Try a new topic every day!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IeltsSpeaking;
