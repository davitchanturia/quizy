<template>
  <Card>
    <template #content>
      <div class="!rounded-full flex justify-center pt-5">
        <div class="card flex flex-col items-center gap-6">
          <Image
            :src="avatarUrl"
            alt="Image"
            width="250"
            class="shadow-md rounded-xl w-full sm:w-64"
          />

          <FileUpload
            mode="basic"
            custom-upload
            auto
            severity="secondary"
            class="p-button-outlined !w-full"
            @select="onFileSelect"
          />

          <div class="grid grid-cols-2 items-center gap-3 w-full">
            <Button
              v-if="avatarFile"
              severity="secondary"
              @click="removeAvatarHandler"
              >Remove</Button
            >

            <Button
              v-if="avatarFile"
              severity="secondary"
              @click="uploadAvatarHandler"
              >Submit</Button
            >
          </div>
        </div>
      </div>

      <div class="mt-10 grid grid-cols-2 gap-5">
        <div class="flex flex-col gap-2">
          <label for="name">Name</label>
          <InputText id="name" v-model="name" disabled />
        </div>

        <div class="flex flex-col gap-2">
          <label for="email">Email</label>
          <InputText id="email" v-model="email" disabled />
        </div>
      </div>
    </template>
  </Card>
  <Toast />
</template>

<script setup lang="ts">
import type { FileUploadSelectEvent } from "primevue";
import { uploadAvatar } from "~/services/user";
import { useUserStore } from "~/store/useUserStore";

const userStore = useUserStore();
const toast = useToast();

const name = ref<string | undefined>(userStore.user?.name);
const email = ref<string | undefined>(userStore.user?.email);

const avatarFile = ref<File | null>(null);
const avatarSrc = ref<string | null>(null);

const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

const fileIsValidImage = (file: File) => validImageTypes.includes(file.type);

function onFileSelect(event: FileUploadSelectEvent) {
  const file = event.files[0];

  if (file && file.size < 1024 * 1024) {
    if (!fileIsValidImage(file)) {
      toast.add({
        severity: "error",
        summary: "Provided file is not valid image!",
        life: 3000,
      });
      return;
    }

    avatarFile.value = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      avatarSrc.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}

const uploadAvatarHandler = async () => {
  if (!avatarFile.value) {
    toast.add({
      severity: "error",
      summary: "Error Message",
      detail: "Please select an image",
      life: 3000,
    });
    return;
  }

  try {
    const formData = new FormData();
    formData.append("avatar", avatarFile.value);

    const response = await uploadAvatar(formData);

    userStore.setUserAvatar(response.avatar_url);

    toast.add({
      severity: "success",
      summary: "Avatar changed successfully!",
      life: 3000,
    });

    avatarFile.value = null;
  } catch (error: any) {
    toast.add({
      severity: "error",
      summary: error?.message || "Failed to upload avatar",
      life: 3000,
    });
  }
};

const removeAvatarHandler = () => {
  avatarFile.value = null;
  avatarSrc.value = null;
};

const config = useRuntimeConfig();
const fullAvatarUrl = `${config.public.BACKEND_BASE_URL}/storage/${userStore?.user?.avatar}`;
const avatarUrl = computed(() => avatarSrc.value ?? fullAvatarUrl);
</script>

<style scoped>
.p-fileupload {
  width: 100%;
}
</style>
