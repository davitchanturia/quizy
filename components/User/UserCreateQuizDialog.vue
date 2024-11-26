<template>
  <div class="">
    <Button label="Create quiz" @click="showCreateDialog = true" />
    <Dialog
      v-model:visible="showCreateDialog"
      modal
      :style="{ width: '50%' }"
      maximizable
    >
      <div class="w-full max-w-5xl mx-auto">
        <Stepper value="1" linear class="basis-[50rem]">
          <StepList>
            <Step value="1">Quiz Details</Step>
            <Step value="2">Questions</Step>
            <Step value="3">Review</Step>
          </StepList>
          <StepPanels>
            <StepPanel v-slot="{ activateCallback }" value="1">
              <UserCreateQuizInfo>
                <template #actions="{ disableNextButton }">
                  <Button
                    label="Next"
                    icon="pi pi-arrow-right"
                    :disabled="disableNextButton"
                    type="submit"
                    @click="activateCallback('2')"
                  />
                </template>
              </UserCreateQuizInfo>
            </StepPanel>

            <StepPanel v-slot="{ activateCallback }" value="2">
              <UserCreateQuizQuestions>
                <template #default="{ disableNextButton }">
                  <Button
                    label="Back"
                    severity="secondary"
                    icon="pi pi-arrow-left"
                    @click="activateCallback('1')"
                  />
                  <Button
                    label="Next"
                    icon="pi pi-arrow-right"
                    icon-pos="right"
                    type="submit"
                    :disabled="disableNextButton"
                    @click="activateCallback('3')"
                  />
                </template>
              </UserCreateQuizQuestions>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="3">
              <UserCreateQuizReview>
                <div class="flex pt-6 justify-between">
                  <Button
                    label="Back"
                    severity="secondary"
                    icon="pi pi-arrow-left"
                    @click="activateCallback('2')"
                  />

                  <Button
                    label="Create"
                    icon-pos="right"
                    @click="createNewQuiz"
                  />
                </div>
              </UserCreateQuizReview>
            </StepPanel>
          </StepPanels>
        </Stepper>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useQuizCreateStore } from "~/store/useQuizCreateStore";
import UserCreateQuizReview from "./UserCreateQuizReview.vue";
import { createQuiz } from "~/services/quiz";
import type { Quiz } from "~/utils/types/quiz";

const emit = defineEmits<{
  (e: "quizCreated", quiz: Quiz): void;
}>();

const showCreateDialog = ref(false);

const quizCreateStore = useQuizCreateStore();

const createNewQuiz = async () => {
  const newQuiz = {
    info: quizCreateStore.quizDetails,
    questions: quizCreateStore.questions,
  };

  try {
    const createdQuiz = await createQuiz(newQuiz);

    emit("quizCreated", createdQuiz);
    showCreateDialog.value = false;
  } catch (error) {
    console.log(error);
  }
};
</script>
