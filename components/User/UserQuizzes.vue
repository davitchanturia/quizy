<template>
  <Card>
    <template #content>
      <DataTable
        v-model:editing-rows="editingRows"
        :value="quizzes"
        striped-rows
        edit-mode="row"
        data-key="id"
        :pt="{
          table: { style: 'min-width: 50rem' },
          column: {
            bodycell: ({ state }: any) => ({
              style:
                state['d_editing'] &&
                'padding-top: 0.75rem; padding-bottom: 0.75rem',
            }),
          },
        }"
        @row-edit-save="onRowEditSave"
      >
        <Column field="title" header="Title">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
          </template>
        </Column>

        <Column field="category" header="Category">
          <template #editor="{ data, field }">
            <Select
              v-model="data[field].name"
              :options="categoryOptions"
              option-value="name"
              option-label="name"
              placeholder="Select a Status"
              fluid
            >
              <template #option="slotProps">
                <Tag :value="slotProps.option.name" />
              </template>
            </Select>
          </template>
          <template #body="slotProps">
            <Tag :value="slotProps.data.category.name" />
          </template>
        </Column>

        <Column field="difficulty" header="Difficulty">
          <template #editor="{ data, field }">
            <Select
              v-model="data[field]"
              :options="difficultyOptions"
              option-label="name"
              option-value="value"
              placeholder="Select a difficulty level"
              fluid
            >
              <template #option="slotProps">
                <Tag :value="slotProps.option.name" />
              </template>
            </Select>
          </template>

          <template #body="slotProps">
            <Tag :value="slotProps.data.difficulty" />
          </template>
        </Column>

        <Column field="is_active" header="Status">
          <template #editor="{ data, field }">
            <Checkbox v-model="data[field]" binary variant="filled" />
          </template>
          <template #body="slotProps">
            <i
              v-if="slotProps.data.is_active"
              class="pi pi-check"
              style="color: green"
            ></i>
            <i v-else class="pi pi-times" style="color: red"></i>
          </template>
        </Column>

        <Column field="created_at" header="Created at"></Column>

        <Column
          :row-editor="true"
          style="width: 10%; min-width: 8rem"
          body-style="text-align:center"
        ></Column>
      </DataTable>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { getUserQuizzes } from "~/services/user";
import { getQuizCategories } from "~/services/quiz";
import type { Quiz } from "~/utils/types/quiz";
import { useUserStore } from "~/store/useUserStore";

const quizzes = ref<Quiz[]>([]);

const userStore = useUserStore();

try {
  const response = await getUserQuizzes(userStore.user?.id);
  quizzes.value = response as Quiz[];
} catch (error) {
  console.log(error);
}

const editingRows = ref([]);
const categoryOptions = ref();

const difficultyOptions = ref([
  { name: "Easy", value: "easy" },
  { name: "Medium", value: "medium" },
  { name: "Hard", value: "hard" },
]);

categoryOptions.value = await getQuizCategories();

const onRowEditSave = (event: any) => {
  const { newData, index } = event;

  quizzes.value[index] = newData;

  //TODO: send updated quizzes to backend
};
</script>
