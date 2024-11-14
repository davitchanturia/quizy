<template>
  <div class="w-full h-full">
    <div
      class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1 mt-10"
    >
      <div
        v-for="question in questions"
        :key="question.question_id"
        class="secondary-bg col-span-1 flex justify-center items-center relative py-4 rounded-md"
      >
        <div
          :class="question.is_correct ? 'bg-green-500' : 'bg-red-500'"
          class="absolute top-0 right-0 w-5 h-5 flex justify-center items-center rounded-tr-md rounded-bl-md"
        >
          <i
            :class="question.is_correct ? 'pi pi-check' : 'pi pi-times'"
            class="pi pi-check text-white"
            style="font-size: 0.7rem"
          ></i>
        </div>
        {{ question.question_id }}
      </div>
    </div>

    <div class="flex items-center gap-4 mt-4 text-sm secondary-text">
      <div class="flex gap-2 items-center">
        <div class="w-3 h-3 bg-green-500 rounded-sm"></div>
        <div>Correct <span> &#8226; </span> {{ correctAnswersCount }}</div>
      </div>

      <div class="flex gap-2 items-center">
        <div class="w-3 h-3 bg-red-500 rounded-sm"></div>
        <div>Incorrect <span> &#8226; </span> {{ inCorrectAnswersCount }}</div>
      </div>
    </div>

    <div class="mt-10">
      <Accordion value="0">
        <AccordionPanel
          v-for="question in questions"
          :key="question.question_id"
          :value="question.question_id"
        >
          <AccordionHeader>
            <div class="flex items-center gap-3">
              <div class="px-1 secondary-bg rounded-sm">
                <i class="pi pi-question" style="font-size: 1rem"></i>
              </div>

              <div class="font-semibold text-base">
                Questions {{ question.question_id }}
              </div>

              <span> &#8226; </span>

              <div class="flex gap-2 items-center">
                <div
                  :class="question.is_correct ? 'bg-green-500' : 'bg-red-500'"
                  class="w-4 h-4 rounded-sm"
                ></div>
                <div class="text-sm font-light">
                  {{ question.is_correct ? "Correct" : "Incorrect" }}
                </div>
              </div>
            </div>
          </AccordionHeader>
          <AccordionContent>
            <div>
              <div class="col-span-1 font-bold text-xl">
                {{ question.content }}
              </div>

              <div class="flex gap-2 items-center mt-2">
                <div class="w-4 h-4 bg-green-500 rounded-sm"></div>
                <div class="text-sm font-light">
                  {{ question?.correct_answer_content }}
                </div>
              </div>

              <div
                v-if="!question.is_correct"
                class="flex gap-2 items-center mt-2"
              >
                <div class="w-4 h-4 bg-red-500 rounded-sm"></div>
                <div class="text-sm font-light">
                  {{ question?.user_answer }}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { QuizResultQuestions } from "~/utils/types/quiz";

const { questions, inCorrectAnswersCount, correctAnswersCount } = defineProps({
  questions: {
    type: Array as PropType<QuizResultQuestions[]>,
    required: true,
  },
  inCorrectAnswersCount: {
    type: Number,
    required: true,
  },
  correctAnswersCount: {
    type: Number,
    required: true,
  },
});
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
