import { SpeakingResult } from "@/features/speaking/hooks";
import { ResultCard } from "./ResultCard";
import { motion } from "framer-motion";

type ResultsListProps = {
  results: SpeakingResult[];
};

export const ResultsList = ({ results }: ResultsListProps) => {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">
          Speaking Test Results
        </h1>
        <p className="text-gray-600">
          Track your IELTS speaking progress and improvement over time
        </p>
      </motion.div>
      
      <div className="space-y-4">
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              ease: "easeOut" 
            }}
          >
            <ResultCard result={result} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};