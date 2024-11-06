<template>
  <div
    class="min-h-screen w-full bg-primary flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
      <BaseDarkModeButton />

      <!-- Header Section -->
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">
          <slot name="header">Welcome Back</slot>
        </h1>
        <p class="mt-2 text-sm text-gray-600">
          <slot name="description">Please enter your details</slot>
        </p>
      </div>

      <!-- Main Content -->
      <div class="space-y-4">
        <slot></slot>
      </div>

      <!-- Footer Section -->
      <div class="pt-4 text-center text-sm text-gray-600">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
