import type { Quiz, QuizCategory, QuizzesFilters } from "~/utils/types/quiz";

export const getQuizes = async (filters: QuizzesFilters): Promise<Quiz[]> => {
  const config = useRuntimeConfig();
  const CSRF_TOKEN = useCookie("XSRF-TOKEN");

  const queryParams = {
    search: filters.search,
    difficulty: filters.difficulty,
  };

  const bodyParams = {
    categories: filters.categories,
  };

  try {
    const data = await $fetch<Quiz[]>(`${config.public.API_BASE_URL}/quiz`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": CSRF_TOKEN.value || "",
      },
      params: queryParams || {},
      body: bodyParams || {},
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

export const getQuizCategories = async (): Promise<QuizCategory[]> => {
  const config = useRuntimeConfig();
  const CSRF_TOKEN = useCookie("XSRF-TOKEN");

  try {
    const data = await $fetch<QuizCategory[]>(
      `${config.public.API_BASE_URL}/quiz/categories`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": CSRF_TOKEN.value || "",
        },
        credentials: "include",
      }
    );

    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};
