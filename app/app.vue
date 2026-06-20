<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: '#f5f5f4' }
  ]
})

const title = 'Conversational UI patterns'
const description = 'An interactive walkthrough of the conversational UI patterns I use on every project.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
