<template>
  <SharedQuizQuestionsForm
    :questions="questions"
    @add-new-question="addNewQuestion"
    @mark-correct-answer="markCorrectAnswer"
    @remove-question="removeQuestion"
    @add-new-answer="addNewAnswer"
    @remove-answer="removeAnswer"
  >
    <template #actions="{ disableNextButton }">
      <slot :disable-next-button />
    </template>
  </SharedQuizQuestionsForm>
</template>

<script lang="ts" setup>
import { useQuizCreateStore } from "~/store/useQuizCreateStore";
import SharedQuizQuestionsForm from "../Shared/SharedQuizQuestionsForm.vue";

const {
  questions,
  addNewQuestion,
  removeQuestion,
  addNewAnswer,
  removeAnswer,
  markCorrectAnswer,
} = useQuizCreateStore();
</script>
