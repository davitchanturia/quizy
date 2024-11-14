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
          <div v-if="showResults">results of the quiz</div>
          <QuizPlay v-else @submit="sendQuiz" />

          <div v-if="loadingQuizSubmission">saving quiz...</div>
        </Dialog>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { getQuiz, storeQuiz } from "~/services/quiz";
import { useQuizStore } from "~/store/useQuizStore";
import { useUserStore } from "~/store/useUserStore";
import type { Choice } from "~/utils/types/quiz";

const route = useRoute();

const quizId = route.params.id as string;

const useQuiz = () => {
  const quizStore = useQuizStore();

  const quiz = ref();
  const loading = ref(false);

  const getQuizData = async (): Promise<void> => {
    try {
      loading.value = true;
      const quizData = await getQuiz(quizId);

      quiz.value = quizData;
      quizStore.setQuestions(quizData.questions);
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

const submitQuiz = () => {
  const showResults = ref<boolean>(false);
  const loadingQuizSubmission = ref(false);

  const userStore = useUserStore();

  const sendQuiz = async (quizData: Choice[]) => {
    try {
      loadingQuizSubmission.value = true;
      await storeQuiz(quizData, quizId, userStore.user?.id);

      showResults.value = true;
    } catch (error) {
      console.log(error);
    } finally {
      loadingQuizSubmission.value = false;
    }
  };

  return {
    showResults,
    loadingQuizSubmission,
    sendQuiz,
  };
};

const { showResults, loadingQuizSubmission, sendQuiz } = submitQuiz();
</script>
