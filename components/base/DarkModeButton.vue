<template>
  <Button :severity @click="darkModeStore.toggleDarkMode()">
    <i
      v-if="darkModeStore.darkModeEnabled"
      class="pi pi-moon"
      style="font-size: 1rem"
    ></i>
    <i v-else class="pi pi-sun" style="font-size: 1rem"></i>
  </Button>
</template>

<script setup lang="ts">
import { useDarkMode } from "~/store/useDarkMode";

const { severity } = defineProps({
  severity: {
    type: String,
    default: "secondary",
  },
});

const darkModeStore = useDarkMode();
</script>
