<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useUserStore } from "./store/useUserStore";

const userStore = useUserStore();
await userStore.fetchUser();
</script>
