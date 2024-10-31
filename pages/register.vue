<template>
  <div>
    <h1>register page</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="formData.name" type="text" placeholder="name" />
      <input v-model="formData.email" type="email" placeholder="email" />
      <input
        v-model="formData.password"
        type="password"
        placeholder="password"
      />
      <input
        v-model="formData.password_confirmation"
        type="password"
        placeholder="confirm password"
      />

      <button type="submit">register</button>
    </form>
  </div>
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
