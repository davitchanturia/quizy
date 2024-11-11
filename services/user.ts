export const uploadAvatar = async (formdata: FormData): Promise<any> => {
  const config = useRuntimeConfig();
  const CSRF_TOKEN = useCookie("XSRF-TOKEN");

  const response = await $fetch(`${config.public.API_BASE_URL}/user/avatar`, {
    method: "POST",
    body: formdata,
    headers: {
      contentType: "application/json",
      accept: "application/json",
      "X-XSRF-TOKEN": CSRF_TOKEN.value || "",
    },
    credentials: "include",
  });

  return response;
};
