import { Loader2 } from "lucide-react";

export default function SubmitLoadingScreen() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-6 text-center">
      <Loader2 className="animate-spin h-10 w-10 text-emerald-600" />
      <h2 className="text-lg font-medium">Sending your answers...</h2>
      <p className="text-gray-500 text-sm">This may take a few seconds depending on your connection.</p>
    </div>
  );
}
