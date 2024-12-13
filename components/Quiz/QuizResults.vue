<template>
  <div class="w-full h-full" :class="showHeader ? 'px-4' : ''">
    <div v-if="showHeader" class="flex items-center gap-3">
      <UserAvatar />
      <div>{{ userStore.user?.name }}</div>
    </div>

    <Divider v-if="showHeader" />

    <div class="w-full grid grid-cols-1 sm:grid-cols-2">
      <div class="col-span-1 font-bold text-xl">{{ data.title }}</div>
      <div class="col-span-1 flex sm:justify-end gap-10">
        <div class="flex flex-col gap-1">
          <div class="text-sm secondary-text">Accuracy</div>
          <div class="text-base font-medium">{{ accuracy }} %</div>
        </div>

        <div class="flex flex-col gap-1">
          <div class="text-sm secondary-text">Answered</div>
          <div class="text-base font-light">
            <span class="font-medium"> {{ correctAnswersCount }}</span> /
            <span class="secondary-text"> {{ data.questions_count }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <div class="text-sm secondary-text">
        Quiz created at {{ data.created_at }}
      </div>
      <span> &#8226; </span>
      <div class="text-sm secondary-text">
        {{ data.questions_count }} Questions
      </div>
    </div>

    <QuizResultsTimeline
      :questions="data.questions"
      :in-correct-answers-count
      :correct-answers-count
    />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/store/useUserStore";
import type { QuizResult } from "~/utils/types/quiz";
import UserAvatar from "../base/UserAvatar.vue";

const userStore = useUserStore();

const { data } = defineProps({
  data: {
    type: Object as PropType<QuizResult>,
    required: true,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
});

const correctAnswersCount = computed(
  () => data.questions.filter((question: any) => question.is_correct).length
);

const inCorrectAnswersCount = computed(
  () => data.questions_count - correctAnswersCount.value
);

const accuracy = computed(() =>
  Math.round(
    (correctAnswersCount.value / data.questions_count) * 100
  ).toString()
);
</script>
