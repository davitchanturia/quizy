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

  const registerUser = async (formData: registerForm): Promise<any> => {
    await csrfCookie();

    try {
      const response = await $fetch(
        `${config.public.BACKEND_BASE_URL}/register`,
        {
          method: "POST",
          body: formData,
          headers: getAuthHeaders(),
          credentials: "include",
        }
      );

      await userStore.fetchUser();
      await navigateTo("/");

      return response;
    } catch (error: any) {
      const errorMessage =
        error.response?._data?.message || "An unexpected error occurred";

      throw errorMessage;
    }
  };

  const loginUser = async (formData: loginForm): Promise<any> => {
    await csrfCookie();

    try {
      const response = await $fetch(`${config.public.BACKEND_BASE_URL}/login`, {
        method: "POST",
        body: formData,
        headers: getAuthHeaders(),
        credentials: "include",
      });

      return response;
    } catch (error: any) {
      const errorMessage =
        error.response?._data?.message || "An unexpected error occurred";

      throw errorMessage;
    }
  };

  const logoutUser = async (): Promise<any> => {
    try {
      const response = await $fetch(
        `${config.public.BACKEND_BASE_URL}/logout`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          credentials: "include",
        }
      );

      userStore.logout();
      await navigateTo("/login");

      return response;
    } catch (error: any) {
      const errorMessage = error.response?._data?.errors
        ? error.response._data.errors
        : error.response?._data?.message || "An unexpected error occurred";

      throw errorMessage;
    }
  };

  return { csrfCookie, registerUser, loginUser, logoutUser };
};
