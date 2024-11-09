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
              @click="resetFilters"
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
              :options="categoriesOptions"
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
                <RadioButton
                  v-model="filters.difficulty"
                  input-id="ingredient1"
                  name="difficulty"
                  value="Easy"
                />
                <label for="ingredient1"> Easy </label>
              </div>
              <div class="flex items-center gap-2">
                <RadioButton
                  v-model="filters.difficulty"
                  input-id="ingredient2"
                  name="difficulty"
                  value="Medium"
                />
                <label for="ingredient2"> Medium </label>
              </div>
              <div class="flex items-center gap-2">
                <RadioButton
                  v-model="filters.difficulty"
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
const { filters, resetFilters } = useQuizes();

const categoriesOptions = ref([
  { name: "JavaScript", code: "JS" },
  { name: "Python", code: "PY" },
  { name: "Java", code: "JAVA" },
  { name: "C++", code: "CPP" },
  { name: "C#", code: "CSHARP" },
  { name: "HTML & CSS", code: "HTMLCSS" },
  { name: "SQL", code: "SQL" },
  { name: "Ruby", code: "RUBY" },
  { name: "Go", code: "GO" },
  { name: "Rust", code: "RUST" },
  { name: "Swift", code: "SWIFT" },
  { name: "PHP", code: "PHP" },
  { name: "TypeScript", code: "TS" },
  { name: "Kotlin", code: "KOTLIN" },
  { name: "R", code: "R" },
]);
</script>
