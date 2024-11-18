import type { QuizDetails } from "~/utils/types/quiz";

export const useQuizCreation = () => {
  const initialQuizDetails: QuizDetails = {
    title: "",
    description: "",
    category: "",
    difficulty: "easy",
  };

  const quizDetails = ref<QuizDetails>(initialQuizDetails);

  const setQuizDetails = (details: QuizDetails): void => {
    quizDetails.value = details;
  };

  return {
    initialQuizDetails,
    quizDetails,
    setQuizDetails,
  };
};
