import { updateQuizQuestions } from "~/services/quiz";
import type { Quiz, QuizQuestion } from "~/utils/types/quiz";

export const useUpdateQuizQuestions = (userQuizzes: Ref<Quiz[]>) => {
  const showEditQuestionsDialog = ref(false);
  const selectedQuestions = ref([]);

  const selectedQuizId = ref();

  const openQuestionsDialog = (id: number) => {
    selectedQuestions.value =
      userQuizzes.value.find((quiz) => quiz.id === id)?.questions || [];
    showEditQuestionsDialog.value = true;
    selectedQuizId.value = id;
  };

  const {
    addNewQuestion,
    removeQuestion,
    addNewAnswer,
    removeAnswer,
    markCorrectAnswer,
  } = useQuizQuestionsModification(selectedQuestions);

  const updateQuestions = async (questions: QuizQuestion[]) => {
    try {
      await updateQuizQuestions(selectedQuizId.value, questions);
      showEditQuestionsDialog.value = false;
    } catch (error) {
      console.error("Failed to update questions:", error);
    } finally {
      selectedQuizId.value = undefined;
    }
    console.log(questions);
  };

  return {
    showEditQuestionsDialog,
    selectedQuestions,
    openQuestionsDialog,
    addNewQuestion,
    removeQuestion,
    addNewAnswer,
    removeAnswer,
    markCorrectAnswer,
    updateQuestions,
  };
};
