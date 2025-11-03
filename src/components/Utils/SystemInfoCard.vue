<template>
  <!-- Tarjeta contenedora con bordes redondeados y sombra -->
  <div class="rounded-lg shadow py-4 flex flex-col">
    <!-- Título de la tarjeta -->
    <h2 class="text-[#545386] pl-6 font-bold text-3xl">{{ title }}</h2>

    <!-- Línea divisoria decorativa -->
    <div class="bg-gray-200 mt-4 mb-6 px-3 py-[0.8px]"></div>

    <!-- Descripción del sistema -->
    <p class="mb-2 text-center">{{ description }}</p>

    <!-- Enlace al sistema externo -->
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

// Definición de propiedades del componente
defineProps({
  title: String,           // Título principal de la tarjeta
  description: String,     // Descripción del sistema
  url: String,            // URL del sistema externo
  linkText: {             // Texto del enlace (valor por defecto: 'Ir al sistema')
    type: String,
    default: 'Ir al sistema',
  },
})
</script>
