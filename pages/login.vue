<template>
  <NuxtLayout name="auth">
    <template #header>Log In</template>
    <template #description>Welcome back! Please Log in to continue.</template>

    <!-- Your login form goes here -->
    <form @submit.prevent="handleSubmit">
      <FloatLabel variant="in">
        <InputText
          id="Email"
          v-model="formData.email"
          class="!bg-transparent w-full"
        />
        <label for="Email">Username</label>
      </FloatLabel>

      <FloatLabel variant="in" class="mt-4">
        <InputText
          id="Password"
          v-model="formData.password"
          class="!bg-transparent w-full"
        />
        <label for="Password">Password</label>
      </FloatLabel>

      <Button type="submit">login</Button>
    </form>

    <template #footer>
      Don't have an account? <a href="/register">Register</a>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { loginForm } from "~/utils/types/auth";

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
  } catch (error) {
    console.log(error);
  }
};
</script>
