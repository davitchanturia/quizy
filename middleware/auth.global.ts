import { useUserStore } from "~/store/useUserStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  const authPages: string[] = ["/login", "/register"];

  await userStore.fetchUser();

  if (!userStore.isAuthenticated && !authPages.includes(to.path)) {
    return navigateTo("/login");
  }

  if (userStore.isAuthenticated && authPages.includes(to.path)) {
    return navigateTo("/");
  }
});
