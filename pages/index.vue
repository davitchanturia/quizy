<template>
  <NuxtLayout name="main">
    <div class="w-full flex gap-4">
      <QuizzesFilters />

      <div class="flex-1">
        <div v-if="loading" class="flex flex-wrap gap-5">
          <QuizCardSkeleton v-for="item in 8" :key="item" />
        </div>
        <div v-else class="flex flex-wrap gap-5">
          <QuizCard
            v-for="quiz in quizesData"
            :key="quiz.id"
            :title="quiz.title"
            :category="quiz.category.name"
            :difficulty="quiz.difficulty"
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

console.log(quizesData);
</script>
