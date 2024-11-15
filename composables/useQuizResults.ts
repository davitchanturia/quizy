import { getQuizResults, storeQuiz } from "~/services/quiz";
import { useUserStore } from "~/store/useUserStore";
import type { Choice, QuizResult } from "~/utils/types/quiz";

export const quizResults = (quizId: string) => {
  const showResults = ref<boolean>(false);
  const loadingQuizResults = ref(false);

  const results = ref<QuizResult>({
    category: "",
    difficulty: "easy",
    owner: "",
    created_at: "",
    questions: [],
    questions_count: 0,
    quiz_id: 0,
    title: "",
    is_completed: false,
  });

  const userStore = useUserStore();

  const sendQuiz = async (quizData: Choice[]) => {
    try {
      loadingQuizResults.value = true;
      const res = await storeQuiz(quizData, quizId, userStore.user?.id);

      results.value = res as QuizResult;
      showResults.value = true;
    } catch (error) {
      console.log(error);
    } finally {
      loadingQuizResults.value = false;
    }
  };

  const getQuizResultsData = async (): Promise<void> => {
    try {
      loadingQuizResults.value = true;
      const resultsData = await getQuizResults(quizId);
      results.value = resultsData;
    } catch (error) {
      console.log(error);
    } finally {
      loadingQuizResults.value = false;
    }
  };

  const showResultsHandler = async (callback: () => void) => {
    if (results.value.questions.length !== 0) {
      showResults.value = true;
      callback();
      return;
    }

    await getQuizResultsData();
    showResults.value = true;
    callback();
  };

  return {
    showResults,
    loadingQuizResults,
    sendQuiz,
    results,
    showResultsHandler,
  };
};
