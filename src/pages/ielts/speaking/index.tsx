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
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

  const handleSelectTopic = (topicId: string) => {
    navigate(`/ielts/speaking/${topicId}`);
  };

  const handleRandomTopic = () => {
    const randomIndex = Math.floor(Math.random() * speakingTopics.length);
    const randomTopic = speakingTopics[randomIndex];
    navigate(`/ielts/speaking/${randomTopic.id}`);
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
        >
          <Shuffle className="h-4 w-4" />
          Random Topic
        </Button>

        <h1 className="font-medium text-lg mt-5 mb-2"> Topics</h1>
        <div className="flex flex-col gap-2">
          {speakingTopics.map((topic) => (
            <Link to={`/ielts/speaking/topic/${topic.id}`}>
              <Card
                key={topic.id}
                className="hover:shadow-lg transition-all cursor-pointer overflow-hidden border-0 p-2 flex flex-row justify-between items-center"
                onClick={() => handleSelectTopic(topic.id)}
              >
                <div className={`flex items-center gap-3 `}>
                  <div
                    className={`bg-gradient-to-br ${topic.color} flex justify-center items-center text-white p-2 rounded-md`}
                  >
                    <div className="transform hover:scale-110 transition-transform duration-200">
                      {topic.icon}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-sm">{topic.title}</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-slate-500">18 questions</p>
                      <Separator className="!h-3" orientation="vertical" />
                      <p className="text-xs text-slate-500">2000 users</p>
                    </div>
                  </div>
                </div>
                <Button variant="secondary" className="">
                  <Play className=" text-gray-600" />
                </Button>
              </Card>
            </Link>
          ))}
        </div>
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
