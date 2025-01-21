import { BlogDataType } from '@/types';
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
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};

export const createBlog = async (formData: FormData) => {
  try {
    const res = await axios.post(`/api/blogs`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 413) {
        throw 'Image size is too large. Maximum size allowed is 10MB.';
      }
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};

export const updateMyBlog = async (id: string, data: BlogDataType) => {
  try {
    const res = await axios.patch(`/api/blogs/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data.message.message;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};

export const searchBlog = async (query: string) => {
  try {
    const res = await axios.get(`/api/blogs/search?query=${query}`);
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

export const getMyBlogs = async (page = 1, limit = 10) => {
  try {
    const res = await axios.get('/api/blogs/myBlogs', {
      params: {
        page,
        limit,
      },
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

export const getBlogById = async (id: string) => {
  try {
    const res = await axios.get(`/api/blogs/${id}`);
    return res.data.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      throw errorData;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};

export const deleteMyBlog = async (id: string | undefined) => {
  try {
    const res = await axios.delete(`/api/blogs/${id}`);

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
