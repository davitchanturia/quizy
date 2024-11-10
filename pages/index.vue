<template>
  <NuxtLayout name="main">
    <div class="w-full flex gap-4">
      <QuizFiltersSkeleton v-if="showFiltersSkeleton" />
      <QuizFilters v-else :filters @reset-filters="resetFilters" />

      <div class="flex-1">
        <div v-if="loading" class="flex flex-wrap gap-5">
          <QuizCardSkeleton v-for="item in 8" :key="item" />
        </div>
        <div v-else class="flex flex-wrap gap-5">
          <QuizCard
            v-for="quiz in quizzes"
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
const { quizzes, loading, filters, filtersAreInitial, resetFilters } =
  useQuizes();

const showFiltersSkeleton = computed(
  () => loading.value && filtersAreInitial.value
);
</script>
