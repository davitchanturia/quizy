<template>
  <NuxtLayout name="main">
    <div class="w-full grid grid-cols-6 gap-4 user-page">
      <div class="col-span-1">
        <Card>
          <template #content>
            <Button
              label="Settings"
              icon="pi pi-cog"
              variant="text"
              class="!w-full"
              :class="activeTab === 'settings' ? 'highlight' : ''"
              @click="activeTab = 'settings'"
            />
            <Button
              label="My Quizes"
              icon="pi pi-th-large"
              variant="text"
              class="!w-full mt-2"
              :class="activeTab === 'my-quizes' ? 'highlight' : ''"
              @click="activeTab = 'my-quizes'"
            />
          </template>
        </Card>
      </div>

      <div class="col-span-5">
        <Tabs v-model:value="activeTab" class="flex-1">
          <TabPanels>
            <TabPanel value="settings">
              <UserSettings />
            </TabPanel>
            <TabPanel value="my-quizes">
              <UserQuizzes />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const activeTab = ref("settings");
</script>

<style scoped>
.user-page .p-button {
  justify-content: start;
}
</style>
