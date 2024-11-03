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
