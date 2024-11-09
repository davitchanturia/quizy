<template>
  <NuxtLayout name="main">
    <div class="w-full flex gap-4">
      <Filters />

      <!-- content goes here -->
      <div class="flex-1">
        <div v-if="loading">loading...</div>
        <div v-else>
          <div v-for="quiz in quizesData" :key="quiz.id">{{ quiz.title }}</div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Filters from "~/components/base/Filters.vue";

const { quizes, loading } = useQuizes();

const quizesData = computed(() => quizes.value);
</script>
