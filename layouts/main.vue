<template>
  <div>
    <div class="w-full py-5 bg-primary">navbar</div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/useUserStore";

const userStore = useUserStore();
</script>
