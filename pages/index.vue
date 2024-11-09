<template>
  <NuxtLayout name="main">
    <div class="w-full flex gap-4">
      <QuizzesFilters />

      <!-- content goes here -->
      <div class="flex-1">
        <div v-if="loading">loading...</div>
        <div v-else class="flex flex-wrap gap-5">
          <QuizCard
            v-for="quiz in quizesData"
            :key="quiz.id"
            :title="quiz.title"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import QuizzesFilters from "~/components/QuizzesFilters.vue";

const { quizes, loading } = useQuizes();

const quizesData = computed(() => quizes.value);
</script>
