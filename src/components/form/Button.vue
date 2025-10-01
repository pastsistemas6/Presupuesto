<template>
  <button :type="type" :class="['base-button', { disabled }]" :disabled="disabled" @click="onClick">
    <slot />
  </button>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  type: { type: String, default: 'button' }, // 'button' | 'submit' | 'reset'
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])

function onClick(event) {
  if (!props.disabled) emit('click', event)
}
</script>

<style scoped>
.base-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  font-size: 1rem;
}

.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
