import type { QuizDetails, QuizQuestion } from "~/utils/types/quiz";

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

  //questions

  const questionTemplate = {
    content: "",
    answers: [
      {
        content: "",
        is_correct: false,
      },
      {
        content: "",
        is_correct: false,
      },
      {
        content: "",
        is_correct: false,
      },
      {
        content: "",
        is_correct: false,
      },
    ],
  };

  const answerTemplate = {
    content: "",
    is_correct: false,
  };

  const initialQuestions: QuizQuestion[] = [];

  const questions = ref<QuizQuestion[]>(initialQuestions);

  const addNewQuestion = (): void => {
    questions.value = [...questions.value, questionTemplate];
  };

  const removeQuestion = (index: number): void => {
    if (questions.value.length <= 1) return;
    questions.value.splice(index, 1);
  };

  const addNewAnswer = (questionIndex: number): void => {
    const answers = questions.value[questionIndex].answers;
    if (answers.length >= 6) return;
    answers.push(answerTemplate);
  };

  const removeAnswer = (questionIndex: number, answerIndex: number): void => {
    const answers = questions.value[questionIndex].answers;
    if (answers.length <= 2) return;
    answers.splice(answerIndex, 1);
  };

  return {
    initialQuizDetails,
    quizDetails,
    setQuizDetails,
    questions,
    addNewQuestion,
    removeQuestion,
    addNewAnswer,
    removeAnswer,
  };
};
