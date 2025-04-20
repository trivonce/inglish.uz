import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MicIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const EmptyResultsState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12"
    >
      <Card className="border-dashed border-2 border-gray-200">
        <CardContent className="p-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <MicIcon className="h-8 w-8 text-emerald-600" />
          </div>
          
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            No speaking tests found
          </h3>
          
          <p className="text-gray-500 mb-6 max-w-md">
            Start a speaking practice test to see your results and track your progress.
          </p>
          
          <Link to='/ielts/speaking'>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Take a Practice Test
          </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};