import type { QuizDetails, QuizQuestion } from "~/utils/types/quiz";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useQuizCreateStore = defineStore("quiz", () => {
  const initialQuizDetails: QuizDetails = {
    title: "",
    description: "",
    category: "",
    difficulty: "",
  };

  const quizDetails = ref<QuizDetails>(initialQuizDetails);

  const quizDetailsAreValid = computed(() => {
    return (
      quizDetails.value.title.trim() !== "" &&
      quizDetails.value.description.trim() !== "" &&
      typeof quizDetails.value.category === "number" &&
      quizDetails.value.category > 0 &&
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
    markCorrectAnswer,
  } = useQuizQuestionsModification(questions);

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
    markCorrectAnswer,
  };
});
