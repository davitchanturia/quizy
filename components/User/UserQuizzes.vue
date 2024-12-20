<template>
  <div>
    <div v-if="quizzes.length === 0">You have not created quizzes yet</div>

    <div class="flex items-center gap-3 mt-2">
      <UserCreateQuizDialog @quiz-created="updateQuizzesHandler" />
      <Button
        v-if="selectedQuizzes.length > 0"
        icon="pi pi-trash"
        variant="text"
        label="Delete quizzes"
        severity="secondary"
        @click="deleteQuizzesHandler"
      />
    </div>

    <Card v-if="quizzes.length > 0" class="w-full mt-7">
      <template #content>
        <DataTable
          v-model:editing-rows="editingRows"
          v-model:selection="selectedQuizzes"
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
          @row-select-all="selectAll = true"
          @row-unselect-all="selectAll = false"
          @row-edit-save="onRowEditSave"
        >
          <Column selection-mode="multiple" header-style="width: 3rem"></Column>

          <Column field="title" header="Title">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" fluid />
            </template>
          </Column>

          <Column field="category" header="Category">
            <template #editor="{ data, field }">
              <Select
                v-model="data[field]"
                :options="categoryOptions"
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

          <Column field="questionsData" header="Questions">
            <template #body="slotProps">
              <Button
                severity="secondary"
                class="text-sm"
                @click="openQuestionsDialog(slotProps.data.id)"
                >Open</Button
              >
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

    <UserEditQuizQuestionsDialog
      v-model="showEditQuestionsDialog"
      :questions="selectedQuestions"
      @add-new-question="addNewQuestion"
      @mark-correct-answer="markCorrectAnswer"
      @remove-question="removeQuestion"
      @add-new-answer="addNewAnswer"
      @remove-answer="removeAnswer"
      @update-questions="updateQuestions"
    />

    <Toast />
  </div>
</template>

<script setup lang="ts">
import { getUserQuizzes } from "~/services/user";
import { deleteQuizzes, getQuizCategories, updateQuiz } from "~/services/quiz";
import type { Quiz } from "~/utils/types/quiz";
import { useUserStore } from "~/store/useUserStore";

const userStore = useUserStore();

const userQuizzes = () => {
  const quizzes = ref<Quiz[]>([]);

  const updateQuizzesHandler = async (newQuiz: Quiz) => {
    quizzes.value.push(newQuiz);
  };

  const fetchUserQuizzes = async () => {
    try {
      const response = await getUserQuizzes(userStore.user?.id);
      quizzes.value = response as Quiz[];
    } catch (error) {
      console.log(error);
    }
  };

  return {
    quizzes,
    fetchUserQuizzes,
    updateQuizzesHandler,
  };
};

const { quizzes, fetchUserQuizzes, updateQuizzesHandler } = userQuizzes();

onBeforeMount(async () => {
  await fetchUserQuizzes();
});

const useDeleteQuiz = () => {
  const selectedQuizzes = ref([]);
  const selectAll = ref(false);

  const toast = useToast();

  const deleteQuizzesHandler = async () => {
    const ids = selectedQuizzes.value.map((quiz) => quiz?.id);

    try {
      await deleteQuizzes(ids, selectAll.value);
      quizzes.value = quizzes.value.filter((quiz) => !ids.includes(quiz.id));
      toast.add({
        severity: "success",
        summary: `${ids.length === 1 ? "Quiz" : "Quizzes"} deleted successfully `,
        life: 3000,
      });

      selectedQuizzes.value = [];
    } catch (error) {
      console.log(error);
      toast.add({
        severity: "error",
        summary: "Unable to delete quizzes, try again later",
        life: 3000,
      });
    }
  };

  return {
    selectedQuizzes,
    selectAll,
    deleteQuizzesHandler,
  };
};

const { selectedQuizzes, selectAll, deleteQuizzesHandler } = useDeleteQuiz();

const categoryOptions = ref();

const difficultyOptions = ref([
  { name: "Easy", value: "easy" },
  { name: "Medium", value: "medium" },
  { name: "Hard", value: "hard" },
]);

categoryOptions.value = await getQuizCategories();

const editingRows = ref([]);

const onRowEditSave = async (event: any) => {
  const { newData, index } = event;
  quizzes.value[index] = newData;
  const { id, title, category, is_active, difficulty } = quizzes.value[index];

  const updatedQuiz = {
    id,
    title,
    category_id: category?.id,
    is_active,
    difficulty,
  };

  await updateQuiz(updatedQuiz);
};

const {
  showEditQuestionsDialog,
  selectedQuestions,
  openQuestionsDialog,
  addNewQuestion,
  removeQuestion,
  addNewAnswer,
  removeAnswer,
  markCorrectAnswer,
  updateQuestions,
} = useUpdateQuizQuestions(quizzes);
</script>
