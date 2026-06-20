<script setup lang="ts">
import type { TraceStep } from '~/data/conversation'

const props = defineProps<{
  label: string
  icon?: string
  text?: string
  steps?: TraceStep[]
  defaultOpen?: boolean
}>()

const open = ref(props.defaultOpen ?? false)
const hasDetail = computed(() => !!props.text || !!props.steps?.length)
</script>

<template>
  <div>
    <button
      type="button"
      class="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-highlighted"
      @click="open = !open"
    >
      <UIcon v-if="icon" :name="icon" class="size-4 shrink-0" />
      <span v-else class="size-3.5 shrink-0 rounded-full bg-neutral-700" />

      <span>{{ label }}</span>

      <UIcon
        v-if="hasDetail"
        :name="open ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
        class="size-3.5 shrink-0 opacity-70"
      />
    </button>

    <div
      v-if="open && hasDetail"
      class="mt-2 ml-[7px] space-y-2 border-l border-default pl-3 text-xs text-muted"
    >
      <p v-if="text" class="leading-relaxed">
        {{ text }}
      </p>

      <div v-for="step in steps" :key="step.name" class="space-y-0.5">
        <div class="flex items-center gap-1.5 text-highlighted">
          <UIcon :name="step.icon" class="size-3.5 shrink-0" />
          <span class="font-medium">{{ step.name }}</span>
        </div>
        <p
          v-for="(line, i) in step.lines"
          :key="i"
          class="pl-5 font-mono text-[11px] leading-relaxed"
        >
          {{ line }}
        </p>
      </div>
    </div>
  </div>
</template>
