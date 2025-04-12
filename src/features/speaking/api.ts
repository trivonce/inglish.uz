// features/speaking/api.ts
import axios from '@/lib/axios';

export const getSpeakingTopics = async () => {
  const res = await axios.get('/api/ielts/speaking');
  return res.data;
};

export const getSpeakingTopicById = async (id: string) => {
  const res = await axios.get(`/api/ielts/speaking/${id}`);
  return res.data;
};

export const getSpeakingAudiosById = async (id: string) => {
  const res = await axios.get(`/api/ielts/speaking/${id}/audio`);
  return res.data;
};

export const submitSpeakingAnswers = async (id: string, payload: any) => {
  const res = await axios.post(`/api/ielts/speaking/${id}/submit`, payload);
  return res.data;
};
