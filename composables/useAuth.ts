import type { loginForm, registerForm } from "~/utils/types/auth";
import { useUserStore } from "~/store/useUserStore";

export const useAuth = () => {
  const config = useRuntimeConfig();
  const CSRF_TOKEN = useCookie("XSRF-TOKEN");

  const userStore = useUserStore();

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-XSRF-TOKEN": CSRF_TOKEN.value || "",
  });

  const csrfCookie = async (): Promise<void> => {
    await $fetch(`${config.public.BACKEND_BASE_URL}/sanctum/csrf-cookie`, {
      credentials: "include",
    });
  };

  const authRequest = async (
    endpoint: string,
    formData?: registerForm | loginForm
  ): Promise<any> => {
    await csrfCookie();
    return await $fetch(`${config.public.BACKEND_BASE_URL}${endpoint}`, {
      method: "POST",
      body: formData,
      headers: getAuthHeaders(),
      credentials: "include",
    });
  };

  const registerUser = async (formData: registerForm): Promise<void> => {
    try {
      await authRequest("/register", formData);
      await userStore.fetchUser();
      navigateTo("/");
    } catch (error) {
      throw new Error("register error");
    }
  };

  const loginUser = async (formData: loginForm): Promise<void> => {
    try {
      await authRequest("/login", formData);
      await userStore.fetchUser();
      navigateTo("/");
    } catch (error) {
      throw new Error("login error");
    }
  };

  const logoutUser = async (): Promise<void> => {
    try {
      await authRequest("/logout");
      userStore.logout();
      navigateTo("/login");
    } catch (error) {
      throw new Error("logout error");
    }
  };

  return { csrfCookie, registerUser, loginUser, logoutUser };
};
