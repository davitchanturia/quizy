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

        <div
          v-if="quiz?.is_completed || results.is_completed"
          class="mt-10 flex items-center gap-5"
        >
          <Button class="w-64" @click="showTryAgainDialog = true"
            >Try quiz again</Button
          >
          <Divider align="center" type="solid">
            <b>OR</b>
          </Divider>
          <Button class="w-64" severity="secondary" @click="showResultsHandler"
            >View results</Button
          >
        </div>

        <Button v-else class="mt-5" @click="showQuizDialog = true"
          >Stat quiz</Button
        >

        <Dialog
          v-model:visible="showQuizDialog"
          maximizable
          modal
          :style="{ width: '80vw' }"
          :breakpoints="{ '1199px': '80vw', '575px': '90vw' }"
          @update:visible="closeQuizDialog"
        >
          <QuizResults v-if="showResults" :data="results" />
          <QuizPlay v-else @submit="sendQuiz" />

          <div v-if="loadingQuizResults">submitting quiz...</div>
        </Dialog>

        <Dialog
          v-model:visible="showTryAgainDialog"
          modal
          header="Your current results will be reset? Are you sure you want to try again?"
          :style="{ width: '50vw' }"
          :breakpoints="{ '1220px': '30vw', '1024px': '50vw', '610px': '90vw' }"
        >
          <div class="flex justify-end items-center gap-3">
            <Button
              label="cancel"
              severity="link"
              @click="showTryAgainDialog = false"
            />
            <Button label="Reset" @click="tryQuizAgain" />
          </div>
        </Dialog>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { getQuiz, storeQuiz, getQuizResults } from "~/services/quiz";
import { useQuizStore } from "~/store/useQuizStore";
import { useUserStore } from "~/store/useUserStore";
import type { Choice, QuizResult } from "~/utils/types/quiz";

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

  const tryQuizAgain = () => {
    quizStore.resetChoices();
    showQuizDialog.value = true;
    showTryAgainDialog.value = false;
  };

  return {
    quiz,
    loading,
    getQuizData,
    tryQuizAgain,
  };
};

const { quiz, loading, getQuizData, tryQuizAgain } = useQuiz();

onMounted(async () => {
  await getQuizData();
});

const showQuizDialog = ref(false);
const showTryAgainDialog = ref(false);

const closeQuizDialog = () => {
  showQuizDialog.value = false;
  showResults.value = false;
};

const quizResults = () => {
  const showResults = ref<boolean>(false);
  const loadingQuizResults = ref(false);

  const results = ref<QuizResult>({
    category: "",
    difficulty: "easy",
    owner: "",
    created_at: "",
    questions: [],
    questions_count: 0,
    quiz_id: 0,
    title: "",
    is_completed: false,
  });

  const userStore = useUserStore();

  const sendQuiz = async (quizData: Choice[]) => {
    try {
      loadingQuizResults.value = true;
      const res = await storeQuiz(quizData, quizId, userStore.user?.id);

      results.value = res as QuizResult;
      showResults.value = true;
    } catch (error) {
      console.log(error);
    } finally {
      loadingQuizResults.value = false;
    }
  };

  const getQuizResultsData = async (): Promise<void> => {
    try {
      loadingQuizResults.value = true;
      const resultsData = await getQuizResults(quizId);
      results.value = resultsData;
    } catch (error) {
      console.log(error);
    } finally {
      loadingQuizResults.value = false;
    }
  };

  const showResultsHandler = async () => {
    if (results.value.questions.length !== 0) {
      showResults.value = true;
      showQuizDialog.value = true;
      return;
    }

    await getQuizResultsData();
    showResults.value = true;
    showQuizDialog.value = true;
  };

  return {
    showResults,
    loadingQuizResults,
    sendQuiz,
    results,
    showResultsHandler,
  };
};

const {
  showResults,
  loadingQuizResults,
  sendQuiz,
  results,
  showResultsHandler,
} = quizResults();
</script>
