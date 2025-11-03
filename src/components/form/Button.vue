<template>
  <!-- Botón base con propiedades dinámicas -->
  <button
    :type="type"
    :class="['base-button', { disabled }]"
    :disabled="disabled"
    @click="onClick"
  > <!-- Tipo de botón (button/submit/reset) Clases CSS condicionales Atributo disabled nativo Manejador de evento click -->
    <!-- Slot para contenido personalizado -->
    <slot />
  </button>
</template>

<script setup>
import { defineProps } from 'vue'

// Definición de propiedades del componente
const props = defineProps({
  type: { type: String, default: 'button' }, // 'button' | 'submit' | 'reset'
  disabled: { type: Boolean, default: false }, // Estado de deshabilitado
})

// Definición de eventos que emite el componente
const emit = defineEmits(['click'])

// Función manejadora del evento click
function onClick(event) {
  // Solo emite el evento si el botón no está deshabilitado
  if (!props.disabled) emit('click', event)
}
</script>

<style scoped>
/* Estilos base del botón */
.base-button {
  padding: 0.75rem 1.5rem;    /* Espaciado interno */
  border: none;               /* Sin borde */
  border-radius: 10px;        /* Bordes redondeados */
  font-weight: bold;          /* Texto en negrita */
  cursor: pointer;            /* Cursor de puntero */
  transition: 0.2s;           /* Transición suave */
  font-size: 1rem;            /* Tamaño de fuente */
}

/* Estilos para estado deshabilitado */
.disabled {
  background-color: #ccc;     /* Color de fondo gris */
  cursor: not-allowed;        /* Cursor de no permitido */
}
</style>
