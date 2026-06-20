<script setup lang="ts">
defineProps<{
  title: string
  rows: { label: string, value: string }[]
}>()
</script>

<template>
  <div class="rounded-xl bg-muted ring-1 ring-default p-3.5 text-sm">
    <h3 class="font-semibold text-highlighted">
      {{ title }}
    </h3>

    <dl class="mt-2 space-y-0.5">
      <div v-for="row in rows" :key="row.label" class="flex gap-1.5">
        <dt class="font-medium text-highlighted">
          {{ row.label }}:
        </dt>
        <dd class="text-toned">
          {{ row.value }}
        </dd>
      </div>
    </dl>

    <div class="mt-3 flex flex-wrap items-center gap-2">
      <UButton
        label="Deny"
        color="neutral"
        variant="outline"
        size="xs"
      />
      <UButton
        label="Always allow"
        color="neutral"
        variant="outline"
        size="xs"
      />
      <UButton label="Allow" color="neutral" size="xs" />
    </div>
  </div>
</template>
