<template>
  <Form
    :resolver="validate"
    :validate-on-value-update="false"
    :validate-on-blur="true"
  >
    <div
      v-for="(question, questionIndex) in questions"
      :key="questionIndex"
      class="mt-5"
    >
      <!-- question -->
      <div class="flex items-center gap-3">
        <div class="text-2xl">{{ questionIndex + 1 }}.</div>
        <div class="w-full">
          <InputText
            v-model="question.content"
            type="text"
            fluid
            name="question"
          />
        </div>
        <Button
          icon="pi pi-trash"
          aria-label="Save"
          severity="secondary"
          @click="emit('removeQuestion', questionIndex)"
        />
      </div>

      <div v-if="errors[questionIndex]?.question.length > 0" class="pl-9 mt-1">
        <Message
          v-for="(error, errorIndex) in errors[questionIndex]?.question"
          :key="errorIndex"
          severity="error"
          size="small"
          variant="simple"
          >{{ error }}</Message
        >
      </div>

      <!-- answers -->
      <div v-if="question.answers?.length > 0" class="mt-7">
        <div
          v-for="(answer, answerIndex) in question.answers"
          :key="answerIndex"
          class="mt-3 pl-9"
        >
          <div class="flex items-center justify-between gap-3">
            <RadioButton
              v-model="answer.is_correct"
              :input-id="questionIndex.toString()"
              name="dynamic"
              :value="true"
              :form-control="{ validateOnValueUpdate: true }"
              @change="emit('markCorrectAnswer', questionIndex, answerIndex)"
            />

            <InputText
              v-model="answer.content"
              type="text"
              fluid
              :name="'answer' + questionIndex"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Save"
              severity="secondary"
              @click="emit('removeAnswer', questionIndex, answerIndex)"
            />
          </div>

          <Message
            v-if="errors[questionIndex]?.answers.length > 0"
            severity="error"
            size="small"
            variant="simple"
            class="pl-7 mt-1"
            >{{ errors[questionIndex].answers[answerIndex] }}</Message
          >
        </div>
      </div>

      <div class="pl-9">
        <Button
          icon="pi pi-plus"
          aria-label="Save"
          class="!w-full mt-7"
          severity="secondary"
          label="Answer"
          @click="emit('addNewAnswer', questionIndex)"
        />
      </div>
    </div>

    <Button
      icon="pi pi-plus"
      aria-label="Save"
      class="!w-full mt-7"
      severity="secondary"
      label="Question"
      @click="addNewQuestionHandler"
    />

    <div class="flex pt-6 justify-between">
      <slot
        name="actions"
        :disable-next-button="!formIsValid || questions.length === 0"
      >
        <Button @click="emit('updateQuestions', questions)"
          >Update Questions</Button
        >
      </slot>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import type { QuizQuestion } from "~/utils/types/quiz";

const { questions } = defineProps<{
  questions: QuizQuestion[];
}>();

const emit = defineEmits<{
  (e: "removeQuestion" | "addNewAnswer", index: number): void;
  (
    e: "markCorrectAnswer" | "removeAnswer",
    questionIndex: number,
    answerIndex: number
  ): void;
  (e: "addNewQuestion"): void;
  (e: "updateQuestions", questions: QuizQuestion[]): void;
}>();

const { errors, validate, formIsValid } = useQuizValidation(
  toRef(() => questions)
);

const addNewQuestionHandler = () => {
  emit("addNewQuestion");
  formIsValid.value = false;
};
</script>
