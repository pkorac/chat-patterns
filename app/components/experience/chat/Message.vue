<script setup lang="ts">
import type { Message } from '~/data/conversation'
import RichText from './RichText.vue'
import Reasoning from './Reasoning.vue'
import ToolOrderForm from './ToolOrderForm.vue'
import ToolOrderDetails from './ToolOrderDetails.vue'
import ToolCalendarConfirm from './ToolCalendarConfirm.vue'
import ToolCalendarAdded from './ToolCalendarAdded.vue'
import ToolQuickReply from './ToolQuickReply.vue'

defineProps<{ message: Message }>()
</script>

<template>
  <!-- User: right-aligned bubble (text only) -->
  <div v-if="message.role === 'user'" class="flex justify-end">
    <div class="max-w-[82%] rounded-2xl bg-elevated px-3.5 py-2 text-sm text-highlighted">
      <template v-for="(part, i) in message.parts" :key="i">
        <RichText v-if="part.type === 'text'" :text="part.text" />
      </template>
    </div>
  </div>

  <!-- Assistant: stacked parts, no bubble -->
  <div v-else class="flex flex-col gap-2.5">
    <template v-for="(part, i) in message.parts" :key="i">
      <Reasoning
        v-if="part.type === 'reasoning'"
        :label="part.label"
        :icon="part.icon"
        :text="part.text"
        :steps="part.steps"
        :default-open="part.defaultOpen"
      />

      <p v-else-if="part.type === 'text'" class="text-sm leading-relaxed text-default">
        <RichText :text="part.text" />
      </p>

      <ToolOrderForm
        v-else-if="part.type === 'tool-orderForm'"
        :title="part.title"
        :fields="part.fields"
        :submit-label="part.submitLabel"
      />

      <ToolOrderDetails
        v-else-if="part.type === 'tool-orderDetails'"
        v-bind="part"
      />

      <ToolCalendarConfirm
        v-else-if="part.type === 'tool-calendarConfirm'"
        :title="part.title"
        :rows="part.rows"
      />

      <ToolCalendarAdded
        v-else-if="part.type === 'tool-calendarAdded'"
        :title="part.title"
        :when="part.when"
      />

      <ToolQuickReply
        v-else-if="part.type === 'tool-quickReply'"
        :question="part.question"
        :options="part.options"
      />

      <div v-else-if="part.type === 'actions'" class="flex items-center gap-3 pt-0.5 text-muted">
        <UIcon name="i-lucide-copy" class="size-4 cursor-pointer transition-colors hover:text-highlighted" />
        <UIcon name="i-lucide-thumbs-up" class="size-4 cursor-pointer transition-colors hover:text-highlighted" />
        <UIcon name="i-lucide-thumbs-down" class="size-4 cursor-pointer transition-colors hover:text-highlighted" />
      </div>
    </template>
  </div>
</template>
