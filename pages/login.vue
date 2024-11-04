<template>
  <NuxtLayout name="auth">
    <template #header>Log In</template>
    <template #description>Welcome back! Please Log in to continue.</template>

    <Form
      v-slot="$form"
      :resolver
      :initial-values
      :validate-on-blur="true"
      @submit="submitHandler"
    >
      <FormField
        v-slot="$field"
        name="email"
        initial-value=""
        class="flex flex-col gap-1"
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

      <div class="flex justify-start items-center gap-4 mt-4">
        <Button type="submit" :disabled="!$form.valid">Log In </Button>
        <span class="text-sm text-gray-600">
          Don't have an account? <NuxtLink href="/register">Register</NuxtLink>
        </span>
      </div>
    </Form>

    <Toast />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { loginForm } from "~/utils/types/auth";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { Form, FormField } from "@primevue/forms";
import { userLoginSchema } from "~/utils/validationRules/auth";
import { yupResolver } from "@primevue/forms/resolvers/yup";

const toast = useToast();

const resolver = yupResolver(userLoginSchema);

const initialValues: loginForm = {
  email: "",
  password: "",
};

const { loginUser } = useAuth();

const submitHandler = async (event: any): Promise<void> => {
  if (!event.valid) return;

  try {
    await loginUser(event.values);

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
