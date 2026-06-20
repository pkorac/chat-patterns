<script setup lang="ts">
// Minimal inline renderer for the scripted copy: **bold** runs + \n line breaks.
// Content is static and trusted, so a tiny parser is plenty (no markdown dep).
const props = defineProps<{ text: string }>()

const lines = computed(() =>
  props.text.split('\n').map(line =>
    line
      .split(/(\*\*[^*]+\*\*)/g)
      .filter(Boolean)
      .map(run =>
        run.startsWith('**') && run.endsWith('**')
          ? { bold: true, text: run.slice(2, -2) }
          : { bold: false, text: run }
      )
  )
)
</script>

<template>
  <span>
    <template v-for="(line, i) in lines" :key="i">
      <br v-if="i > 0">
      <template v-for="(run, j) in line" :key="j">
        <strong v-if="run.bold" class="font-semibold text-highlighted">{{ run.text }}</strong>
        <template v-else>{{ run.text }}</template>
      </template>
    </template>
  </span>
</template>
