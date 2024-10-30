<template>
  <div>
    <h1>login page</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="formData.email" type="email" placeholder="email" />
      <input
        v-model="formData.password"
        type="password"
        placeholder="password"
      />

      <button type="submit">register</button>
    </form>
  </div>
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
