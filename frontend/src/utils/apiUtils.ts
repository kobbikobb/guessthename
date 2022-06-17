import axios from 'axios';

// @ts-ignore
const baseUrl = window._env_?.API_BASE_URL;

export const submitGuess = async (userId: string, name: string) => {
  const url = `${baseUrl}/guess`;
  const data = {
    userId,
    name
  };

  const response = await axios.post(url, data);
  return response.data;
};
