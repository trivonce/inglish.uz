import { useUserSpeakingResults } from "@/features/speaking/hooks";
import { useTelegramStore } from "@/store/useTelegramStore";
import { ResultsList } from "./components/ResultsList";
import { EmptyResultsState } from "./components/EmptyResultsState";
import { ResultsLoading } from "./components/ResultsLoading";

const ResultsPage = () => {
  const { user } = useTelegramStore();
  const { data, isLoading } = useUserSpeakingResults(user?.id?.toString() || "");
  
  const results = Array.isArray(data) ? data :  [];

  return (
    <div className="min-h-screen bg-emerland-50">
      <div className="container mx-auto">
        {isLoading ? (
          <ResultsLoading />
        ) : results.length === 0 ? (
          <EmptyResultsState />
        ) : (
          <ResultsList results={results} />
        )}
      </div>
    </div>
  );
};

export default ResultsPage;