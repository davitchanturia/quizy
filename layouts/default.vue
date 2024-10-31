<template>
  <div>
    <div>auth status {{ userStore.isAuthenticated }}</div>
    <div>
      <ul>
        <li><NuxtLink to="/">home</NuxtLink></li>
        <li><NuxtLink to="/about">about</NuxtLink></li>
        <li><NuxtLink to="/login">login</NuxtLink></li>
        <li><NuxtLink to="/register">register</NuxtLink></li>
      </ul>
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
