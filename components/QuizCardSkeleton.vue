<template>
  <Card class="w-80 cursor-pointer hover:">
    <template #header>
      <div class="flex justify-between items-center p-4">
        <Skeleton size="3rem"></Skeleton>

        <Skeleton width="10rem" height="1rem" border-radius="16px"></Skeleton>
      </div>
    </template>

    <template #title>
      <Skeleton height="1.2rem" class="mb-2" border-radius="16px"></Skeleton>
    </template>

    <template #footer>
      <div class="flex items-center text-sm">
        <Skeleton size="2rem" class="mr-2"></Skeleton>
        <Skeleton width="10rem" height="1rem" border-radius="16px"></Skeleton>
      </div>
    </template>
  </Card>
</template>
