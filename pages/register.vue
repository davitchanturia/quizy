<template>
  <NuxtLayout name="auth">
    <template #header>Registration</template>
    <template #description>Welcome!</template>

    <form @submit.prevent="handleSubmit">
      <FloatLabel variant="in">
        <InputText
          id="name"
          v-model="formData.name"
          class="!bg-transparent w-full !text-gray-600"
        />
        <label for="Password">Name</label>
      </FloatLabel>

      <FloatLabel variant="in" class="mt-4">
        <InputText
          id="Email"
          v-model="formData.email"
          class="!bg-transparent w-full !text-gray-600"
        />
        <label for="Email">Email</label>
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

      <FloatLabel variant="in" class="mt-4">
        <InputText
          id="ConfirmPassword"
          v-model="formData.password_confirmation"
          class="!bg-transparent w-full !text-gray-600"
          type="password"
        />
        <label for="ConfirmPassword">Confirm Password</label>
      </FloatLabel>

      <div class="flex justify-start items-center gap-4 mt-4">
        <Button type="submit">Register</Button>
        <span class="text-sm text-gray-600">
          Already have an account? <NuxtLink href="/login">Log In</NuxtLink>
        </span>
      </div>
    </form>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { registerForm } from "~/utils/types/auth";

// definePageMeta({
//   middleware: ["redirect-if-auth"],
// });

const initialForm: registerForm = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const formData = ref(initialForm);
const { registerUser } = useAuth();

const handleSubmit = async (): Promise<void> => {
  try {
    await registerUser(formData.value);

    await navigateTo("/");
  } catch (error) {
    console.log(error);
  }
};
</script>
