<template>
  <NuxtLayout name="main">
    <div class="w-full flex gap-4">
      <Filters />

      <!-- content goes here -->
      <div class="flex-1"></div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Filters from "~/components/base/filters.vue";

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
</script>
