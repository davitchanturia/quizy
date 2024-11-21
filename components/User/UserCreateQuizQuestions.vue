<template>
  <div>
    <Button @click="validate">validate</Button>
    <Form
      v-for="(question, questionIndex) in questions"
      :key="questionIndex"
      class="mt-5"
      :resolver="validate"
      :validate-on-value-update="false"
      :validate-on-blur="true"
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
          @click="removeQuestion(questionIndex)"
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
              @change="markCorrectAnswer(questionIndex, answerIndex)"
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
              @click="removeAnswer(questionIndex, answerIndex)"
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
          @click="addNewAnswer(questionIndex)"
        />
      </div>
    </Form>

    <Button
      icon="pi pi-plus"
      aria-label="Save"
      class="!w-full mt-7"
      severity="secondary"
      label="Question"
      @click="addNewQuestion"
    />

    <div class="flex pt-6 justify-between">
      <slot name="actions" :disable-next-button="true"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuizCreateStore } from "~/store/useQuizCreateStore";

const {
  questions,
  addNewQuestion,
  removeQuestion,
  addNewAnswer,
  removeAnswer,
  markCorrectAnswer,
} = useQuizCreateStore();

const { errors, validate } = useQuizValidation(toRef(questions));
</script>
