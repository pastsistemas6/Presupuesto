<template>
  <!-- Contenedor principal del componente -->
  <div class="pt-4 pb-6 flex flex-col shadow-sm rounded-lg cursor-default">

    <!-- Título dinámico con nombre del proyecto -->
    <h2 class="w-full pl-8 text-2xl font-bold text-[#545386]">
      Presupuesto del proyecto: {{ projectName }}
    </h2>

    <!-- Línea divisoria decorativa -->
    <div class="bg-gray-200 mt-4 mb-6 px-3 py-[0.8px]"></div>

    <!-- Grid de meses con información presupuestaria -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-6">

      <!-- Tarjeta individual por cada mes -->
      <div
        v-for="month in months"
        :key="month"
        class="border-3 border-gray-300 p-4 rounded-lg shadow-sm bg-gray-50"
      >
        <!-- Nombre del mes capitalizado -->
        <h2 class="text-xl font-bold mb-2 text-center capitalize">
          {{ month }}
        </h2>

        <!-- Lista de información presupuestaria -->
        <ul class="space-y-2 text-center">
          <!-- Estado sin movimientos presupuestados -->
          <li v-if="!hasBudget(month)">
            <span class="text-gray-400 text-sm">Sin movimientos presupuestados</span>
          </li>
          <!-- Presupuesto del mes -->
          <li v-else>
            Presupuesto: {{ formatCurrency(filteredProject[`${month}_budget`] || 0) }}
          </li>
        </ul>

        <!-- Botón para ver movimientos del mes -->
        <div class="mt-4 text-center">
          <RouterLink :to="{ name: 'BudgetMovements', params: { projectName, month } }">
            <Button type="button" class="bg-[#545386] text-white py-2! text-sm! hover:underline hover:bg-gray-400">
              Movimientos
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Button from '@/components/form/Button.vue'
import { useRoute } from 'vue-router'
import { rows as allRows } from '@/Services/rows'

// Obtener parámetro de la ruta para el nombre del proyecto
const route = useRoute()
const projectName = route.params.projectName

// Array con todos los meses del año
const months = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

// Computed property que encuentra el proyecto específico
const filteredProject = computed(() =>
  allRows.find((r) => r.project === projectName)
)

// Función para formatear valores como moneda colombiana
const formatCurrency = (value) => {
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

// Función para verificar si un mes tiene presupuesto asignado
const hasBudget = (month) => {
  const key = `${month}_budget`
  return filteredProject.value?.[key] > 0
}
</script>
