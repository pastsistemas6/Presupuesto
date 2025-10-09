<template>
  <div class="pt-4 pb-6 flex flex-col shadow-sm rounded-lg">
    <div class="flex flex-nowrap items-center justify-between mb-2 px-8">
      <Button @click="goBack" class="bg-[#545386] text-white py-2.5! hover:underline">
        ← Volver al presupuesto
      </Button>
      <h2 class="text-2xl font-bold text-[#545386]">
        Movimientos: {{projectName || 'Todos proyectos'}} {{month ? ` / ${capitalize(month)}` : ''}}
      </h2>
    </div>

    <div class="bg-gray-200 mt-4 mb-6 px-3 py-[0.8px]"></div>

    <div class="mb-2 flex flex-row gap-x-4 items-center px-6">
      <!-- Filtro por fecha desde -->
      <div>
        <Input
          type="date"
          label="Fecha desde"
          v-model="filterDateFrom"
          clase_label="label2"
          clase_input="input2"
        />
      </div>
      <!-- Filtro por fecha hasta -->
      <div>
        <Input
          type="date"
          label="Fecha hasta"
          v-model="filterDateTo"
          clase_label="label2"
          clase_input="input2"
        />
      </div>
      <!-- Filtro monto min -->
      <div>
        <Input
          type="text"
          label="Monto mínimo"
          v-model="formattedAmountMin"
          placeholder="0"
          clase_label="label2"
          clase_input="input2"
        />
      </div>
      <!-- Filtro monto max -->
      <div>
        <Input
          type="text"
          label="Monto máximo"
          v-model="formattedAmountMax"
          placeholder="0"
          clase_label="label2"
          clase_input="input2"
        />
      </div>
      <div class="mt-2">
        <Button
          @click="clearFilters"
          :disabled="!filterAmountMax && !filterAmountMin && !filterDateTo && !filterDateFrom"
          :class="{
            'bg-[#545386] hover:bg-[#3e3c61] text-white': filterAmountMax || filterAmountMin || filterDateTo || filterDateFrom,
            'bg-gray-300 text-white cursor-not-allowed':
              !filterAmountMax && !filterAmountMin && !filterDateTo && !filterDateFrom,
          }"
        >
          Limpiar filtros
        </Button>
      </div>
    </div>

    <div v-if="filteredMovements.length === 0" class="text-gray-500 text-center mt-10">
      No hay movimientos registrados para este criterio.
    </div>

    <div class="px-6" v-else>
      <div
        v-for="(movements, project) in groupedMovements"
        :key="project"
      >
        <DataTable :rows="movements" :columns="columns" />
      </div>
    </div>


    <div class="absolute bottom-8 right-8">
      <Button
        @click="openTransfer(projectName, month)"
        :disabled="!canAddMovement"
        :class="[
          'w-full',
          canAddMovement ? 'bg-[#545386] hover:bg-[#3e3c61] text-white' : 'bg-gray-300 text-white cursor-not-allowed'
        ]"
      >
        Agregar movimiento
      </Button>
    </div>

    <BudgetTransferModal
      :visible="showModal"
      :source="selectedTransfer"
      @close="showModal = false"
      @transfer="handleTransfer"
    />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DataTable from '@/components/Utils/DataTable.vue'
import { budgetMovements } from '@/Services/budgetMovements'
import { rows } from '@/Services/rows'
import Input from '@/components/form/Input.vue'
import BaseModal from '@/components/Utils/BaseModal.vue'
import BudgetTransferModal from '@/components/Utils/BudgetTransferModal.vue'
import Button from '@/components/form/Button.vue'

const route = useRoute()
const router = useRouter()

const projectName = route.params.projectName
const month = route.params.month
const selectedTransfer = ref(null)

// filtros reactivos
const filterDateFrom = ref('')
const filterDateTo = ref('')
const filterAmountMin = ref(null)
const filterAmountMax = ref(null)
const showModal = ref(false)

