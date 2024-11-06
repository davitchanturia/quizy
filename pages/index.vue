<template>
  <NuxtLayout name="main">
    <h1>home page</h1>
    <ul>
      <li><NuxtLink to="/login">login</NuxtLink></li>
      <li><NuxtLink to="/register">register</NuxtLink></li>
    </ul>

    <!-- <div>{{ userStore.isAuthenticated || "no status" }}</div> -->

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
