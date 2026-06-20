<script setup lang="ts">
defineProps<{
  title: string
  fields: { label: string, value: string, required?: boolean }[]
  submitLabel: string
}>()
</script>

<template>
  <div class="rounded-xl bg-muted ring-1 ring-default p-3.5">
    <h3 class="text-sm font-semibold text-highlighted">
      {{ title }}
    </h3>

    <div class="mt-3 flex flex-wrap gap-2.5">
      <div v-for="field in fields" :key="field.label" class="min-w-[7.5rem] flex-1">
        <span class="mb-1 block text-xs text-muted">
          {{ field.label }}<span v-if="field.required" class="text-error">*</span>
        </span>
        <div class="truncate rounded-md bg-default px-2.5 py-1.5 text-sm text-highlighted ring-1 ring-default">
          {{ field.value }}
        </div>
      </div>
    </div>

    <UButton
      :label="submitLabel"
      color="neutral"
      size="sm"
      class="mt-3"
    />
  </div>
</template>
