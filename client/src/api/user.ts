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

export const deleteMe = async () => {
  try {
    const res = await axios.delete(`/api/users/deleteMe`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data.message;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};
