import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type ResultsFilterProps = {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export const ResultsFilter = ({ activeFilter, onFilterChange }: ResultsFilterProps) => {
  const filters = [
    { id: "all", label: "All Tests" },
    { id: "completed", label: "Completed" },
    { id: "pending", label: "Pending" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center mb-8 bg-white p-1 rounded-lg shadow-sm border border-gray-100 inline-flex mx-auto"
    >
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange(filter.id)}
          className={`relative px-4 ${
            activeFilter === filter.id
              ? "text-emerald-700 font-medium"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {activeFilter === filter.id && (
            <motion.div
              layoutId="filterIndicator"
              className="absolute inset-0 bg-emerald-100 rounded-md -z-10"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {filter.label}
        </Button>
      ))}
    </motion.div>
  );
};