import { cva } from "class-variance-authority";
import { motion } from "framer-motion";

type ScoreBadgeProps = {
  score: number;
};

const scoreVariants = cva(
  "px-3 flex items-center justify-center transition-colors rounded-xl m-2",
  {
    variants: {
      level: {
        excellent: "bg-emerald-100",
        good: "bg-emerald-50",
        average: "bg-amber-50",
        poor: "bg-red-50",
      },
    },
    defaultVariants: {
      level: "average",
    },
  }
);

const textVariants = cva(
  "text-2xl font-bold",
  {
    variants: {
      level: {
        excellent: "text-emerald-700",
        good: "text-emerald-600",
        average: "text-amber-700",
        poor: "text-red-700",
      },
    },
    defaultVariants: {
      level: "average",
    },
  }
);

export const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const getLevel = (score: number) => {
    if (score >= 7.5) return "excellent";
    if (score >= 6.5) return "good";
    if (score >= 5) return "average";
    return "poor";
  };
  
  const level = getLevel(score);
  
  return (
    <div className={scoreVariants({ level })}>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-600 mb-1 text-nowrap">Band Score</p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        >
          <p className={textVariants({ level })}>
            {score.toFixed(1)}
          </p>
        </motion.div>
      </div>
    </div>
  );
};