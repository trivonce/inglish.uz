import { SpeakingResult } from "@/features/speaking/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon, BarChart3, ChevronRight, Clock } from "lucide-react";
import { ScoreBadge } from "./ScoreBadge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function roundToNearest(value: number, step: number) {
  return Math.round(value / step) * step;
}

type ResultCardProps = {
  result: SpeakingResult;
};

export const ResultCard = ({ result }: ResultCardProps) => {
  const isCompleted = result.status === "COMPLETED";
  
  return (
    <Link to={`/ielts/speaking/results/${result.id}`}>
    <motion.div transition={{ duration: 0.2 }}>
      <Card className="border-0">
        <CardContent className="p-0">
          <div className="flex">
            <div className="flex justify-between w-full p-3 pl-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
                    {result.topicTitle}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                      <span>{format(new Date(result.createdAt), 'MMM d, yyyy')}</span>
                    </div>
                  </div>

                  {/* {!isCompleted && (
                      <div className="flex items-center text-amber-600">
                        <Clock className="mr-1.5 h-3.5 w-3.5" />
                        <span>Awaiting results</span>
                      </div>
                    )} */}
                     
                <Badge 
                  variant={isCompleted ? "default" : "outline"}
                  className={`mt-3 ${isCompleted 
                    ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-0" 
                    : "text-amber-600 border-amber-300"}`}
                >
                  {isCompleted ? "Completed" : "Pending"}
                </Badge>
                </div>
               
              </div>
            </div>
            
            {isCompleted && result.bandScore !== null && (
              <ScoreBadge score={roundToNearest(Number(result.bandScore), 0.5)} />
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div></Link>
  );
};