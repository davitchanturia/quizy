import type {
  Question,
  QuizDetails,
  QuizQuestion,
  QuizQuestionAnswer,
} from "~/utils/types/quiz";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useQuizCreateStore = defineStore("quiz", () => {
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

  //questions

  const answerTemplate: QuizQuestionAnswer = {
    content: "",
    is_correct: false,
  };

  const questionTemplate: QuizQuestion = {
    content: "",
    answers: [answerTemplate, answerTemplate],
  };

  const initialQuestions: QuizQuestion[] = [];

  const questions = ref<QuizQuestion[]>(initialQuestions);

  const addNewQuestion = (): void => {
    questions.value.push(JSON.parse(JSON.stringify(questionTemplate)));
  };

  const removeQuestion = (index: number): void => {
    questions.value.splice(index, 1);
  };

  const addNewAnswer = (questionIndex: number): void => {
    const answers = questions.value[questionIndex].answers;
    if (answers.length >= 6) return;

    questions.value[questionIndex].answers.push(
      JSON.parse(JSON.stringify(answerTemplate))
    );
  };

  const removeAnswer = (questionIndex: number, answerIndex: number): void => {
    const answers = questions.value[questionIndex].answers;
    if (answers.length <= 2) return;
    answers.splice(answerIndex, 1);
  };

  const markCorrectAnswer = (questionIndex: number, answerIndex: number) => {
    questions.value[questionIndex].answers.forEach((answer, idx) => {
      answer.is_correct = idx === answerIndex; // Only the selected answer becomes correct
    });
  };

  return {
    initialQuizDetails,
    quizDetails,
    setQuizDetails,
    questions,
    initialQuestions,
    addNewQuestion,
    removeQuestion,
    addNewAnswer,
    removeAnswer,
    markCorrectAnswer,
  };
});
