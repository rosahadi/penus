import axios from 'axios';

export const getAllLikes = async (id: string | undefined) => {
  try {
    const res = await axios.get(`/api/likes/${id}`);
    return res.data.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data.message;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};

export const createLike = async (blogId: string | undefined) => {
  try {
    const res = await axios.post('/api/likes', {
      blog: blogId,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      throw error.response?.data.message;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};

export const deleteLike = async (likeId: string | null) => {
  try {
    const res = await axios.delete(`/api/likes/${likeId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      throw error.response?.data.message;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};
