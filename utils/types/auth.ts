export type registerForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type loginForm = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  created_at: string;
  updated_at: string;
};
