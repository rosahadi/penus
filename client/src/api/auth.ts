import {
  ForgotPasswordFormData,
  ResetPasswordFormData,
  SignInFormData,
  SignupFormData,
} from '@/types/auth';
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

export const checkAuthAndGetUser = async () => {
  const response = await axios.get('/api/users/checkAuthAndGetUser');
  return response.data;
};

export const forgotPassword = async (userData: ForgotPasswordFormData) => {
  try {
    const res = await axios.post(`/api/users/forgotPassword`, userData, {});
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data?.message;
      throw errorData;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};

export const resetPassword = async ({
  token,
  formData,
}: {
  token: string | undefined;
  formData: ResetPasswordFormData;
}) => {
  try {
    const res = await axios.patch(
      `/api/users/resetPassword/${token}`,
      formData,
      {
        withCredentials: true,
      }
    );
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

export const logout = async () => {
  try {
    const res = await axios.get('/api/users/logout');
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data.message;
    } else {
      throw { message: 'An unexpected error occurred.' };
    }
  }
};
