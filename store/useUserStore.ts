import { getUser } from "~/services/auth";
import type { User } from "~/utils/types/auth";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);

  const isAuthenticated = computed<boolean>(() => user.value !== null);

  const setUser = (neUser: User) => {
    user.value = neUser;
  };

  const fetchUser = async (): Promise<void> => {
    if (isAuthenticated.value) return;

    try {
      const response = await getUser();

      user.value = response as User;
    } catch (error) {}
  };

  const logout = () => (user.value = null);

  return { user, isAuthenticated, fetchUser, setUser, logout };
});
