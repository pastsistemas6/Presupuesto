<template>
  <div class="overflow-x-auto rounded-lg shadow border border-gray-200">
    <table class="min-w-full border-collapse divide-y divide-gray-200 text-sm text-left">
      <thead class="bg-gray-100 sticky top-0 z-2">
        <tr class="divide-x-2 divide-gray-200">
          <th
            v-for="(column, index) in props.columns"
            :key="index"
            class="px-3 py-4 font-bold text-gray-700 text-center whitespace-nowrap"
            :class="getCellClass_thead(column.type)"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y-2 divide-gray-200 bg-white">
        <tr
          v-for="(row, rowIndex) in props.rows"
          :key="rowIndex"
          class="divide-x-2 divide-gray-200"
        >
          <td
            v-for="(column, colIndex) in props.columns"
            :key="colIndex"
            class="px-4 py-3 whitespace-wrap text-center font-medium cursor-pointer"
            :class="getCellClass_tbody(column.type)"
            @click="
              column.field === 'project'
                ? goToMovements(row.project)
                : openTransfer(row.project, column.value)
            "
          >
            {{ formatValue(row[column.field], column.currency) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <BudgetTransferModal
    :visible="showModal"
    :source="selectedTransfer"
    :projects="projectList"
    @close="showModal = false"
    @transfer="handleTransfer"
  />
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'
import BudgetTransferModal from './BudgetTransferModal.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  columns: Array,
  rows: Array,
})

const router = useRouter()
const showModal = ref(false)
const selectedTransfer = ref(null)

const projectList = computed(() => [...new Set(props.rows.map((r) => r.project))])

const goToMovements = (projectName) => {
  router.push({ name: 'Movements', params: { projectName } })
}

const openTransfer = (project, month) => {
  const row = props.rows.find((r) => r.project == project)
  selectedTransfer.value = {
    project,
    month,
    budget: row?.[`${month}_budget`] || 0,
    real: row?.[`${month}_real`] || 0,
    amount: row?.[`${month}_budget`] - row?.[`${month}_real`],
  }
  showModal.value = true
}

const handleTransfer = ({ amount, from, to }) => {
  const origin = props.rows.find((r) => r.project === from.project)
  const target = props.rows.find((r) => r.project === to.project)

  if (!origin || !target) return

  const fromKey = `${from.month}_budget`
  const toKey = `${to.month}_budget`

  // Validar si hay suficiente
  if (origin[fromKey] < amount) return alert('Fondos insuficientes')

  origin[fromKey] -= amount
  target[toKey] += amount

  // Recalcular totales si es necesario
}

const formatValue = (value, currency) => {
  if (currency == 'USD') {
    return `USD ${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  if (currency == 'COP') {
    return value.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  // fallback si se da otra moneda
  return value
}

const getCellClass_thead = (type) => {
  switch (type) {
    case 'project':
      return 'bg-gray-200 text-gray-800'
    case 'budget':
      return 'bg-blue-200 text-blue-800'
    case 'real':
      return 'bg-green-200 text-green-800'
    case 'total':
      return 'bg-yellow-300 text-yellow-800 font-semibold'
    default:
      return ''
  }
}

const getCellClass_tbody = (type) => {
  switch (type) {
    case 'budget':
      return 'bg-blue-50 text-blue-800'
    case 'real':
      return 'bg-green-50 text-green-800'
    case 'total':
      return 'bg-yellow-50 text-yellow-800 font-semibold'
    default:
      return ''
  }
}
</script>

<style scoped>
tr:hover > td {
  background-color: #f3f4f6 !important;
  color: black;
}
</style>
