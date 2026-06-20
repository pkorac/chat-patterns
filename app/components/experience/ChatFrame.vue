<script setup lang="ts">
import type { Step } from '~/data/steps'
import Thread from './chat/Thread.vue'

// The current step is wired in for later (reveal / highlight / playback).
// For now the frame renders the full scripted conversation, scrollable.
defineProps<{ step: Step }>()
</script>

<template>
  <div class="relative flex h-[520px] w-full max-w-[380px] shrink-0 flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-neutral-200/70 shadow-xl shadow-neutral-950/10">
    <!-- Scrollable conversation (scrollbar hidden to match the device design) -->
    <div class="absolute inset-0 overflow-y-auto pt-15 pb-22 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Thread />
    </div>

    <!-- Scroll fade under the header -->
    <div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white via-white/85 to-transparent" />

    <!-- Header -->
    <div class="absolute inset-x-0 top-0 z-20 p-2">
      <div class="flex items-center justify-between rounded-2xl bg-neutral-900 px-3.5 py-2.5 text-white">
        <button type="button" class="flex items-center gap-1 text-sm font-medium">
          <span>Help with order</span>
          <UIcon name="i-lucide-chevron-down" class="size-4 opacity-60" />
        </button>
        <button type="button" class="flex items-center gap-1 text-sm text-white/90">
          <span>New chat</span>
          <UIcon name="i-lucide-plus" class="size-4" />
        </button>
      </div>
    </div>

    <!-- Scroll fade above the input -->
    <div class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white via-white/85 to-transparent" />

    <!-- Footer / input (decorative) -->
    <div class="absolute inset-x-0 bottom-0 z-20 p-2">
      <div class="rounded-2xl bg-white px-3 py-2.5 ring-1 ring-default shadow-sm">
        <p class="font-mono text-sm text-dimmed">
          Ask anything
        </p>
        <div class="mt-2 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-muted ring-1 ring-default">
              <UIcon name="i-lucide-sparkles" class="size-3.5" />
              GPT 5.5
            </span>
            <span class="grid size-6 place-items-center rounded-md text-muted">
              <UIcon name="i-lucide-plus" class="size-4" />
            </span>
          </div>
          <span class="grid size-7 place-items-center rounded-full bg-neutral-900 text-white">
            <UIcon name="i-lucide-arrow-up" class="size-4" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
