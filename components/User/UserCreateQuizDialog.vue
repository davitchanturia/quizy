<template>
  <div class="">
    <Button label="Create quiz" @click="showCreateDialog = true" />
    <Dialog
      v-model:visible="showCreateDialog"
      modal
      :style="{ width: '50%' }"
      maximizable
    >
      <div class="w-full max-w-5xl mx-auto">
        <Stepper value="1" linear class="basis-[50rem]">
          <StepList>
            <Step value="1">Quiz Details</Step>
            <Step value="2">Questions</Step>
            <Step value="3">Overview</Step>
          </StepList>
          <StepPanels>
            <StepPanel v-slot="{ activateCallback }" value="1">
              <UserCreateQuizInfo>
                <template #actions="{ disableNextButton }">
                  <Button
                    label="Next"
                    icon="pi pi-arrow-right"
                    :disabled="disableNextButton"
                    type="submit"
                    @click="activateCallback('2')"
                  />
                </template>
              </UserCreateQuizInfo>
            </StepPanel>

            <StepPanel v-slot="{ activateCallback }" value="2">
              Content goes here

              <div class="flex pt-6 justify-between">
                <Button
                  label="Back"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  @click="activateCallback('1')"
                />
                <Button
                  label="Next"
                  icon="pi pi-arrow-right"
                  icon-pos="right"
                  @click="activateCallback('3')"
                />
              </div>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="3">
              Content goes here

              <div class="pt-6">
                <Button
                  label="Back"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  @click="activateCallback('2')"
                />
              </div>
            </StepPanel>
          </StepPanels>
        </Stepper>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
const showCreateDialog = ref(false);
</script>
