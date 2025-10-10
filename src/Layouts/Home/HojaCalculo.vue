<script setup>
import DataTable from '@/components/Utils/DataTable.vue'
import MultiFilters from '@/components/Utils/MultiFilters.vue'
import KpiCard from '@/components/Home/KpiCard.vue'
import { rows as originalRows } from '@/Services/rows'
import { onMounted, ref, computed } from 'vue'

const rows = ref([...originalRows])
const visibleColumns = ref([])
const totalprojects = ref(0)
const totalbudget = ref(0)
const totalreal = ref(0)

const allMonths = [
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
  'diciembre',
]

// columnas base siempre visibles
const baseColumns = [{ label: 'Proyecto', field: 'project' }]

const totalsColumns = [
  { label: 'Total Presupuestado (COP)', field: 'total_budget_cop', type: 'total', currency: 'COP' },
  { label: 'Total Presupuestado (USD)', field: 'total_budget_usd', type: 'total', currency: 'USD' },
  { label: 'Total Real (COP)', field: 'total_real_cop', type: 'total', currency: 'COP' },
  { label: 'Total Real (USD)', field: 'total_real_usd', type: 'total', currency: 'USD' },
]

const columns = computed(() => {
  if (!visibleColumns.value.length) {
    return [
      ...baseColumns,
      ...allMonths.flatMap((month) => [
        {
          label: `${capitalize(month)} Presupuestado`,
          field: `${month}_budget`,
          value: `${month}`,
          type: 'budget',
          currency: 'COP',
        },
        {
          label: `${capitalize(month)} Real`,
          field: `${month}_real`,
          value: `${month}`,
          type: 'real',
          currency: 'COP',
        },
      ]),
      ...totalsColumns,
    ]
  }

  const filteredMonthCols = visibleColumns.value.flatMap((month) => [
    {
      label: `${capitalize(month)} Presupuestado`,
      field: `${month}_budget`,
      value: `${month}`,
      type: 'budget',
      currency: 'COP',
    },
    {
      label: `${capitalize(month)} Real`,
      field: `${month}_real`,
      value: `${month}`,
      type: 'real',
      currency: 'COP',
    },
  ])

  return [...baseColumns, ...filteredMonthCols, ...totalsColumns]
})

const calculateTotals = (data, months) => {
  let totalBudget = 0
  let totalReal = 0

  const result = data.map((row) => {
    const budget = months.reduce((sum, m) => sum + (row[`${m}_budget`] || 0), 0)
    const real = months.reduce((sum, m) => sum + (row[`${m}_real`] || 0), 0)

    totalBudget += budget
    totalReal += real

    return {
      ...row,
      total_budget_cop: budget,
      total_budget_usd: budget / 4000,
      total_real_cop: real,
      total_real_usd: real / 4000,
    }
  })

  totalbudget.value = totalBudget
  totalreal.value = totalReal
  totalprojects.value = result.length

  return result
}

const handleFilter = ({ projects, months }) => {
  visibleColumns.value = months

  let filtered = [...originalRows]

  // Filtrar por proyectos si hay selección
  if (projects.length) {
    filtered = filtered.filter((row) => projects.includes(row.project))
  }

  // Usa los meses seleccionados o todos si no hay ninguno
  const activeMonths = months.length ? months : allMonths

  rows.value = calculateTotals(filtered, activeMonths)
}

// Cálculo inicial con todos los meses y todos los proyectos
onMounted(() => {
  visibleColumns.value = [...allMonths] // Mostrar todos los meses al inicio
  rows.value = calculateTotals(originalRows, allMonths)
})

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
</script>

<template>
  <div class="pt-4 pb-6 flex flex-col shadow-sm rounded-lg cursor-default">
    <h2 class="w-full pl-8 text-4xl font-bold text-[#545386]">Resumen de proyectos</h2>

    <div class="bg-gray-200 mt-4 mb-6 px-3 py-[0.8px]"></div>

    <div class="w-full flex flex-col px-6">
      <MultiFilters :rows="originalRows" @filter="handleFilter" />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KpiCard
          class="bg-gray-100!"
          title="Total Proyectos"
          :value="totalprojects + ' proyectos'"
          type="info"
        />
        <KpiCard
          class="bg-blue-100!"
          title="Presupuesto Total (COP)"
          :value="
            totalbudget.toLocaleString('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
          "
          type="success"
        />
        <KpiCard
          class="bg-green-100!"
          title="Ejecutado Real (COP)"
          :value="
            totalreal.toLocaleString('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
          "
          type="danger"
        />
      </div>

      <DataTable :columns="columns" :rows="rows" />
    </div>
  </div>
</template>
