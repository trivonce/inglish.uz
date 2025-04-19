// features/speaking/api.ts
import axios from '@/lib/axios';

export const getSpeakingTopics = async () => {
  const res = await axios.get('/api/topics/');
  return res.data;
};

export const getSpeakingTopicById = async (id: string) => {
  const res = await axios.get(`/api/topics/${id}`);
  return res.data;
};

export const getSpeakingAudiosById = async (id: string) => {
  const res = await axios.get(`/api/ielts/speaking/${id}/audio`);
  return res.data;
};

export const submitSpeakingAnswers = async (payload: any) => {
  const res = await axios.post(`/api/speaking/submit`, payload);
  return res.data;
};

export const getSpeakingResultById = async (id: string) => {
  const res = await axios.get(`/api/speaking/${id}`);
  return res.data;
};

