// components/BottomControls.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight, LogOut } from "lucide-react";

interface BottomControlsProps {
  onLeave: () => void;
  onNext: () => void;
  canProceed: boolean;
  isRecording: boolean;
}

export default function BottomControls({
  onLeave,
  onNext,
  canProceed,
  isRecording,
}: BottomControlsProps) {
  return (
    <div className="p-4 flex justify-between items-center">
      <Button className="bg-amber-700" onClick={onLeave}>
        <LogOut className="rotate-180" />
        Leave
      </Button>

      <div className="text-center text-sm text-gray-500">
        {isRecording ? (
          <span className="text-red-500 animate-pulse">Recording…</span>
        ) : (
          <span className="text-gray-400">Not recording</span>
        )}
      </div>

      <Button
        onClick={onNext}
        disabled={!canProceed}
        className="bg-emerald-600 hover:bg-emerald-700 text-white"
      >
        Next <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
}
