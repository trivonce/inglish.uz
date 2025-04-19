export type SpeakingQuestion = {
    id: string;
    topicId: string;
    partNumber: number;
    text: string;
    bullets: string[];
    order: number;
    audios: SpeakingAudio[];
};

export type SpeakingAudio = {
    id: string;
    questionId: string;
    accent: string;
    audioUrl: string;
    createdAt: string;
};

export type SpeakingTopic = {
    id: string;
    title: string;
    description: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
    questions: SpeakingQuestion[];
};
  