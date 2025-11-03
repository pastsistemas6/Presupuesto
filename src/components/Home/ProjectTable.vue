<template>
  <!-- Contenedor principal de la tabla -->
  <div class="bg-gray-50 rounded-lg shadow-sm p-5 w-full">
    <!-- Título de la sección -->
    <h2 class="text-xl font-bold mb-6 text-[#545386]">{{ title }}</h2>

    <!-- Tabla personalizada con diseño grid -->
    <table class="w-full text-left flex flex-col">
      <!-- Cabecera de la tabla -->
      <thead class="text-md border-y-2 border-y-gray-400 w-full px-3">
        <tr class="grid grid-cols-6 w-full">
          <th class="py-3 col-span-3">Proyecto</th>
          <th class="py-3 col-span-1 text-center">Prioridad</th>
          <th class="py-3 col-span-2 text-center">Presupuesto</th>
        </tr>
      </thead>

      <!-- Cuerpo de la tabla -->
      <tbody class="text-sm text-gray-800 w-full">
        <!-- Iteración sobre los proyectos -->
        <tr
          v-for="(p, index) in projects"
          :key="index"
          class="border-b-2 border-b-gray-400 grid grid-cols-6 w-full"
        >
          <!-- Nombre del proyecto -->
          <td class="py-3 pl-4 col-span-3">{{ p.nombre }}</td>

          <!-- Prioridad con color dinámico -->
          <td class="py-3 col-span-1 text-center font-semibold" :class="priorityClass(p.prioridad)">
            {{ p.prioridad }}
          </td>

          <!-- Presupuesto formateado -->
          <td class="py-3 col-span-2 text-center font-semibold">
            {{ formatCurrency(p.presupuesto) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// Definición de propiedades
const props = defineProps({
  title: String,    // Título de la tabla
  projects: Array,  // Array de proyectos a mostrar
})

// Función para determinar la clase CSS según la prioridad
function priorityClass(p) {
  if (p == 'BAJA') {
    return 'text-green-500'      // Verde para prioridad baja
  } else if (p == 'MEDIA') {
    return 'text-yellow-500'     // Amarillo para prioridad media
  } else if (p == 'ALTA') {
    return 'text-red-500'        // Rojo para prioridad alta
  }

  return 'text-gray-500'         // Gris por defecto
}

// Función para formatear números como moneda
function formatCurrency(n) {
  return '$ ' + new Intl.NumberFormat('es-CO').format(n || 0)
}
</script>
