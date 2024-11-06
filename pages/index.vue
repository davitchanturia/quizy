<template>
  <NuxtLayout name="main">
    <h1>home page</h1>

    <button @click="logout">logout</button>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// definePageMeta({
//   middleware: ["auth-required"],
// });
// const config = useRuntimeConfig();

// const token = useCookie("XSRF-TOKEN");

// const { data, execute } = useFetch(`${config.public.API_BASE_URL}/user`, {
//   headers: {
//     contentType: "application/json",
//     accept: "application/json",
//   },
//   credentials: "include",
//   immediate: false,
// });

const { logoutUser } = useAuth();

const logout = () => {
  logoutUser();
};
</script>
