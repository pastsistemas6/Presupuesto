<!-- components/SystemInfoCard.vue -->
<template>
  <div class="rounded-lg shadow py-4 flex flex-col">
    <h2 class="text-[#545386] pl-6 font-bold text-3xl">{{ title }}</h2>
    <div class="bg-gray-200 mt-4 mb-6 px-3 py-[0.8px]"></div>
    <p class="mb-2 text-center">{{ description }}</p>
    <a
      :href="url"
      target="_blank"
      class="py-2 px-4 rounded-md hover:underline text-white bg-[#545386] mt-4 mx-auto"
    >
      {{ linkText }}
    </a>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: String,
  description: String,
  url: String,
  linkText: {
    type: String,
    default: 'Ir al sistema',
  },
})
</script>
