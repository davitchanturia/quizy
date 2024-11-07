<template>
  <div class="w-64">
    <Card>
      <template #content>
        <div>
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold">Filters</h3>
            <Button label="Clear" class="p-button-text !text-xs" size="small" />
          </div>
          <div class="mt-4 mb-6">
            <InputText
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
              v-model="selectedCategories"
              :options="categories"
              option-label="name"
              filter
              placeholder="Select Categories"
              :max-selected-labels="3"
              class="w-full mt-2"
              size="small"
            />
          </div>

          <Divider />

          <div class="mt-4 mb-6">
            <div>Difficulty:</div>
            <div class="flex flex-col gap-4 mt-2 text-sm">
              <div class="flex items-center gap-2">
                <Checkbox
                  v-model="difficulty"
                  input-id="ingredient1"
                  name="difficulty"
                  value="Easy"
                />
                <label for="ingredient1"> Easy </label>
              </div>
              <div class="flex items-center gap-2">
                <Checkbox
                  v-model="difficulty"
                  input-id="ingredient2"
                  name="difficulty"
                  value="Medium"
                />
                <label for="ingredient2"> Medium </label>
              </div>
              <div class="flex items-center gap-2">
                <Checkbox
                  v-model="difficulty"
                  input-id="ingredient3"
                  name="difficulty"
                  value="Hard"
                />
                <label for="ingredient3"> Hard </label>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
const selectedCategories = ref();
const categories = ref([
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
]);

const difficulty = ref();
</script>
