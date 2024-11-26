import type { QuizQuestion, QuizQuestionAnswer } from "~/utils/types/quiz";

export const useQuizQuestionsModification = (
  questions: Ref<QuizQuestion[]>
) => {
  const answerTemplate: QuizQuestionAnswer = {
    content: "",
    is_correct: false,
  };

  const questionTemplate: QuizQuestion = {
    content: "",
    answers: [answerTemplate, answerTemplate],
  };

  const addNewQuestion = () => {
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

  const resetQuestions = () => {
    questions.value = [];
  };

  return {
    addNewQuestion,
    removeQuestion,
    addNewAnswer,
    removeAnswer,
    resetQuestions,
    markCorrectAnswer,
  };
};
