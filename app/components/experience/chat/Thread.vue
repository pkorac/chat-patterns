<script setup lang="ts">
import { conversation } from '~/data/conversation'
import Message from './Message.vue'
</script>

<template>
  <div class="flex flex-col gap-5 px-3.5">
    <Message
      v-for="message in conversation"
      :key="message.id"
      :message="message"
    />
  </div>
</template>
