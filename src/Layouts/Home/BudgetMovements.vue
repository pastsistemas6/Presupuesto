<template>
  <div class="pt-4 pb-6 flex flex-col shadow-sm rounded-lg cursor-default">
    <!-- Header con botón volver y título -->
    <div class="flex flex-nowrap items-center justify-between mb-2 px-8">
      <Button @click="goBack" class="bg-[#545386] text-white py-2.5! hover:underline">
        ← Volver al presupuesto
      </Button>
      <h2 class="text-2xl font-bold text-[#545386]">
        Movimientos: {{projectName || 'Todos proyectos'}} {{month ? ` / ${capitalize(month)}` : ''}}
      </h2>
    </div>

    <!-- Línea separadora -->
    <div class="bg-gray-200 mt-4 mb-6 px-3 py-[0.8px]"></div>

    <!-- Filtros -->
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
      <!-- Filtro monto mínimo -->
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
      <!-- Filtro monto máximo -->
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
      <!-- Botón limpiar filtros -->
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

    <!-- Mensaje cuando no hay movimientos -->
    <div v-if="filteredMovements.length === 0" class="text-gray-500 text-center mt-10">
      No hay movimientos registrados para este criterio.
    </div>

    <!-- Tabla de movimientos -->
    <div class="px-6" v-else>
      <div
        v-for="(movements, project) in groupedMovements"
        :key="project"
      >
        <DataTable :rows="movements" :columns="columns" />
      </div>
    </div>

    <!-- Botón agregar movimiento -->
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

    <!-- Modal para transferencias -->
    <BudgetTransferModal
      :visible="showModal"
      :source="selectedTransfer"
      @close="showModal = false"
      @transfer="handleTransfer"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DataTable from '@/components/Utils/DataTable.vue'
import { budgetMovements as originalBudgetMovements } from '@/Services/budgetMovements'
import { rows } from '@/Services/rows'
import Input from '@/components/form/Input.vue'
import BaseModal from '@/components/Utils/BaseModal.vue'
import BudgetTransferModal from '@/components/Utils/BudgetTransferModal.vue'
import Button from '@/components/form/Button.vue'

// ===== ROUTER Y ESTADO REACTIVO =====
const route = useRoute()
const router = useRouter()

// Hacer budgetMovements reactivo para que la UI se actualice
const budgetMovements = ref([...originalBudgetMovements])

// Parámetros de la ruta
const projectName = route.params.projectName
const month = route.params.month
const selectedTransfer = ref(null)

// ===== FILTROS REACTIVOS =====
const filterDateFrom = ref('')
const filterDateTo = ref('')
const filterAmountMin = ref(null)
const filterAmountMax = ref(null)
const showModal = ref(false)

// ===== CONFIGURACIÓN DE MESES =====
const monthsList = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

// Índice del mes actual (0 = Enero)
const currentMonthIndex = new Date().getMonth()
const currentMonthName = monthsList[currentMonthIndex]

// ===== COMPUTED PROPERTIES =====

// Controla si se puede agregar movimiento (solo meses actuales o futuros, excepto diciembre)
const canAddMovement = computed(() => {
  if (!month) return false

  const routeMonthIndex = monthsList.indexOf(month.toLowerCase())
  const isCurrentOrFuture = routeMonthIndex >= currentMonthIndex
  const isNotDecember = currentMonthName !== 'diciembre'

  return isCurrentOrFuture && isNotDecember
})

// ===== FUNCIONES DE UTILIDAD =====

// Convierte string de fecha a objeto Date
function parseDateString(dateStr) {
  if (!dateStr) return null
  return new Date(dateStr)
}

// ===== FUNCIONES DE TRANSFERENCIA =====

// Abre el modal de transferencia con los datos del proyecto/mes seleccionado
const openTransfer = (project, month) => {
  const row = rows.find((r) => r.project == project)

  // Calcular el amount correctamente, asegurando que no sea NaN
  const budget = row?.[`${month}_budget`] || 0
  const real = row?.[`${month}_real`] || 0
  const amount = Math.max(0, budget - real)

  selectedTransfer.value = {
    project,
    month,
    budget: budget,
    real: real,
    amount: amount,
  }
  showModal.value = true
}

