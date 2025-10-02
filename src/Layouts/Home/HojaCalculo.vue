<script setup>
import DataTable from '@/components/Utils/DataTable.vue'
import MultiFilters from '@/components/Utils/MultiFilters.vue'
import BudgetTransferModal from '@/components/Utils/BudgetTransferModal.vue'
import { rows as originalRows } from '@/Services/rows'
import { ref, computed } from 'vue'

const rows = ref([...originalRows])
const visibleColumns = ref([])

const allMonths = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

// columnas base siempre visibles
const baseColumns = [
  { label: 'Proyecto', field: 'project' }
]

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
      ...allMonths.flatMap(month => ([
        { label: `${capitalize(month)} Presupuestado`, field: `${month}_budget`, type: 'budget', currency: 'COP' },
        { label: `${capitalize(month)} Real`, field: `${month}_real`, type: 'real', currency: 'COP' }
      ])),
      ...totalsColumns
    ]
  }

  const filteredMonthCols = visibleColumns.value.flatMap(month => ([
    { label: `${capitalize(month)} Presupuestado`, field: `${month}_budget`, type: 'budget', currency: 'COP' },
    { label: `${capitalize(month)} Real`, field: `${month}_real`, type: 'real', currency: 'COP' }
  ]))


  return [
    ...baseColumns,
    ...filteredMonthCols,
    ...totalsColumns
  ]
})

const handleFilter = ({ projects, months }) => {
  visibleColumns.value = months

  let filtered = [...originalRows]

  // Filtrar proyectos
  if (projects.length) {
    filtered = filtered.filter(row => projects.includes(row.project))
  }

  // Recalcular totales según los meses seleccionados
  if (months.length) {
    filtered = filtered.map(row => {
      const totalBudget = months.reduce((sum, m) => sum + (row[`${m}_budget`] || 0), 0)
      const totalReal = months.reduce((sum, m) => sum + (row[`${m}_real`] || 0), 0)

      return {
        ...row,
        total_budget_cop: totalBudget,
        total_budget_usd: (totalBudget / 4000),
        total_real_cop: totalReal,
        total_real_usd: (totalReal / 4000)
      }
    })
  }

  rows.value = filtered
}

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)


const showModal = ref(false)
const selectedTransfer = ref(null)

const projectList = computed(() => [...new Set(rows.value.map(r => r.project))])

const openTransfer = (project, month) => {
  const row = rows.value.find(r => r.project === project)
  selectedTransfer.value = {
    project,
    month,
    budget: row?.[`${month}_budget`] || 0,
    real: row?.[`${month}_real`] || 0
  }
  showModal.value = true
}

const handleTransfer = ({ amount, from, to }) => {
  const origin = rows.value.find(r => r.project === from.project)
  const target = rows.value.find(r => r.project === to.project)

  if (!origin || !target) return

  const fromKey = `${from.month}_budget`
  const toKey = `${to.month}_budget`

  // Validar si hay suficiente
  if (origin[fromKey] < amount) return alert('Fondos insuficientes')

  origin[fromKey] -= amount
  target[toKey] += amount

  // Recalcular totales si es necesario
}

</script>

<template>
  <div class="pt-4 pb-6 flex flex-col shadow-sm rounded-lg">
    <h2 class="w-full pl-8 text-4xl font-bold text-[#545386]">Resumen de proyectos</h2>

    <div class="bg-gray-200 mt-4 mb-6 px-3 py-[0.8px]"></div>

    <div class="w-full flex flex-col px-6">
      <MultiFilters :rows="originalRows" @filter="handleFilter" />

      <DataTable :columns="columns" :rows="rows" />

      <BudgetTransferModal
        :visible="showModal"
        :source="selectedTransfer"
        :projects="projectList"
        @close="showModal = false"
        @transfer="handleTransfer"
      />


    </div>

  </div>
</template>
