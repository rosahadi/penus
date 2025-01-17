import { UpdatePasswordFormData } from '@/types';
import axios from 'axios';

export const searchUser = async (query: string) => {
  try {
    const res = await axios.get(`/api/users/search?query=${query}`);
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

export const updateNameAndImage = async (data: FormData) => {
  try {
    const res = await axios.patch(`/api/users/updateMe`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
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

export const updateEmail = async (email: string) => {
  try {
    const res = await axios.patch(
      `/api/users/updateMe`,
      { email },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data.message;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};

export const updateCurrentPassword = async (data: UpdatePasswordFormData) => {
  try {
    const res = await axios.patch(`/api/users/updateMyPassword`, data, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data?.message;
      const validationError = JSON.parse(errorData);
      throw validationError;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};
