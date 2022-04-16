import axios from 'axios';

export const submitGuess = async (name: string) => {
  const url = '/api/guess';
  const data = {
    userId: 'my-id',
    name
  };

  const response = await axios.post(url, data);
  return response.data;
};
