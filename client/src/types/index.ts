export interface CloseDialogType {
  closeDialog: () => void;
}

export interface UserDocument {
  _id: string;
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
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  status: 'publish' | 'hide';
  slug?: string | null;
  image?: string | null;
  user?: UserDocument;
  reviews?: ReviewDocument[];
}

export interface ReviewDocument {
  _id: string;
  review: string;
  rating: number;
  blog: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
