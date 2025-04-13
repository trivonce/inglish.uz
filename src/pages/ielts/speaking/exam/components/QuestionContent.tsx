// components/QuestionContent.tsx
interface QuestionContentProps {
    index: number;
    text: string;
  }
  
  export default function QuestionContent({ index, text }: QuestionContentProps) {
    return (
      <div className="p-6 flex flex-col items-center gap-4">
        <h1 className="text-xl font-bold">Question {index + 1}</h1>
        <p className="text-lg">{text}</p>
      </div>
    );
  }
  