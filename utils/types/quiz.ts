import type { User } from "./auth";

export type Quiz = {
  id: number;
  title: string;
  description: string;
  questions: [];
  is_active: boolean;
  owner: User;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  createdAt: string;
  updatedAt: string;
};

export type QuizzesFilters = {
  search: string;
  categories: string[];
  difficulty: string[];
};

export type QuizCategory = {
  name: string;
};

export type QuizDifficulty = "easy" | "medium" | "hard";
