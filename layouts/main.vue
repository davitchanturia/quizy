<template>
  <div>
    <div class="w-full bg-primary text-primary-inverse shadow-lg">
      <div class="max-w-7xl mx-auto py-2 flex justify-between items-center">
        <!-- left -->
        <div class="text-xl text-color">Quizy</div>

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
          <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
        </div>
      </div>
    </div>
    <div class="bg-primary text-primary-inverse">
      <div class="max-w-7xl h-screen mx-auto py-5">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { logoutUser } = useAuth();

type MenuItem = {
  label: string;
  icon?: string;
  command?: () => void;
  items?: MenuItem[];
};

const menu = ref();
const items = ref<MenuItem[]>([
  {
    label: "Actions",
    items: [
      {
        label: "Log out",
        icon: "pi pi-sign-out",
        command: () => {
          logoutUser();
        },
      },
    ],
  },
]);

const toggle = (event: any) => {
  menu.value.toggle(event);
};
</script>
