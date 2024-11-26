<template>
  <Dialog v-model:visible="model" modal :style="{ width: '50%' }" maximizable>
    <div class="w-full max-w-5xl mx-auto">
      <SharedQuizQuestionsForm
        :questions="questions"
        @add-new-question="emit('addNewQuestion')"
        @mark-correct-answer="
          (questionIndex, answerIndex) =>
            emit('markCorrectAnswer', questionIndex, answerIndex)
        "
        @remove-question="(index) => emit('removeQuestion', index)"
        @add-new-answer="(index) => emit('addNewAnswer', index)"
        @remove-answer="
          (questionIndex, answerIndex) =>
            emit('removeAnswer', questionIndex, answerIndex)
        "
        @update-questions="(questions) => emit('updateQuestions', questions)"
      >
        <template #actions="{ disableNextButton }">
          <slot :disable-next-button />
        </template>
      </SharedQuizQuestionsForm>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import type { Question, QuizQuestion } from "~/utils/types/quiz";

const model = defineModel();

const { questions } = defineProps<{
  questions: Question[];
}>();

const emit = defineEmits<{
  (e: "removeQuestion" | "addNewAnswer", index: number): void;
  (
    e: "markCorrectAnswer" | "removeAnswer",
    questionIndex: number,
    answerIndex: number
  ): void;
  (e: "addNewQuestion"): void;
  (e: "updateQuestions", questions: QuizQuestion[]): void;
}>();
</script>
