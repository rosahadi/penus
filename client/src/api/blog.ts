import axios from 'axios';

export const getAllPublicBlogs = async (page = 1, limit = 15) => {
  try {
    const res = await axios.get('/api/blogs/public', {
      params: {
        page,
        limit,
      },
    });

    return res.data.data.blogs;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      const errorData = error.response?.data;
      throw errorData;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};
