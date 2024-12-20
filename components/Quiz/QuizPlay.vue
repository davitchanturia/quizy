<template>
  <div class="w-full h-full px-10 pb-10">
    <div class="flex justify-center text-xl">
      {{ quizStore.currentQuestion?.content }}
    </div>
    <div class="flex justify-center mt-3">
      {{ quizStore.step }} / {{ quizStore.questionsLength }}
    </div>

    <div class="grid grid-cols-2 mt-14 gap-5 border p-2">
      <Button
        v-for="answer in quizStore.currentQuestion?.answers"
        :key="answer.id"
        variant="text"
        class="flex justify-center"
        :severity="
          quizStore.currentChoice?.answer_id !== undefined
            ? answer.is_correct
              ? 'success'
              : 'danger'
            : ''
        "
        :disabled="quizStore.currentChoice?.answer_id !== undefined"
        @click="answerHandler(answer)"
        >{{ answer.content }}</Button
      >
    </div>

    <div class="flex justify-between items-center mt-10">
      <Button :disabled="quizStore.disableUndoButton" @click="undoHandler"
        >Previous</Button
      >

      <Button
        v-if="quizStore.showSubmitButton"
        :disabled="quizStore.disableSubmitButton"
        @click="submitHandler"
        >Submit</Button
      >
      <Button
        v-else
        :disabled="quizStore.disableNextButton"
        @click="nextHandler"
        >Next</Button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuizStore } from "~/store/useQuizStore";
import type { Answer, Choice } from "~/utils/types/quiz";

const emit = defineEmits<{
  (e: "submit", value: Choice[]): void;
}>();

const quizStore = useQuizStore();

const answerHandler = (answer: Answer) => {
  quizStore.setChoice(answer);
};

const submitHandler = () => {
  emit("submit", quizStore.choices);
  quizStore.resetChoices();
};

const undoHandler = () => {
  quizStore.undo();
};
const nextHandler = () => {
  quizStore.next();
};
</script>
