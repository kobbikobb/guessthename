import axios from 'axios';

export const submitGuess = async (userId: string, name: string) => {
  const url = '/api/guess';
  const data = {
    userId,
    name
  };

  const response = await axios.post(url, data);
  return response.data;
};
