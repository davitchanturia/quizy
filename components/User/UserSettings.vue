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
const {
  avatarFile,
  avatarUrl,
  onFileSelect,
  uploadAvatarHandler,
  removeAvatarHandler,
} = useUserAvatar();
</script>

<style scoped>
.p-fileupload {
  width: 100%;
}
</style>
