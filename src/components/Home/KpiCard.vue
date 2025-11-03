<template>
  <!-- Contenedor principal de la tarjeta de métrica -->
  <div class="bg-gray-50 rounded-lg shadow p-5 w-full flex flex-col gap-1 items-center">
    <!-- Título de la métrica -->
    <h2 class="text-gray-500 text-md">{{ title }}</h2>

    <!-- Valor de la métrica con clase dinámica según el tipo -->
    <p :class="valueClass + ' text-2xl font-bold'">{{ value }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// Definición de propiedades del componente
const props = defineProps({
  title: String,           // Título que describe la métrica
  value: [String, Number], // Valor de la métrica (puede ser texto o número)
  type: { type: String, default: 'default' }, // Tipo para color: 'success', 'danger', 'info', 'default'
})

// Mapeo de clases de color según el tipo de métrica
const valueClass = {
  success: 'text-green-600!',  // Color verde para valores positivos/éxito
  danger: 'text-red-600!',     // Color rojo para valores negativos/peligro
  info: 'text-blue-600!',      // Color azul para información neutra
  default: 'text-gray-800',    // Color gris por defecto
}[props.type] // Selecciona la clase basada en el prop 'type'
</script>
