import type { loginForm, registerForm } from "~/utils/types/auth";

export const useAuth = () => {
  const config = useRuntimeConfig();
  const CSRF_TOKEN = useCookie("XSRF-TOKEN");

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-XSRF-TOKEN": CSRF_TOKEN.value || "",
  });

  const csrfCookie = async () => {
    await $fetch(`${config.public.BACKEND_BASE_URL}/sanctum/csrf-cookie`, {
      credentials: "include",
    });
  };

  const authRequest = async (
    endpoint: string,
    formData?: registerForm | loginForm
  ) => {
    await csrfCookie();
    return await $fetch(`${config.public.BACKEND_BASE_URL}${endpoint}`, {
      method: "POST",
      body: formData,
      headers: getAuthHeaders(),
      credentials: "include",
    });
  };

  const registerUser = async (formData: registerForm) => {
    try {
      await authRequest("/register", formData);
    } catch (error) {
      throw new Error("register error");
    }
  };

  const loginUser = async (formData: loginForm) => {
    try {
      await authRequest("/login", formData);
    } catch (error) {
      throw new Error("login error");
    }
  };

  const logoutUser = async () => {
    try {
      await authRequest("/logout");
    } catch (error) {
      throw new Error("logout error");
    }
  };

  return { csrfCookie, registerUser, loginUser, logoutUser };
};
