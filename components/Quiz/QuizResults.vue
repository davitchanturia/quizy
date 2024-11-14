<template>
  <div class="w-full h-full px-4">
    <div class="flex items-center gap-3">
      <img :src="fullAvatarUrl" class="w-10 h-10 rounded-full" />
      <div>{{ userStore.user?.name }}</div>
    </div>

    <Divider />

    <div class="w-full grid grid-cols-2">
      <div class="col-span-1 font-bold text-xl">Quiz title goes here</div>
      <div class="col-span-1 flex justify-end gap-5">
        <div class="flex flex-col gap-1">
          <div class="text-sm secondary-text">Accuracy</div>
          <div class="text-sm">chart</div>
        </div>

        <div class="flex flex-col gap-1">
          <div class="text-sm secondary-text">Answered</div>
          <div class="text-sm font-light">19/20</div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="text-sm secondary-text">quiz created at goes here</div>
        <span> &#8226; </span>
        <div class="text-sm secondary-text">20 Questions</div>
      </div>
    </div>

    <QuizResultsTimeline />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/store/useUserStore";

const config = useRuntimeConfig();

const userStore = useUserStore();

const fullAvatarUrl = `${config.public.BACKEND_BASE_URL}/storage/${userStore?.user?.avatar}`;
</script>
