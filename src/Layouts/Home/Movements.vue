<template>
  <div class="pt-4 pb-6 flex flex-col shadow-sm rounded-lg">
    <h2 class="w-full pl-8 text-2xl font-bold text-[#545386]">
      Presupuesto del proyecto: {{ projectName }}
    </h2>

    <div class="bg-gray-200 mt-4 mb-6 px-3 py-[0.8px]"></div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-6">
      <div
        v-for="month in months"
        :key="month"
        class="border-3 border-gray-300 p-4 rounded-lg shadow-sm bg-gray-50"
      >
        <h2 class="text-xl font-bold mb-2 text-center capitalize">
          {{ month }}
        </h2>

        <ul class="space-y-2 text-center">
          <li v-if="!hasBudget(month)">
            <span class="text-gray-400 text-sm">Sin movimientos presupuestados</span>
          </li>
          <li v-else>
            Presupuesto: {{ formatCurrency(filteredProject[`${month}_budget`] || 0) }}
          </li>
        </ul>

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

const route = useRoute()
const projectName = route.params.projectName

const months = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre'
]

const filteredProject = computed(() =>
  allRows.find((r) => r.project === projectName)
)

const formatCurrency = (value) => {
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

const hasBudget = (month) => {
  const key = `${month}_budget`
  return filteredProject.value?.[key] > 0
}
</script>
