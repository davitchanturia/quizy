<template>
  <Dialog v-model:visible="model" modal :style="{ width: '50%' }" maximizable>
    <div class="w-full max-w-5xl mx-auto">
      <SharedQuizQuestionsForm :questions="questions">
        <template #actions="{ disableNextButton }">
          <slot :disable-next-button />
        </template>
      </SharedQuizQuestionsForm>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import type { Question } from "~/utils/types/quiz";

const model = defineModel();

const { questions } = defineProps<{
  questions: Question[];
}>();
</script>
