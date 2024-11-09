import { CommentFormDataType } from '@/types';
import axios from 'axios';

export const getAllComments = async (id: string | undefined) => {
  try {
    const res = await axios.get(`/api/comments/${id}`);
    return res.data.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data.message;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};

export const createComment = async ({
  blogId,
  formData,
}: {
  blogId: string | undefined;
  formData: CommentFormDataType;
}) => {
  try {
    const res = await axios.post('/api/comments', {
      blog: blogId,
      comment: formData.comment,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      throw error.response?.data.message.message;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};

export const deleteComments = async (id: string | undefined) => {
  try {
    const res = await axios.delete(`/api/comments/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data.message;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};

export const updateComment = async ({
  blogId,
  formData,
}: {
  blogId: string | undefined;
  formData: CommentFormDataType;
}) => {
  try {
    const res = await axios.patch(`/api/comments/${blogId}`, {
      comment: formData.comment,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data.message;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};
