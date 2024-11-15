import axios from 'axios';

export const searchUser = async (query: string) => {
  try {
    const res = await axios.get(`/api/users/search?query=${query}`);
    console.log(res);
    return res.data.data.users;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      throw errorData;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};
