<template>
  <div>
    <h1 class="text-2xl text-center mt-5">
      Review your form before submission.
    </h1>

    <div class="mt-10 pb-10">
      <div class="flex items-center gap-4">
        <div class="text-2xl font-medium">
          {{ quizCreateStore.quizDetails.title }}
        </div>
        <span>&#8226;</span>
        <Chip class="text-lg" :label="quizCreateStore.quizDetails.category" />

        <span>&#8226;</span>
        <Chip
          class="text-lg capitalize"
          :label="quizCreateStore.quizDetails.difficulty"
        />
      </div>
      <div class="text-md font-light">
        {{ quizCreateStore.quizDetails.description }}
      </div>
    </div>

    <Divider />

    <div class="mt-10">
      <div class="text-xl">Questions:</div>
      <Accordion value="0" class="mt-5">
        <AccordionPanel
          v-for="(question, index) in quizCreateStore.questions"
          :key="index"
          :value="index"
        >
          <AccordionHeader>{{ question.content }}</AccordionHeader>
          <AccordionContent>
            <div
              v-for="(answer, answerIndex) in question.answers"
              :key="answerIndex"
              class="flex items-center gap-5"
            >
              <i
                v-if="answer.is_correct"
                class="pi pi-check"
                style="color: green"
              ></i>
              <i v-else class="pi pi-times" style="color: red"></i>
              <div>{{ answer.content }}</div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuizCreateStore } from "~/store/useQuizCreateStore";

const quizCreateStore = useQuizCreateStore();
</script>

<style scoped>
.p-accordion {
  display: flex !important;
  flex-direction: column !important;
  gap: 15px !important;
}
.p-accordionpanel {
  border: solid 1px #e0e0e0 !important;
  border-radius: 5px !important;
}

.p-accordionheader {
  border-radius: 5px !important;
}
</style>
