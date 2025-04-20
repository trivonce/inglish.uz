"use client";

import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  ChevronRight,
  BarChart3,
  Trophy,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function IeltsPage() {

  const ieltsSkills = [
    {
      id: "speaking",
      title: "Speaking",
      icon: <Mic className="h-8 w-8 text-emerald-600" />,
      description: "Practice your English speaking skills with mock tests",
      available: true,
    },
    {
      id: "reading",
      title: "Reading",
      icon: <BookOpen className="h-8 w-8 text-emerald-600" />,
      description: "Improve your ability to read and understand academic texts",
      available: false,
    },
    {
      id: "listening",
      title: "Listening",
      icon: <Headphones className="h-8 w-8 text-emerald-600" />,
      description: "Enhance your skills in understanding spoken English",
      available: false,
    },
    {
      id: "writing",
      title: "Writing",
      icon: <PenTool className="h-8 w-8 text-emerald-600" />,
      description: "Develop your written English for academic purposes",
      available: false,
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-emerald-800">
          IELTS Preparation
        </h1>
        <p className="text-gray-600">
          Master all four skills for IELTS success
        </p>
      </header>

      <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute right-0 top-0 opacity-10">
            <Trophy className="h-32 w-32 -mr-6 -mt-6" />
          </div>
          <h2 className="text-xl font-bold mb-2">Your IELTS Journey</h2>
          <p className="mb-4 max-w-md">
            Track your progress across all four IELTS skills and improve your
            overall band score.
          </p>
          {/* <div className="flex items-center gap-2 text-sm">
            <div className="bg-white/20 px-3 py-1 rounded-full">
              Current Score: 6.5
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full">
              Target: 7.5
            </div>
          </div> */}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        {ieltsSkills.map((skill) => (
          <Link className="relative" to={skill.available ? skill.id : ""}>
            {!skill.available && <div className="absolute top-0 left-0 w-full h-full bg-black/10 rounded-xl backdrop-blur-xs">
              <div className="animate-shake flex flex-col items-center gap-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/50 rounded-md px-2 py-3 text-nowrap text-green-500 text-sm font-bold">
               <Lock className="" /> Coming Soon
              </div>
            </div>}
            <Card
              key={skill.id}
              className="hover:shadow-md transition-all cursor-pointer border-b-4 p-0"
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-start gap-4">
                  <div className="bg-emerald-50 p-3 rounded-lg">
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-lg">{skill.title}</h3>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-emerald-600" />
              Your Recent Practice
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-emerald-600 text-xs"
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            <PracticeItem
              title="Reading Test 3"
              score="28/40"
              date="2 days ago"
              bandScore="6.5"
              icon={<BookOpen className="h-4 w-4" />}
            />
            <PracticeItem
              title="Speaking Mock Interview"
              score="Good"
              date="5 days ago"
              bandScore="7.0"
              icon={<Mic className="h-4 w-4" />}
            />
            <PracticeItem
              title="Listening Practice"
              score="32/40"
              date="1 week ago"
              bandScore="7.5"
              icon={<Headphones className="h-4 w-4" />}
            />
          </div>
        </CardContent>
      </Card> */}

      <div className="bg-emerald-100 rounded-lg p-4">
        <h3 className="font-medium text-emerald-800 mb-2">IELTS Tips</h3>
        <ul className="space-y-1 text-sm text-emerald-700">
          <li className="flex items-start gap-2">
            <div className="min-w-4 mt-0.5">•</div>
            <p>Practice all four skills regularly to maintain balance</p>
          </li>
          <li className="flex items-start gap-2">
            <div className="min-w-4 mt-0.5">•</div>
            <p>Time management is crucial - practice with timed conditions</p>
          </li>
          <li className="flex items-start gap-2">
            <div className="min-w-4 mt-0.5">•</div>
            <p>Learn to identify question types for each section</p>
          </li>
          <li className="flex items-start gap-2">
            <div className="min-w-4 mt-0.5">•</div>
            <p>Review your mistakes and learn from them</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

interface PracticeItemProps {
  title: string;
  score: string;
  date: string;
  bandScore: string;
  icon: React.ReactNode;
}

const PracticeItem = ({
  title,
  score,
  date,
  bandScore,
  icon,
}: PracticeItemProps) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-100 p-2 rounded-full">{icon}</div>
        <div>
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm">{score}</p>
          <p className="text-xs text-gray-500">Score</p>
        </div>
        <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-sm font-medium min-w-[40px] text-center">
          {bandScore}
        </div>
      </div>
    </div>
  );
};
