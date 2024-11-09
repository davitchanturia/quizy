import type { Quiz } from "~/utils/types/quiz";

export const getQuizes = async (): Promise<Quiz[]> => {
  const config = useRuntimeConfig();

  const { data, error } = useFetch(`${config.public.API_BASE_URL}/quiz`, {
    credentials: "include",
  });

  if (error.value) {
    console.error("Failed to fetch data:", error.value);
  }

  console.log(data);

  return data.value as Quiz[];
};
