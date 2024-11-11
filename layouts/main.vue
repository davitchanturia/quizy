<template>
  <div>
    <div class="w-full bg-primary text-primary-inverse shadow-lg">
      <div class="max-w-7xl mx-auto py-2 flex justify-between items-center">
        <!-- left -->

        <NuxtLink to="/" class="text-xl text-primary">Quizy</NuxtLink>

        <!-- right -->
        <div class="flex gap-2">
          <BaseDarkModeButton />
          <Button
            type="button"
            icon="pi pi-ellipsis-v"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            severity="secondary"
            variant="text"
            @click="toggle"
          />
          <Menu id="overlay_menu" ref="menu" :model="menuItems" :popup="true" />
        </div>
      </div>
    </div>

    <div class="bg-primary text-primary-inverse">
      <div class="max-w-7xl h-screen mx-auto py-5">
        <slot />
      </div>
    </div>

    <Dialog
      v-model:visible="showDialog"
      modal
      header="Do you want to log out?"
      :style="{ width: '30vw' }"
      :breakpoints="{ '1220px': '30vw', '1024px': '50vw', '610px': '90vw' }"
    >
      <div class="flex justify-end items-center gap-3">
        <Button label="cancel" severity="link" @click="showDialog = false" />
        <Button label="confirm" @click="logoutUser" />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/useUserStore";

const { logoutUser } = useAuth();

type MenuItem = {
  label: string;
  icon?: string;
  command?: () => void;
  items?: MenuItem[];
};

const userStore = useUserStore();

const showDialog = ref(false);

const menu = ref();
const menuItems = ref<MenuItem[]>([
  {
    label: "Profile",
    items: [
      {
        label: "Account",
        icon: "pi pi-user",
        command: () => {
          navigateTo(`/user/${userStore.user?.id}`);
        },
      },
      {
        label: "Log out",
        icon: "pi pi-sign-out",
        command: () => {
          showDialog.value = true;
        },
      },
    ],
  },
]);

const toggle = (event: any) => {
  menu.value.toggle(event);
};
</script>
