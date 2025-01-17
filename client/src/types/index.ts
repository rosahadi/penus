export interface CloseDialogType {
  closeDialog: () => void;
}

export interface UserDocument {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  password?: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  active: boolean;
}

export interface BlogDocument {
  id: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  status: 'publish' | 'hide';
  slug?: string | null;
  image: string;
  user?: UserDocument;
  comments?: CommentDocument[];
}

export interface CommentDocument {
  id: string;
  comment: string;
  blog: string;
  user: UserDocument;
  createdAt: Date;
  updatedAt: Date;
}
export interface CommentFormDataType {
  comment?: string;
}

export interface BlogDataType {
  title: string;
  content: string;
  image: File | null;
  status?: 'publish' | 'hide';
}

export interface SearchFormData {
  search: string;
}

export interface UpdatePasswordFormData {
  password: string;
  passwordCurrent: string;
  passwordConfirm: string;
}

export interface UpdatePasswordFormError {
  password: string;
  passwordCurrent: string;
  passwordConfirm: string;
}
