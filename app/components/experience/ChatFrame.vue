<script setup lang="ts">
import type { Step } from '~/data/steps'

// The current step is wired in now so the frame can react to it later
// (reveal messages, highlight regions, run playback). Empty for now.
defineProps<{ step: Step }>()
</script>

<template>
  <div
    class="w-full max-w-[380px] h-[520px] shrink-0 overflow-hidden rounded-3xl bg-white ring-1 ring-neutral-200/70 shadow-xl shadow-neutral-950/10"
  >
    <!-- Chat experience renders here. Empty white frame for now. -->
  </div>
</template>
