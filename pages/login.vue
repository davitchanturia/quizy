<template>
  <NuxtLayout name="auth">
    <template #header>Log In</template>
    <template #description>Welcome back! Please Log in to continue.</template>

    <form @submit.prevent="handleSubmit">
      <FloatLabel variant="in">
        <InputText
          id="Email"
          v-model="formData.email"
          class="!bg-transparent w-full !text-gray-600"
        />
        <label for="Email">Username</label>
      </FloatLabel>

      <FloatLabel variant="in" class="mt-4">
        <InputText
          id="Password"
          v-model="formData.password"
          class="!bg-transparent w-full !text-gray-600"
          type="password"
        />
        <label for="Password">Password</label>
      </FloatLabel>

      <div class="flex justify-start items-center gap-4 mt-4">
        <Button type="submit">Log in</Button>
        <span class="text-sm text-gray-600">
          Don't have an account? <NuxtLink href="/register">Register</NuxtLink>
        </span>
      </div>
    </form>

    <Toast />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { loginForm } from "~/utils/types/auth";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const initialForm: loginForm = {
  email: "",
  password: "",
};

const formData = ref(initialForm);
const { loginUser } = useAuth();

const handleSubmit = async (): Promise<void> => {
  try {
    await loginUser(formData.value);

    await navigateTo("/");
  } catch (error: unknown) {
    console.log(error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    });
  }
};
</script>
