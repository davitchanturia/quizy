import type { registerForm } from "~/utils/types/auth";

export const useAuth = () => {
  const config = useRuntimeConfig();

  const csrf = async () => {
    await $fetch(`${config.public.BACKEND_BASE_URL}/sanctum/csrf-cookie`, {
      credentials: "include", // Important to send credentials (cookies)
    });
  };

  const registerUser = async (formData: registerForm) => {
    await csrf();

    const CSRF_TOKEN = useCookie("XSRF-TOKEN");

    try {
      await $fetch(`${config.public.BACKEND_BASE_URL}/register`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": CSRF_TOKEN.value || "",
        },
        credentials: "include",
      });
    } catch (error) {
      console.log("register error", error);
    }
  };
  return { csrf, registerUser };
};
