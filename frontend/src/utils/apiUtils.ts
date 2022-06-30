import axios from 'axios';

// @ts-ignore
const baseUrl = window._env_?.API_BASE_URL;

export const createNameTarget = async (userId: string, name: string) => {
  const url = `${baseUrl}/name-target`;
  const data = {
    userId,
    name
  };

  const response = await axios.post(url, data);
  return response.data;
};

export const getNameTargets = async () => {
  const url = `${baseUrl}/name-target`;
  const response = await axios.get(url);
  return response.data.results;
};

export const submitGuess = async (userId: string, name: string) => {
  const url = `${baseUrl}/guess`;
  const data = {
    userId,
    name
  };

  const response = await axios.post(url, data);
  return response.data;
};
