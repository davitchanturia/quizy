import type { QuizDetails, QuizQuestion } from "~/utils/types/quiz";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useQuizCreateStore = defineStore("quiz", () => {
  const initialQuizDetails: QuizDetails = {
    title: "",
    description: "",
    category: undefined,
    difficulty: "",
  };

  const quizDetails = ref<QuizDetails>(initialQuizDetails);

  const resetQuizDetails = () => {
    quizDetails.value.title = "";
    quizDetails.value.description = "";
    quizDetails.value.category = "";
    quizDetails.value.difficulty = "";
  };

  const quizDetailsAreValid = computed(() => {
    return (
      quizDetails.value.title.trim() !== "" &&
      quizDetails.value.description.trim() !== "" &&
      quizDetails.value.category !== undefined &&
      ["easy", "medium", "hard"].includes(quizDetails.value.difficulty)
    );
  });

  //questions
  const initialQuestions: QuizQuestion[] = [];
  const questions = ref<QuizQuestion[]>(initialQuestions);

  const {
    addNewQuestion,
    removeQuestion,
    addNewAnswer,
    removeAnswer,
    resetQuestions,
    markCorrectAnswer,
  } = useQuizQuestionsModification(questions);

  const resetQuiz = () => {
    resetQuizDetails();
    resetQuestions();
  };

  return {
    initialQuizDetails,
    quizDetails,
    quizDetailsAreValid,
    questions,
    initialQuestions,
    addNewQuestion,
    removeQuestion,
    addNewAnswer,
    removeAnswer,
    resetQuiz,
    markCorrectAnswer,
  };
});
