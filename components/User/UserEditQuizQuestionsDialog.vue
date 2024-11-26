<template>
  <Dialog v-model:visible="model" modal :style="{ width: '50%' }" maximizable>
    <div class="w-full max-w-5xl mx-auto">{{ questions.length }}</div>
  </Dialog>
</template>

<script lang="ts" setup>
import type { Question } from "~/utils/types/quiz";

const model = defineModel();

const { questions } = defineProps<{
  questions: Question[];
}>();
</script>
