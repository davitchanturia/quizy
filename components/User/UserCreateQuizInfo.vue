<template>
  <div class="mt-5">
    <Form
      :resolver
      :initial-values="quizCreateStore.initialQuizDetails"
      :validate-on-blur="true"
      class="mt-4"
    >
      <FormField v-slot="$field" name="title" class="flex flex-col gap-1">
        <InputText
          v-model="quizCreateStore.quizDetails.title"
          type="text"
          name="title"
          placeholder="Title"
          class="!bg-transparent w-full !text-gray-600"
        />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>

      <FormField
        v-slot="$field"
        name="description"
        class="flex flex-col gap-1 mt-4"
      >
        <Textarea
          v-model="quizCreateStore.quizDetails.description"
          rows="5"
          cols="30"
          class="!bg-transparent w-full !text-gray-600"
          placeholder="Description"
        />

        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>

      <div class="grid grid-cols-2 gap-3">
        <FormField
          v-slot="$field"
          name="category"
          class="flex flex-col gap-1 mt-4"
        >
          <Select
            v-model="quizCreateStore.quizDetails.category"
            name="category"
            :options="categoryOptions"
            option-label="name"
            option-value="id"
            placeholder="Select a Category"
            fluid
          />

          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>

        <FormField
          v-slot="$field"
          name="difficulty"
          initial-value=""
          class="flex flex-col gap-1 mt-4"
        >
          <Select
            v-model="quizCreateStore.quizDetails.difficulty"
            name="difficulty"
            :options="difficultyOptions"
            option-label="name"
            option-value="value"
            placeholder="Select a difficulty"
            fluid
          />

          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
      </div>

      <div class="flex pt-6 justify-end">
        <slot
          name="actions"
          :disable-next-button="!quizCreateStore.quizDetailsAreValid"
        ></slot>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { yupResolver } from "@primevue/forms/resolvers/yup";
import { getQuizCategories } from "~/services/quiz";
import { useQuizCreateStore } from "~/store/useQuizCreateStore";
import { quizDetailsSchema } from "~/utils/validationRules/quiz";

const resolver = yupResolver(quizDetailsSchema);

const quizCreateStore = useQuizCreateStore();

const categoryOptions = ref();
const difficultyOptions = [
  { name: "Easy", value: "easy" },
  { name: "Medium", value: "medium" },
  { name: "Hard", value: "hard" },
];

categoryOptions.value = await getQuizCategories();
</script>
