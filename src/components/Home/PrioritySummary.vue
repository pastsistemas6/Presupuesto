<template>
  <!-- Contenedor principal con clases dinámicas -->
  <div :class="['rounded-lg p-4 w-full flex flex-col items-center gap-1 shadow-sm', bgClass]">
    <!-- Título con color dinámico según el tipo -->
    <h3 :class="textClass + ' font-semibold'">{{ title }}</h3>
    <!-- Contador de proyectos -->
    <p class="text-lg font-bold">{{ count }} proyecto(s)</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// Definición de propiedades del componente
const props = defineProps({
  title: String,           // Título del contador
  count: Number,           // Número de proyectos
  type: { type: String, default: 'low' }, // Nivel: 'low', 'medium', 'high'
})

// Clase de fondo según el tipo (sistema de semáforo)
const bgClass = {
  low: 'bg-green-100',     // Fondo verde claro para nivel bajo
  medium: 'bg-yellow-100', // Fondo amarillo claro para nivel medio
  high: 'bg-red-100',      // Fondo rojo claro para nivel alto
}[props.type]

// Clase de texto según el tipo
const textClass = {
  low: 'text-green-800',     // Texto verde oscuro para nivel bajo
  medium: 'text-yellow-800', // Texto amarillo oscuro para nivel medio
  high: 'text-red-800',      // Texto rojo oscuro para nivel alto
}[props.type]
</script>
