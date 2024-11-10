<template>
  <div class="w-64">
    <Card>
      <template #content>
        <div>
          <div class="flex justify-between items-center">
            <Skeleton width="5rem" height="1.5rem" class="mb-2"></Skeleton>

            <Skeleton width="2rem" border-radius="16px" class="mb-2"></Skeleton>
          </div>
          <div class="mt-4 mb-6">
            <Skeleton height="2rem" class="mb-2 w-full"></Skeleton>
          </div>

          <Divider />

          <div class="mt-4 mb-6">
            <Skeleton width="5rem" height="1.5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem" class="mt-2 mb-2 w-full"></Skeleton>
          </div>

          <Divider />

          <div class="mt-4 mb-6">
            <Skeleton width="5rem" height="1.5rem" class="mb-2"></Skeleton>
            <div class="flex flex-col gap-4 mt-3 text-sm">
              <div v-for="i in 3" :key="i" class="flex items-center gap-2">
                <Skeleton shape="circle" size="1.3rem" class="mr-2"></Skeleton>
                <Skeleton width="3rem" height="1rem"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
