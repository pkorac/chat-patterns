<script setup lang="ts">
const props = defineProps<{
  orderNumber: string
  email: string
  stages: string[]
  currentStage: number
  carrier: string
  trackingId: string
  status: string
  latestUpdate: string
}>()

// Stepper geometry: evenly space the dots, fill the track up to the current stage.
const lastIndex = computed(() => Math.max(props.stages.length - 1, 1))
const fillPercent = computed(() => (props.currentStage / lastIndex.value) * 100)
function dotPercent(i: number) {
  return (i / lastIndex.value) * 100
}
</script>

<template>
  <div class="rounded-xl bg-muted ring-1 ring-default p-3.5 text-sm">
    <h3 class="font-semibold text-highlighted">
      Order details
    </h3>

    <dl class="mt-2 space-y-0.5">
      <div class="flex gap-1.5">
        <dt class="font-medium text-highlighted">
          Order number:
        </dt>
        <dd class="text-toned">
          {{ orderNumber }}
        </dd>
      </div>
      <div class="flex gap-1.5">
        <dt class="font-medium text-highlighted">
          Email:
        </dt>
        <dd class="text-toned">
          {{ email }}
        </dd>
      </div>
    </dl>

    <hr class="my-3 border-default">

    <h4 class="font-semibold text-highlighted">
      Tracking details
    </h4>

    <!-- Stepper -->
    <div class="mt-2.5">
      <div class="flex justify-between text-[11px] text-muted">
        <span
          v-for="(stage, i) in stages"
          :key="stage"
          :class="[i <= currentStage ? 'text-highlighted' : '', i === 0 ? 'text-left' : i === stages.length - 1 ? 'text-right' : 'text-center']"
        >
          {{ stage }}
        </span>
      </div>

      <div class="relative mx-1 mt-1.5 h-2">
        <div class="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-accented" />
        <div
          class="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-success"
          :style="{ width: `${fillPercent}%` }"
        />
        <span
          v-for="(stage, i) in stages"
          :key="stage"
          class="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-default"
          :class="i <= currentStage ? 'bg-success' : 'bg-accented'"
          :style="{ left: `${dotPercent(i)}%` }"
        />
      </div>
    </div>

    <dl class="mt-3.5 space-y-1">
      <div class="flex items-center gap-1.5">
        <dt class="font-medium text-highlighted">
          Carrier:
        </dt>
        <dd class="flex items-center gap-1.5 text-toned">
          <span class="size-3.5 rounded-[3px] bg-red-600" />
          {{ carrier }}
        </dd>
      </div>
      <div class="flex gap-1.5">
        <dt class="font-medium text-highlighted">
          Tracking ID:
        </dt>
        <dd class="text-toned">
          {{ trackingId }}
        </dd>
      </div>
      <div class="flex items-center gap-1.5">
        <dt class="font-medium text-highlighted">
          Status:
        </dt>
        <dd>
          <UBadge
            :label="status"
            color="success"
            variant="outline"
            size="sm"
            class="rounded-md"
          />
        </dd>
      </div>
      <div class="flex gap-1.5">
        <dt class="shrink-0 font-medium text-highlighted">
          Latest update:
        </dt>
        <dd class="text-toned">
          {{ latestUpdate }}
        </dd>
      </div>
    </dl>

    <UButton
      label="Track"
      trailing-icon="i-lucide-arrow-right"
      color="neutral"
      variant="outline"
      size="xs"
      class="mt-3"
    />
  </div>
</template>
