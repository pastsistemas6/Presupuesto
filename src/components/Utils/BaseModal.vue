<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[4px] bg-black/30 cursor-default"
      @click.self="emitClose"
    >
      <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative z-20">
        <!-- Botón de cerrar -->
        <button
          class="absolute top-3 right-3 text-gray-500 hover:bg-gray-300 hover:duration-75 py-1 px-2.5 rounded-full"
          @click="emitClose"
        >
          ✕
        </button>

        <!-- Slot para contenido -->
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  visible: Boolean,
})

const emit = defineEmits(['close'])

function emitClose() {
  emit('close')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.05s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
