import type { Answer, Choice, Question } from "~/utils/types/quiz";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useQuizStore = defineStore("quiz", () => {
  // Step logic
  const step = ref<number>(1);

  const nextStep = (): void => {
    step.value += 1;
  };

  const undoStep = (): void => {
    if (step.value > 1) step.value -= 1;
  };

  // Questions logic
  const questions = ref<Question[]>([]);

  const setQuestions = (newQuestions: Question[]): void => {
    questions.value = newQuestions;
  };

  const questionsLength = computed<number>(() => questions.value.length);

  const currentQuestionIndex = ref<number>(0);

  const nextQuestion = (): void => {
    if (currentQuestionIndex.value < questionsLength.value - 1) {
      currentQuestionIndex.value += 1;
    }
  };

  const undoQuestion = (): void => {
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value -= 1;
    }
  };

  const currentQuestion = computed<Question | undefined>(() => {
    return questions.value[currentQuestionIndex.value];
  });

  // Choices logic
  const choices = ref<Choice[]>(
    Array.from({ length: questionsLength.value }, () => ({
      question_id: null,
      answer_id: null,
    }))
  );

  const currentChoice = computed<Choice | undefined>(
    () => choices.value[currentQuestionIndex.value]
  );

  const setChoice = (answer: Answer): void => {
    if (currentQuestion.value) {
      choices.value[currentQuestionIndex.value] = {
        question_id: currentQuestion.value.id,
        answer_id: answer.id,
      };
    }
  };

  // Navigation logic
  const undo = (): void => {
    undoQuestion();
    undoStep();
  };

  const next = (): void => {
    if (
      currentQuestionIndex.value < questionsLength.value - 1 &&
      currentChoice.value?.answer_id !== undefined
    ) {
      nextQuestion();
      nextStep();
    }
  };

  const disableUndoButton = computed<boolean>(
    () => currentQuestionIndex.value === 0
  );

  const disableNextButton = computed<boolean>(
    () =>
      currentQuestionIndex.value === questionsLength.value - 1 ||
      currentChoice.value?.answer_id === undefined
  );

  return {
    step,
    nextStep,
    undoStep,
    questions,
    setQuestions,
    questionsLength,
    currentQuestionIndex,
    currentQuestion,
    choices,
    setChoice,
    currentChoice,
    next,
    undo,
    disableUndoButton,
    disableNextButton,
  };
});
