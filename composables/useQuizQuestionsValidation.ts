import type { QuizQuestion, QuizQuestionError } from "~/utils/types/quiz";

import { ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { quizQuestionsSchema } from "~/utils/validationRules/quiz";

const extractIndex = (value: string): string | null => {
  const match = value?.match(/\[(\d+)\]$/);

  return match ? match[1] : null;
};

export const useQuizValidation = (questions: Ref<QuizQuestion[]>) => {
  const errors = ref<QuizQuestionError[]>([]);

  const formIsValid = ref(false);

  const generateErrorStructure = (): void => {
    errors.value = questions.value.map((question) => ({
      question: [],
      answers: question.answers.map(() => ""),
    }));
  };

  const validate = useDebounceFn(async (): Promise<void> => {
    try {
      generateErrorStructure();

      await quizQuestionsSchema.validate(questions.value, {
        abortEarly: false,
      });

      formIsValid.value = true;
    } catch (validationError: any) {
      formIsValid.value = false;

      if (validationError.inner) {
        validationError.inner.forEach((error: any) => {
          const path = error.path.split(".");
          const questionIndexString = path[0]; // '[0]'

          const questionIndex = parseInt(
            questionIndexString.replace(/\[|\]/g, ""),
            10
          );

          const field = path[1];
          const answerIndex = extractIndex(path[1]) ?? null;

          if (field === "content" && errors.value[questionIndex]) {
            errors.value[questionIndex].question.push(error.message);
          } else if (field === "answers") {
            errors.value[questionIndex].question.push(error.message);
          } else if (field.length > 7 && answerIndex !== null) {
            //field.length > 7 means that field value is answers[index] and user has not checked radio button
            errors.value[questionIndex].answers[answerIndex] = error.message;
          }
        });
      }
    }
  }, 300);

  return {
    validate,
    errors,
    formIsValid,
  };
};
