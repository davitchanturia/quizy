<template>
  <div class="w-80 relative">
    <div
      v-if="isCompleted"
      class="absolute bottom-0 right-0 chip-success-background px-3 py-1 rounded-br-md rounded-tl-md primary-text"
    >
      Completed
    </div>
    <Card
      class="w-full h-full cursor-pointer hover:"
      @click="navigateTo(`/quiz/${id}`)"
    >
      <template #header>
        <div class="flex justify-between items-center p-4">
          <div class="flex flex-end justify-end h-full">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6385/6385037.png"
              class="w-12 h-12"
            />
          </div>
          <Chip :label="category" class="text-sm capitalize" />
        </div>
      </template>

      <template #title>
        <div>{{ title }}</div>
      </template>

      <template #footer>
        <div class="flex text-sm">
          <div class="flex items-center gap-2">
            <i class="pi pi-chart-bar"></i>
            <span class="capitalize">{{ difficulty }}</span>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
const { title, category, difficulty, id, isCompleted } = defineProps([
  "title",
  "category",
  "difficulty",
  "id",
  "isCompleted",
]);
</script>
