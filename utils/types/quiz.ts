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

export type Question = {
  id: number;
  quizId: number;
  content: string;
  options: string[];
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
};

export type Answer = {
  id: number;
  questionId: number;
  content: string;
  is_correct: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Choice = {
  question_id: number | null;
  answer_id: number | null;
};
