<template>
  <NuxtLayout name="auth">
    <template #header>Registration</template>
    <template #description>Welcome!</template>

    <Form
      v-slot="$form"
      :resolver
      :initial-values
      :validate-on-blur="true"
      @submit="submitHandler"
    >
      <FormField
        v-slot="$field"
        name="name"
        initial-value=""
        class="flex flex-col gap-1"
      >
        <InputText
          type="text"
          placeholder="Name"
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
        name="email"
        initial-value=""
        class="flex flex-col gap-1 mt-4"
      >
        <InputText
          type="text"
          placeholder="Email"
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
        name="password"
        initial-value=""
        class="flex flex-col gap-1"
      >
        <InputText
          type="password"
          placeholder="Password"
          class="!bg-transparent w-full !text-gray-600 mt-4"
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
        name="password_confirmation"
        initial-value=""
        class="flex flex-col gap-1"
      >
        <InputText
          type="password"
          placeholder="Confirm Password"
          class="!bg-transparent w-full !text-gray-600 mt-4"
        />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>

      <div class="flex justify-start items-center gap-4 mt-4">
        <Button type="submit" :disabled="!$form.valid">Register</Button>
        <span class="text-sm text-gray-600">
          Don't have an account? <NuxtLink href="/login">Log in</NuxtLink>
        </span>
      </div>
    </Form>

    <Toast />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { yupResolver } from "@primevue/forms/resolvers/yup";
import type { registerForm } from "~/utils/types/auth";
import { userRegisterSchema } from "~/utils/validationRules/auth";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const resolver = yupResolver(userRegisterSchema);

const initialValues: registerForm = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const { registerUser } = useAuth();

const submitHandler = async (event: any): Promise<void> => {
  if (!event.valid) return;

  try {
    await registerUser(event.values);

    await navigateTo("/");
  } catch (error: any) {
    toast.add({
      severity: "error",
      summary: error,
      life: 3000,
    });
  }
};
</script>
