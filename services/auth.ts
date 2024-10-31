import type { User } from "~/utils/types/auth";

export const getUser = async (): Promise<User> => {
  const config = useRuntimeConfig();

  const user = await $fetch(`${config.public.API_BASE_URL}/user`, {
    headers: {
      contentType: "application/json",
      accept: "application/json",
    },
    credentials: "include",
  });

  return user as User;
};
