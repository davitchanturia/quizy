export type Quiz = {
  id: number;
  title: string;
  description: string;
  questions: [];
  is_active: boolean;
  owner: string;
  createdAt: string;
  updatedAt: string;
};

export type QuizzesFilters = {
  search: string;
  categories: string[];
  difficulty: string[];
};
