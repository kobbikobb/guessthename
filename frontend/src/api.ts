import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export const submitGuess = async (name: string) => {
  const url = `${baseUrl}/api/guess`;
  const data = {
    userId: 'my-id',
    name
  };

  const response = await axios.post(url, data);
  return response.data;
};