// Maneja la transferencia recibida desde el modal
const handleTransfer = (transferData) => {
  // Validar que los datos sean correctos
  if (!transferData || !transferData.from || !transferData.from.amount || transferData.from.amount <= 0) {
    console.error('Error: Monto inválido', transferData)
    return
  }

  // Extraer datos de la estructura correcta
  const fromMonth = transferData.from.month?.toLowerCase()
  const toMonth = transferData.to.month?.toLowerCase()
  const amount = Number(transferData.from.amount) // Tomar amount desde from
  const project = transferData.project
  const note = transferData.note

  if (!fromMonth || !toMonth || !amount || amount <= 0) {
    console.error('Error: datos incompletos o inválidos', { fromMonth, toMonth, amount })
    return
  }

  // 1. Actualizar el presupuesto en rows
  const updateSuccess = updateBudgetInRows({ project, fromMonth, toMonth, amount })

  if (!updateSuccess) {
    console.error('Error al actualizar el presupuesto')
    return
  }

  // 2. Agregar SOLO UN movimiento al historial
  const newMovement = {
    project: project,
    from: {
      month: fromMonth,
      amount: amount
    },
    to: {
      month: toMonth,
      amount: amount
    },
    note: note,
    timestamp: new Date().toISOString(),
    user: 'admin'
  }

  originalBudgetMovements.unshift(newMovement)

  // 3. Actualizar la versión reactiva para que la UI se actualice
  budgetMovements.value = [...originalBudgetMovements]

  showModal.value = false
}

// Actualiza los presupuestos en el array rows después de una transferencia
const updateBudgetInRows = (transferData) => {
  const { project, fromMonth, toMonth, amount } = transferData

  // Encontrar el proyecto en rows
  const projectRow = rows.find(r => r.project === project)
  if (!projectRow) {
    console.error('Proyecto no encontrado:', project)
    return false
  }

  const fromBudgetKey = `${fromMonth}_budget`
  const toBudgetKey = `${toMonth}_budget`

  // Verificar si las keys existen
  if (projectRow[fromBudgetKey] === undefined) {
    console.error(`Key no encontrada: ${fromBudgetKey}`)
    return false
  }

  if (projectRow[toBudgetKey] === undefined) {
    console.error(`Key no encontrada: ${toBudgetKey}`)
    return false
  }

  // Validar que hay suficiente presupuesto
  if (projectRow[fromBudgetKey] < amount) {
    console.error('Saldo insuficiente:', {
      disponible: projectRow[fromBudgetKey],
      intento: amount
    })
    return false
  }

  // Restar del mes origen
  projectRow[fromBudgetKey] = projectRow[fromBudgetKey] - amount

  // Sumar al mes destino
  projectRow[toBudgetKey] = projectRow[toBudgetKey] + amount

  return true
}

// ===== FILTRADO Y AGRUPAMIENTO DE MOVIMIENTOS =====

// Filtra los movimientos según los criterios seleccionados
const filteredMovements = computed(() => {
  return budgetMovements.value.filter((m) => {
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

// Agrupa los movimientos por proyecto para mostrar en la tabla
const groupedMovements = computed(() => {
  const groups = {}
  filteredMovements.value.forEach((m) => {
    if (!groups[m.project]) {
      groups[m.project] = []
    }
    groups[m.project].push({
      from_month: capitalize(m.from.month),
      to_month: capitalize(m.to.month),
      amount: formatCurrency(m.from.amount || 0), // Protege aquí también
      note: m.note,
      user: m.user,
      timestamp: new Date(m.timestamp).toLocaleString(),
    })
  })
  return groups
})

// ===== CONFIGURACIÓN DE LA TABLA =====
const columns = [
  { label: 'Desde', field: 'from_month', type: 'text' },
  { label: 'Hacia', field: 'to_month', type: 'text' },
  { label: 'Monto', field: 'amount', type: 'budget', currency: 'COP' },
  { label: 'Descripción', field: 'note', type: 'text' },
  { label: 'Usuario', field: 'user', type: 'text' },
  { label: 'Fecha', field: 'timestamp', type: 'text' },
]

// ===== FUNCIONES DE FORMATEO =====

// Formatea valores monetarios en pesos colombianos
const formatCurrency = (value) => {
  if (value === undefined || value === null) {
    return '$0'
  }
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

// Computado para mostrar Monto Mínimo formateado (bidireccional)
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

// Computado para mostrar Monto Máximo formateado (bidireccional)
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

// Capitaliza la primera letra de un string
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// ===== NAVEGACIÓN Y ACCIONES =====

// Regresa a la vista anterior
const goBack = () => {
  router.push({ name: 'Movements', params: { projectName } })
}

// Limpia todos los filtros aplicados
const clearFilters = () => {
  filterDateFrom.value = ''
  filterDateTo.value = ''
  filterAmountMin.value = null
  filterAmountMax.value = null
}

// ===== WATCHERS =====

// Watch para forzar reactividad cuando se agregan movimientos
watch(budgetMovements, () => {
  // Esto fuerza la actualización de filteredMovements
}, { deep: true })
</script>
