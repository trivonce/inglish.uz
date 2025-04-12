// features/speaking/hooks.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getSpeakingTopics,
  getSpeakingTopicById,
  getSpeakingAudiosById,
  submitSpeakingAnswers
} from './api';
import { SpeakingTopic, SpeakingAudio } from './types';

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

export const useSubmitSpeakingAnswers = (id: string) => {
  return useMutation({
    mutationFn: (payload: any) => submitSpeakingAnswers(id, payload)
  });
};
