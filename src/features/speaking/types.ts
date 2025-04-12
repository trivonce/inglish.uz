export type SpeakingQuestion = {
    text: string;
    bulletPoints?: string[];
  };
  
  export type SpeakingAudio = {
    number: number;
    url: string;
  };
  
  export type SpeakingTopic = {
    _id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    questionCount: number;
    takenCount: number;
    difficulty?: string;
    tips?: string[];
    sampleQuestions?: string[];
    questionTypes?: string[];
    commonVocabulary?: string[];
    questions: {
      part1: SpeakingQuestion[];
      part2: SpeakingQuestion[];
      part3: SpeakingQuestion[];
    };
    audios?: {
      part1: SpeakingAudio[];
      part2: SpeakingAudio[];
      part3: SpeakingAudio[];
    };
  };
  