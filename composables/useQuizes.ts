import { getQuizes } from "~/services/quiz";
import type { Quiz, QuizzesFilters } from "~/utils/types/quiz";
import { useDebounceFn } from "@vueuse/core";

export const useQuizes = () => {
  const filters = ref<QuizzesFilters>({
    search: "",
    categories: [],
    difficulty: [],
  });

  const resetFilters = (): void => {
    filters.value.search = "";
    filters.value.categories = [];
    filters.value.difficulty = [];
  };

  const quizes = ref<Quiz[]>([]);
  const loading = ref(false);

  const fetchQuizzes = async (): Promise<void> => {
    loading.value = true;

    try {
      const res = await getQuizes(filters.value);
      quizes.value = res;
    } catch (error) {
      console.error("Error fetching quizes:", error);
    } finally {
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    }
  };

  const debouncedRequest = useDebounceFn(fetchQuizzes, 1000);

  watch(filters, debouncedRequest, { deep: true });

  fetchQuizzes();

  return {
    filters,
    resetFilters,
    quizes,
    loading,
    fetchQuizzes,
  };
};