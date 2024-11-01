import { useUserStore } from "~/store/useUserStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  const authPages: string[] = ["/login", "/register"];

  if (!userStore.isAuthenticated) {
    try {
      await userStore.fetchUser();
    } catch (error) {
      throw new Error("Error fetching user");
    }
  }

  if (!userStore.isAuthenticated && !authPages.includes(to.path)) {
    return navigateTo("/login");
  }

  if (userStore.isAuthenticated && authPages.includes(to.path)) {
    return navigateTo("/");
  }
});
