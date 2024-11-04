export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export interface SignupError {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}
export interface SignInError {
  email?: string;
  general?: string;
}

export interface ForgotPasswordFormData {
  email: string;
}
export interface ForgotPasswordError {
  email?: string;
}

export interface ResetPasswordFormData {
  password: string;
  passwordConfirm: string;
}
export interface ResetPasswordError {
  password?: string;
  passwordConfirm?: string;
  token?: string;
}

export interface UserType {
  name: string;
  email: string;
  role: string;
  image: string;
}
