import type { Quiz, QuizCategory, QuizzesFilters } from "~/utils/types/quiz";

export const getQuizes = async (filters: QuizzesFilters): Promise<Quiz[]> => {
  const config = useRuntimeConfig();

  try {
    const data = await $fetch<Quiz[]>(`${config.public.API_BASE_URL}/quiz`, {
      credentials: "include",
      params: filters || {},
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

export const getQuizCategories = async (): Promise<QuizCategory[]> => {
  const config = useRuntimeConfig();

  try {
    const data = await $fetch<QuizCategory[]>(
      `${config.public.API_BASE_URL}/quiz/categories`,
      {
        credentials: "include",
      }
    );

    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};
