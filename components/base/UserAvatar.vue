<template>
  <div>
    <Avatar
      v-if="userStore.user?.avatar === null"
      :label="userNameFirstLetter"
      class="mr-2 uppercase"
      :size
      :shape
    />
    <Avatar v-else :image="fullAvatarUrl" class="mr-2" :size :shape />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/useUserStore";

const { size } = defineProps({
  size: {
    type: String as PropType<"normal" | "large" | "xlarge">,
    default: "normal",
  },
  shape: {
    type: String as PropType<"circle" | "square">,
    default: "circle",
  },
});

const config = useRuntimeConfig();
const userStore = useUserStore();

const fullAvatarUrl = `${config.public.BACKEND_BASE_URL}/storage/${userStore?.user?.avatar}`;

const userNameFirstLetter = computed(() => {
  if (userStore.user?.name) {
    return userStore.user?.name.charAt(0);
  }
  return "";
});
</script>
