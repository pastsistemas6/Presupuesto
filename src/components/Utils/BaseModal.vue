<template>
  <!-- Transición de fade para suavizar la aparición/desaparición -->
  <transition name="fade">
    <!-- Overlay del modal - fondo oscuro semitransparente -->
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[4px] bg-black/30 cursor-default"
      @click.self="emitClose"
    >
      <!-- Contenedor principal del modal -->
      <div :class="'bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative z-20' + (tamano ? ' max-w-5xl!' : '')">

        <!-- Botón de cerrar en esquina superior derecha -->
        <button
          class="absolute top-3 right-3 text-gray-500 hover:bg-gray-300 hover:duration-75 py-1 px-2.5 rounded-full"
          @click="emitClose"
        >
          ✕
        </button>

        <!-- Slot para contenido personalizado -->
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps } from 'vue'

// Props del componente modal
const props = defineProps({
  visible: Boolean,    // Controla la visibilidad del modal
  tamano: Boolean,     // Determina si el modal es de tamaño grande
})

// Emits para comunicación con el componente padre
const emit = defineEmits(['close'])

// Función para emitir el evento de cierre
function emitClose() {
  emit('close')
}
</script>

<style scoped>
/* Transiciones de fade para entrada y salida */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.05s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
