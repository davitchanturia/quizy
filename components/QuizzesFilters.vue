<template>
  <div class="w-64">
    <Card>
      <template #content>
        <div>
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold">Filters</h3>
            <Button
              label="Clear"
              class="p-button-text !text-xs"
              size="small"
              @click="emit('resetFilters')"
            />
          </div>
          <div class="mt-4 mb-6">
            <InputText
              v-model="filters.search"
              name="search"
              type="text"
              placeholder="search..."
              size="small"
              class="w-full"
            />
          </div>

          <Divider />

          <div class="mt-4 mb-6">
            <div>Categories:</div>
            <MultiSelect
              v-model="filters.categories"
              :options="categoryOptions"
              option-label="name"
              filter
              placeholder="Select Categories"
              :max-selected-labels="3"
              class="w-full mt-2"
              size="small"
              option-value="id"
            />
          </div>

          <Divider />

          <div class="mt-4 mb-6">
            <div>Difficulty:</div>
            <div class="flex flex-col gap-4 mt-2 text-sm">
              <div
                v-for="(label, value) in difficultyOptions"
                :key="value"
                class="flex items-center gap-2"
              >
                <RadioButton
                  v-model="filters.difficulty"
                  :input-id="value"
                  name="difficulty"
                  :value="value"
                />
                <label for="ingredient1"> {{ label }} </label>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { getQuizCategories } from "~/services/quiz";

const { filters } = defineProps(["filters"]);

const emit = defineEmits<{
  (e: "resetFilters"): void;
}>();

const difficultyOptions = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const categoryOptions = await getQuizCategories();
</script>
