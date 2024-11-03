import { SignupFormData } from '@/types/auth';
import axios from 'axios';

export const signup = async (userData: SignupFormData) => {
  try {
    const res = await axios.post('/api/users/signup', userData);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data?.message;
      const validationError = JSON.parse(errorData);
      throw validationError || 'Validation Error';
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};
