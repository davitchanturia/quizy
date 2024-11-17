import type {
  Choice,
  Quiz,
  QuizCategory,
  QuizResult,
  QuizzesFilters,
} from "~/utils/types/quiz";

export const getQuizzes = async (filters: QuizzesFilters): Promise<Quiz[]> => {
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
    const data = await $fetch<Quiz[]>(`${config.public.API_BASE_URL}/quizzes`, {
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

export const getQuiz = async (id: string): Promise<Quiz> => {
  const config = useRuntimeConfig();
  const CSRF_TOKEN = useCookie("XSRF-TOKEN");

  try {
    const quiz = await $fetch<Quiz>(
      `${config.public.API_BASE_URL}/quiz/${id}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": CSRF_TOKEN.value || "",
        },
      }
    );

    return quiz as Quiz;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

export const storeQuiz = async (
  choices: Choice[],
  quizId: string,
  userId: number | undefined
) => {
  const config = useRuntimeConfig();
  const CSRF_TOKEN = useCookie("XSRF-TOKEN");

  try {
    const response = await $fetch<QuizResult>(
      `${config.public.API_BASE_URL}/quiz/${quizId}/choices`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": CSRF_TOKEN.value || "",
        },
        body: {
          quiz_id: quizId,
          user_id: userId,
          choices,
        },
      }
    );

    return response as QuizResult;
  } catch (error) {
    console.error("Failed to store data:", error);
    throw error;
  }
};

export const getQuizResults = async (quizId: string) => {
  const config = useRuntimeConfig();
  const CSRF_TOKEN = useCookie("XSRF-TOKEN");

  try {
    const response = await $fetch<QuizResult>(
      `${config.public.API_BASE_URL}/quiz/${quizId}/results`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": CSRF_TOKEN.value || "",
        },
      }
    );

    return response as QuizResult;
  } catch (error) {
    console.error("Failed to get results data:", error);
    throw error;
  }
};

export const getQuizCategories = async () => {
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

    return data as QuizCategory[];
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

export const updateQuiz = async (quiz: Quiz) => {
  const config = useRuntimeConfig();
  const CSRF_TOKEN = useCookie("XSRF-TOKEN");

  try {
    const response = await $fetch<Quiz>(
      `${config.public.API_BASE_URL}/quizzes/${quiz.id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": CSRF_TOKEN.value || "",
        },
        body: {
          title: quiz.title,
          category_id: quiz.category_id,
          difficulty: quiz.difficulty,
          is_active: quiz.is_active,
        },
      }
    );

    return response as Quiz;
  } catch (error) {
    console.error("Failed to update data:", error);
    throw error;
  }
};
