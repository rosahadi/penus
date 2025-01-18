import axios from 'axios';

export const getSavedBlogs = async () => {
  try {
    const res = await axios.get('/api/saveBlogs');
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      throw errorData;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};

export const saveBlog = async (blogId: string | undefined) => {
  try {
    const res = await axios.post('/api/saveBlogs', { blog: blogId });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data.message;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};

export const deleteSavedBlog = async (blogId: string | undefined) => {
  try {
    const res = await axios.delete('/api/saveBlogs', {
      data: { blog: blogId },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      throw errorData;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};
