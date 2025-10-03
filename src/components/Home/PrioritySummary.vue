<template>
  <div :class="['rounded-lg p-4 w-full flex flex-col items-center gap-1 shadow-sm', bgClass]">
    <h3 :class="textClass + ' font-semibold'">{{ title }}</h3>
    <p class="text-lg font-bold">{{ count }} proyecto(s)</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  count: Number,
  type: { type: String, default: 'low' }, // 'low', 'medium', 'high'
})

const bgClass = {
  low: 'bg-green-100',
  medium: 'bg-yellow-100',
  high: 'bg-red-100',
}[props.type]

const textClass = {
  low: 'text-green-800',
  medium: 'text-yellow-800',
  high: 'text-red-800',
}[props.type]
</script>
