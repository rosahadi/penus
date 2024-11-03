import { SignInFormData, SignupFormData } from '@/types/auth';
import axios from 'axios';

export const signup = async (userData: SignupFormData) => {
  try {
    const res = await axios.post('/api/users/signup', userData);
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

export const signin = async (userData: SignInFormData) => {
  try {
    const res = await axios.post('/api/users/login', userData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const errorData = error.response?.data?.message;

      let validationError;
      try {
        validationError = JSON.parse(errorData);
      } catch {
        validationError = {
          general: errorData || 'An unexpected error occurred',
        };
      }

      throw validationError;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};
