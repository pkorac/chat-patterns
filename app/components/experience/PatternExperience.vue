<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const { index, total, current, canPrev, canNext, next, prev } = useSteps()

// Keyboard navigation: left / right arrows move between steps.
useEventListener(window, 'keydown', (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
})
</script>

<template>
  <div class="w-full max-w-4xl px-6 py-12">
    <div class="flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
      <ExperienceStepNarration
        :step="current"
        :index="index"
        :total="total"
        :can-prev="canPrev"
        :can-next="canNext"
        @prev="prev"
        @next="next"
      />

      <ExperienceChatFrame :step="current" class="self-center md:self-auto" />
    </div>
  </div>
</template>
