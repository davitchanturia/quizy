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
        <InputText v-model="question.content" type="text" fluid />
        <Button
          icon="pi pi-trash"
          aria-label="Save"
          severity="secondary"
          @click="removeQuestion(questionIndex)"
        />
      </div>

      <!-- answers -->
      <div class="mt-7">
        <div
          v-for="(answer, answerIndex) in question.answers"
          :key="answerIndex"
          class="flex items-center justify-between gap-3 mt-3 pl-9"
        >
          <RadioButton v-model="answer.is_correct" name="question" />
          <InputText v-model="answer.content" type="text" fluid />
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
const {
  questions,
  addNewQuestion,
  removeQuestion,
  addNewAnswer,
  removeAnswer,
} = useQuizCreation();
</script>
