<template>
  <div>
    <ClientOnly>
      <div>auth status {{ userStore.isAuthenticated }}</div>
    </ClientOnly>
    <div>
      <div>
        <div><NuxtLink to="/">home</NuxtLink></div>
        <div><NuxtLink to="/about">about</NuxtLink></div>
        <div><NuxtLink to="/login">login</NuxtLink></div>
        <div><NuxtLink to="/register">register</NuxtLink></div>
      </div>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/useUserStore";

const userStore = useUserStore();
</script>