const monthsList = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

// Índice del mes actual (0 = Enero)
const currentMonthIndex = new Date().getMonth()

// Índice del mes en la ruta (por ejemplo "Febrero" => 1)
const routeMonthIndex = computed(() => {
  return month ? monthsList.findIndex(m => m.toLowerCase() === month.toLowerCase()) : null
})

// true si el mes es actual o futuro
const canAddMovement = computed(() => {
  return routeMonthIndex.value !== null && routeMonthIndex.value >= currentMonthIndex
})


function parseDateString(dateStr) {
  if (!dateStr) return null
  return new Date(dateStr)
}

const openTransfer = (project, month) => {
  const row = rows.find((r) => r.project == project)
  selectedTransfer.value = {
    project,
    month,
    budget: row?.[`${month}_budget`] || 0,
    real: row?.[`${month}_real`] || 0,
    amount: row?.[`${month}_budget`] - row?.[`${month}_real`],
  }
  showModal.value = true
}

const filteredMovements = computed(() => {
  return budgetMovements.filter((m) => {
    // filtro por proyecto
    const matchProject = projectName ? m.project === projectName : true
    // filtro por mes
    const matchMonth = month
      ? (m.from.month === month)
      : true

    if (!matchProject || !matchMonth) return false

    // filtro por fecha
    const movDate = new Date(m.timestamp)
    if (filterDateFrom.value) {
      const desde = parseDateString(filterDateFrom.value)
      if (movDate < desde) return false
    }
    if (filterDateTo.value) {
      const hasta = parseDateString(filterDateTo.value)
      // considera hasta el final del día
      if (movDate > new Date(hasta.setHours(23,59,59))) return false
    }

    // filtro por monto
    const amt = m.from.amount
    if (filterAmountMin.value != null && amt < filterAmountMin.value) return false
    if (filterAmountMax.value != null && amt > filterAmountMax.value) return false

    return true
  })
})

const groupedMovements = computed(() => {
  const groups = {}
  filteredMovements.value.forEach((m) => {
    if (!groups[m.project]) {
      groups[m.project] = []
    }
    groups[m.project].push({
      from_month: capitalize(m.from.month),
      to_month: capitalize(m.to.month),
      amount: formatCurrency(m.from.amount),
      note: m.note,
      user: m.user,
      timestamp: new Date(m.timestamp).toLocaleString(),
    })
  })
  return groups
})

const columns = [
  { label: 'Desde', field: 'from_month', type: 'text' },
  { label: 'Hacia', field: 'to_month', type: 'text' },
  { label: 'Monto', field: 'amount', type: 'budget', currency: 'COP' },
  { label: 'Descripción', field: 'note', type: 'text' },
  { label: 'Usuario', field: 'user', type: 'text' },
  { label: 'Fecha', field: 'timestamp', type: 'text' },
]

const formatCurrency = (value) =>
  value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

// Computado para mostrar Monto Mínimo formateado
const formattedAmountMin = computed({
  get() {
    return filterAmountMin.value != null
      ? formatCurrency(filterAmountMin.value)
      : ''
  },
  set(val) {
    const num = parseInt(val.replace(/\D/g, ''), 10)
    filterAmountMin.value = isNaN(num) ? null : num
  }
})

// Computado para mostrar Monto Máximo formateado
const formattedAmountMax = computed({
  get() {
    return filterAmountMax.value != null
      ? formatCurrency(filterAmountMax.value)
      : ''
  },
  set(val) {
    const num = parseInt(val.replace(/\D/g, ''), 10)
    filterAmountMax.value = isNaN(num) ? null : num
  }
})


const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const goBack = () => {
  router.push({ name: 'Movements', params: { projectName } })
}

const clearFilters = () => {
  filterDateFrom.value = ''
  filterDateTo.value = ''
  filterAmountMin.value = null
  filterAmountMax.value = null
}
</script>

