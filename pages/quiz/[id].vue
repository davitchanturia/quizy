<template>
  <NuxtLayout name="main">
    <div class="w-full pt-5">
      <div
        v-if="loading"
        class="flex justify-center items-center w-ful h-screen"
      >
        <ProgressSpinner />
      </div>

      <div v-else>
        <h3 class="text-sm">{{ quiz?.owner?.name }}</h3>

        <div class="mt-4 flex items-center justify-between">
          <h1 class="text-xl">{{ quiz?.title }}</h1>

          <div class="flex items-center gap-5">
            <div class="flex items-center gap-2 text-xs">
              <i class="pi pi-chart-bar"></i>
              <span class="capitalize">{{ quiz?.difficulty }}</span>
            </div>

            <Chip :label="quiz?.category.name" class="text-sm capitalize" />
          </div>
        </div>

        <div class="w-full mt-8">{{ quiz?.description }}</div>

        <Button class="mt-5" @click="showDialog = true">Stat quiz</Button>

        <Dialog
          v-model:visible="showDialog"
          maximizable
          modal
          :style="{ width: '80vw' }"
          :breakpoints="{ '1199px': '80vw', '575px': '90vw' }"
        >
          <QuizPlay />
        </Dialog>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { getQuiz } from "~/services/quiz";

const useQuiz = () => {
  const route = useRoute();

  const quiz = ref();
  const loading = ref(false);

  const getQuizData = async (): Promise<void> => {
    try {
      loading.value = true;
      const quizData = await getQuiz(route.params.id as string);
      quiz.value = quizData;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    quiz,
    loading,
    getQuizData,
  };
};

const { quiz, loading, getQuizData } = useQuiz();

onMounted(async () => {
  await getQuizData();
});

const showDialog = ref(false);
</script>
