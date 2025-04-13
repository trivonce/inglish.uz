import { Button } from "@/components/ui/button"

interface ReadyPromptProps {
  onAllow: () => void
  error?: string | null
}

export default function ReadyPrompt({ onAllow, error }: ReadyPromptProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-2xl font-bold mb-4">🎤 Ready to begin?</h1>
      <p className="text-gray-500 text-sm mb-6">
        This test uses your microphone to record your answers. Click below to grant permission and begin the exam.
      </p>
      <Button
        className="bg-primary text-white px-6 py-2 text-md"
        onClick={onAllow}
      >
        I'm Ready
      </Button>

      {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
    </div>
  )
}
