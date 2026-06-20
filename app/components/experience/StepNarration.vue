<script setup lang="ts">
import type { Step } from '~/data/steps'

defineProps<{
  step: Step
  index: number
  total: number
  canPrev: boolean
  canNext: boolean
}>()

defineEmits<{
  prev: []
  next: []
}>()
</script>

<template>
  <!--
    On desktop the column matches the chat frame's height (520px) and pushes
    its two groups apart: narration pinned to the top, buttons to the bottom.
    On mobile it collapses to a natural stack (text, then buttons).
  -->
  <div class="flex max-w-md flex-col gap-4 md:h-[520px] md:justify-between md:gap-0">
    <div class="flex flex-col gap-4">
      <p class="text-sm text-muted tabular-nums">
        {{ index + 1 }}/{{ total }}
      </p>

      <h2 class="text-xl font-semibold text-highlighted">
        {{ step.title }}
      </h2>

      <p
        v-if="step.body"
        class="text-sm leading-relaxed text-muted whitespace-pre-line"
      >
        {{ step.body }}
      </p>
    </div>

    <div class="flex items-center gap-2">
      <UButton
        icon="i-lucide-arrow-left"
        label="Previous"
        color="neutral"
        variant="outline"
        size="sm"
        :disabled="!canPrev"
        @click="$emit('prev')"
      />
      <UButton
        trailing-icon="i-lucide-arrow-right"
        label="Next"
        color="neutral"
        variant="solid"
        size="sm"
        :disabled="!canNext"
        @click="$emit('next')"
      />
    </div>
  </div>
</template>
