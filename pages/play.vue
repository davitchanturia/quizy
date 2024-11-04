<template>
  <div class="card flex justify-center">
    <Form
      :initial-values
      :resolver
      class="flex flex-col gap-4 w-full sm:w-80"
      :validate-on-blur="true"
      @submit="onFormSubmit"
    >
      <FormField
        v-slot="$field"
        name="email"
        initial-value=""
        class="flex flex-col gap-1"
      >
        <InputText type="text" placeholder="Email" />
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
        name="password"
        initial-value=""
        class="flex flex-col gap-1"
      >
        <InputText type="text" placeholder="Password" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>

      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import { useToast } from "primevue/usetoast";
import { userLoginSchema } from "~/utils/validationRules/auth";

const toast = useToast();

const initialValues = reactive({
  email: "",
  Password: "",
});

const resolver = yupResolver(userLoginSchema);

// const yupFirstNameResolver = yupResolver(
//   yup.string().required("First name is required via Yup.")
// );

const customPasswordResolver = ({ value }) => {
  const errors = [];

  if (!value) {
    errors.push({ message: "Password is required via Custom." });
  }

  return {
    errors,
  };
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({
      severity: "success",
      summary: "Form is submitted.",
      life: 3000,
    });
  }
};
</script>
