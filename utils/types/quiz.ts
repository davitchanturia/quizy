import type { User } from "./auth";

export type Quiz = {
  id: number;
  title: string;
  description?: string;
  questions?: [];
  is_active: boolean;
  owner?: User;
  category?: QuizCategory;
  category_id?: number;
  difficulty: QuizDifficulty;
  createdAt?: string;
  updatedAt?: string;
  is_completed?: boolean;
};

export type QuizzesFilters = {
  search: string;
  categories: string[];
  difficulty: string[];
};

export type QuizCategory = {
  id?: number;
  name: string;
};

export type QuizDifficulty = "easy" | "medium" | "hard" | "";

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
  is_correct: boolean;
};

export type QuizResult = {
  category: string;
  difficulty: QuizDifficulty;
  owner: string;
  created_at: string;
  questions: QuizResultQuestions[];
  questions_count: number;
  quiz_id: number;
  title: string;
  is_completed?: boolean;
};

export type QuizResultQuestions = {
  content: string;
  correct_answer_content: number;
  is_correct: boolean;
  question_id: number;
  user_answer: string | null;
};

export type QuizDetails = {
  category: string | number | undefined;
  difficulty: QuizDifficulty;
  title: string;
  description: string;
};

export type QuizQuestion = {
  content: string;
  answers: QuizQuestionAnswer[];
};

export type QuizQuestionAnswer = {
  content: string;
  is_correct: boolean;
};

export type QuizQuestionError = {
  question: string[];
  answers: string[];
};
