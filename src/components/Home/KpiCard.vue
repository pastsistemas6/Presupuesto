<template>
  <div class="bg-gray-50 rounded-lg shadow p-5 w-full flex flex-col gap-1 items-center">
    <h2 class="text-gray-500 text-md">{{ title }}</h2>
    <p :class="valueClass + ' text-2xl font-bold'">{{ value }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  value: [String, Number],
  type: { type: String, default: 'default' }, // 'success', 'danger', etc.
})

const valueClass = {
  success: 'text-green-600!',
  danger: 'text-red-600!',
  info: 'text-blue-600!',
  default: 'text-gray-800'
}[props.type]
</script>
