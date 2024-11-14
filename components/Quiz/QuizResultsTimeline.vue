<template>
  <div class="w-full h-full">
    <div class="grid grid-cols-10 gap-1 mt-10">
      <div
        v-for="i in 20"
        :key="i"
        class="secondary-bg col-span-1 flex justify-center items-center relative py-4 rounded-md"
      >
        <div
          class="absolute top-0 right-0 w-5 h-5 bg-green-500 flex justify-center items-center rounded-tr-md rounded-bl-md"
        >
          <i class="pi pi-check" style="font-size: 0.7rem"></i>
        </div>
        {{ i }}
      </div>
    </div>

    <div class="flex items-center gap-4 mt-4 text-sm secondary-text">
      <div class="flex gap-2 items-center">
        <div class="w-3 h-3 bg-green-500 rounded-sm"></div>
        <div>Correct</div>
      </div>

      <div class="flex gap-2 items-center">
        <div class="w-3 h-3 bg-red-500 rounded-sm"></div>
        <div>Incorrect</div>
      </div>
    </div>

    <div class="mt-10">
      <Accordion value="0">
        <AccordionPanel v-for="tab in tabs" :key="tab.title" :value="tab.value">
          <AccordionHeader>
            <div class="flex items-center gap-3">
              <div class="px-1 secondary-bg rounded-sm">
                <i class="pi pi-question" style="font-size: 1rem"></i>
              </div>

              <div class="font-semibold text-base">Questions 1</div>

              <span> &#8226; </span>

              <div class="flex gap-2 items-center">
                <div class="w-4 h-4 bg-green-500 rounded-sm"></div>
                <div class="text-sm font-light">Correct</div>
              </div>
            </div>
          </AccordionHeader>
          <AccordionContent>
            <div>
              <div class="col-span-1 font-bold text-xl">
                questions title goes here
              </div>

              <div class="flex gap-2 items-center mt-2">
                <div class="w-4 h-4 bg-green-500 rounded-sm"></div>
                <div class="text-sm font-light">Correct answer</div>
              </div>

              <div class="flex gap-2 items-center mt-2">
                <div class="w-4 h-4 bg-red-500 rounded-sm"></div>
                <div class="text-sm font-light">Incorrect answer</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </div>
</template>

<script lang="ts" setup>
const tabs = ref([
  { title: "Title 1", content: "Content 1", value: "0" },
  { title: "Title 2", content: "Content 2", value: "1" },
  { title: "Title 3", content: "Content 3", value: "2" },
  { title: "Title 3", content: "Content 3", value: "3" },
  { title: "Title 3", content: "Content 3", value: "4" },
  { title: "Title 3", content: "Content 3", value: "5" },
  { title: "Title 3", content: "Content 3", value: "6" },
]);
</script>

<style scoped>
.p-accordion {
  display: flex !important;
  flex-direction: column !important;
  gap: 15px !important;
}
.p-accordionpanel {
  border: solid 1px #e0e0e0 !important;
  border-radius: 5px !important;
}

.p-accordionheader {
  border-radius: 5px !important;
}
</style>
