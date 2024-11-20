<template>
  <div>
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
          <!-- <Message
            v-if="$form.question?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.question.error?.message }}</Message
          > -->
        </div>
        <Button
          icon="pi pi-trash"
          aria-label="Save"
          severity="secondary"
          @click="removeQuestion(questionIndex)"
        />
      </div>

      <!-- answers -->
      <div v-if="question.answers?.length > 0" class="mt-7">
        <div
          v-for="(answer, answerIndex) in question.answers"
          :key="answerIndex"
          class="flex items-center justify-between gap-3 mt-3 pl-9"
        >
          <input
            type="radio"
            :name="'question' + questionIndex"
            @change="markCorrectAnswer(questionIndex, answerIndex)"
          />

          <InputText
            v-model="answer.content"
            type="text"
            fluid
            :name="'answer' + questionIndex"
          />
          <!-- <Message
            v-if="$form.answer?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.answer.error?.message }}</Message
          > -->
          <Button
            icon="pi pi-trash"
            aria-label="Save"
            severity="secondary"
            @click="removeAnswer(questionIndex, answerIndex)"
          />
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
    </div>

    <Button
      icon="pi pi-plus"
      aria-label="Save"
      class="!w-full mt-7"
      severity="secondary"
      label="Question"
      @click="addNewQuestion"
    />
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
</script>
