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
      const errorData = error.response?.data;
      throw errorData;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};

export const getPublicBlog = async (id: string | undefined) => {
  try {
    const res = await axios.get(`/api/blogs/public/${id}`);
    return res.data.data.blog;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      throw error.response;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};
