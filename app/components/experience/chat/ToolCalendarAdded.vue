<script setup lang="ts">
defineProps<{
  title: string
  when: string
}>()
</script>

<template>
  <div class="flex items-center gap-3 rounded-xl bg-muted ring-1 ring-default p-2.5">
    <div class="grid size-9 shrink-0 place-items-center rounded-lg bg-default ring-1 ring-default">
      <UIcon name="i-lucide-calendar" class="size-5 text-muted" />
    </div>
    <div class="min-w-0">
      <p class="truncate text-sm font-medium text-highlighted">
        {{ title }}
      </p>
      <p class="truncate text-xs text-muted">
        {{ when }}
      </p>
    </div>
  </div>
</template>
