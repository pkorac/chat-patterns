<script setup lang="ts">
// The Q&A / quick-reply tool. When the conversation is live this pins to the
// bottom of the frame (above the input) rather than sitting inline; in the
// static mock we render it in place so the whole conversation reads top-to-bottom.
defineProps<{
  question: string
  options: string[]
}>()
</script>

<template>
  <div class="overflow-hidden rounded-xl bg-default ring-1 ring-default">
    <p class="px-3.5 pt-3 pb-2 text-sm font-semibold text-highlighted">
      {{ question }}
    </p>
    <ul>
      <li
        v-for="(option, i) in options"
        :key="option"
        class="flex cursor-pointer items-center gap-3 border-t border-default px-3.5 py-2.5 text-sm transition-colors hover:bg-muted"
      >
        <span class="font-mono text-xs text-dimmed tabular-nums">{{ i + 1 }}</span>
        <span class="text-highlighted">{{ option }}</span>
      </li>
    </ul>
  </div>
</template>
