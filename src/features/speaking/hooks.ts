// features/speaking/hooks.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getSpeakingTopics,
  getSpeakingTopicById,
  getSpeakingAudiosById,
  submitSpeakingAnswers,
  getSpeakingResultById,
  getUserSpeakingResults
} from './api';
import { SpeakingTopic, SpeakingAudio } from './types';

export interface SpeakingResult {
  id: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  bandScore: number | null;
  createdAt: string;
  topicTitle: string;
  audioUrl: string;
  topic: {
    title: string;
  };
  feedbacks: Array<{
    questionId: string;
    questionText: string;
    bandScore: number;
    fluency: number;
    coherence: number;
    lexicalResource: number;
    grammaticalRange: number;
    pronunciation: number;
    comment: string;
    suggestions: string;
    transcript: string;
  }>;
}

export const useSpeakingTopics = () => {
  return useQuery<SpeakingTopic[]>({
    queryKey: ['speaking-topics'],
    queryFn: getSpeakingTopics
  });
};

export const useSpeakingTopic = (id: string) => {
  return useQuery<SpeakingTopic>({
    queryKey: ['speaking-topic', id],
    queryFn: () => getSpeakingTopicById(id),
    enabled: !!id
  });
};

export const useSpeakingAudios = (id: string) => {
  return useQuery<SpeakingAudio>({
    queryKey: ['speaking-audios', id],
    queryFn: () => getSpeakingAudiosById(id),
    enabled: !!id
  });
};

export const useSubmitSpeakingAnswers = () => {
  return useMutation({
    mutationFn: (payload: any) => submitSpeakingAnswers(payload)
  });
};

export const useUserSpeakingResults = (userId: string) => {
  return useQuery<SpeakingResult[]>({
    queryKey: ['speaking-results'],
    queryFn: () => getUserSpeakingResults(userId)
  });
};

export const useSpeakingResult = (id: string) => {
  return useQuery<SpeakingResult>({
    queryKey: ['speaking-result', id],
    queryFn: () => getSpeakingResultById(id),
    enabled: !!id,
    refetchInterval: (query) => {
      const data = query.state.data;
      // If we have data and it's not in a final state, poll every 5 seconds
      if (data?.status && !['COMPLETED', 'FAILED'].includes(data.status)) {
        return 5000;
      }
      // Stop polling if we're in a final state
      return false;
    },
    refetchIntervalInBackground: true,
  });
};
