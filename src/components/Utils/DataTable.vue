<template>
  <!-- Contenedor principal de la tabla con scroll horizontal -->
  <div class="overflow-x-auto rounded-lg shadow border border-gray-200">
    <table class="min-w-full border-collapse divide-y divide-gray-200 text-sm text-left">
      <!-- Cabecera de la tabla fija -->
      <thead class="bg-gray-100 sticky top-0 z-2">
        <tr class="divide-x-2 divide-gray-200">
          <!-- Iteración sobre las columnas definidas -->
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

      <!-- Cuerpo de la tabla con datos -->
      <tbody class="divide-y-2 divide-gray-200 bg-white">
        <!-- Iteración sobre las filas de datos -->
        <tr
          v-for="(row, rowIndex) in props.rows"
          :key="rowIndex"
          class="divide-x-2 divide-gray-200"
        >
          <!-- Iteración sobre las celdas de cada fila -->
          <td
            v-for="(column, colIndex) in props.columns"
            :key="colIndex"
            class="px-4 py-3 whitespace-wrap text-center font-medium cursor-pointer"
            :class="getCellClass_tbody(column.type)"
            @click="
              column.field === 'project'
                ? goToMovements(row.project)
                : (isFutureOrCurrentMonth(column.value) && openEditBudget(row.project, column.value, column.field))
            "
          >
            {{ formatValue(row[column.field], column.currency) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal para editar presupuesto -->
  <BaseModal :visible="showModal" @close="showModal = false" :tamano="true">
    <h2 class="text-xl font-semibold mb-4 text-[#545386]">Editar presupuesto</h2>

    <!-- Información del proyecto y mes -->
    <div class="mb-6 p-4 bg-gray-50 rounded-lg">
      <p class="text-lg font-semibold text-gray-800">{{ selectedEdit.project }}</p>
      <p class="text-md text-gray-600">Mes: {{ capitalize(selectedEdit.month) }}</p>
      <div class="grid grid-cols-2 gap-4 mt-2">
        <div>
          <p class="text-sm font-medium text-gray-500">Presupuesto actual:</p>
          <p class="text-sm text-blue-600 font-semibold">{{ formatCurrency(selectedEdit.currentBudget) }}</p>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Ejecutado real:</p>
          <p class="text-sm text-green-600 font-semibold">{{ formatCurrency(selectedEdit.real) }}</p>
        </div>
      </div>
    </div>

    <!-- Formulario para editar presupuesto -->
    <form @submit.prevent="saveBudgetEdit">
      <Input
        v-model="selectedEdit.newBudget"
        label="Nuevo presupuesto"
        class="w-full"
        type="number"
        clase_label="label2"
        clase_input="input2"
        required
        :min="selectedEdit.real"
        :step="100000"
      />

      <!-- Mensaje de validación -->
      <div v-if="selectedEdit.newBudget < selectedEdit.real" class="mt-2 p-2 bg-red-50 border border-red-200 rounded">
        <p class="text-sm text-red-600">
          ⚠️ El presupuesto no puede ser menor al ejecutado real ({{ formatCurrency(selectedEdit.real) }})
        </p>
      </div>

      <!-- Información de diferencia -->
      <div v-if="selectedEdit.newBudget !== selectedEdit.currentBudget" class="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
        <p class="text-sm text-blue-600">
          {{ selectedEdit.newBudget > selectedEdit.currentBudget ? '↑ Incremento:' : '↓ Reducción:' }}
          {{ formatCurrency(Math.abs(selectedEdit.newBudget - selectedEdit.currentBudget)) }}
        </p>
      </div>

      <!-- Botón de guardar -->
      <div class="text-right pt-4">
        <Button
          type="submit"
          class="bg-[#545386] text-white py-2!"
          :disabled="selectedEdit.newBudget < selectedEdit.real"
        >
          Guardar cambios
        </Button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import BaseModal from './BaseModal.vue'
import Input from '@/components/form/Input.vue'
import Button from '@/components/form/Button.vue'
import { useRouter } from 'vue-router'

// Props del componente
const props = defineProps({
  columns: Array,  // Definición de columnas de la tabla
  rows: Array,     // Datos a mostrar en la tabla
})

// Emits para comunicar cambios al componente padre
const emit = defineEmits(['update:budget'])

// Inicialización del router de Vue
const router = useRouter()

// Estados reactivos
const showModal = ref(false)           // Controla visibilidad del modal

// Datos de la edición seleccionada
const selectedEdit = ref({
  project: '',
  month: '',
  currentBudget: 0,
  newBudget: 0,
  real: 0,
  field: ''
})

// Lista de meses para validaciones
const monthsList = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

// Índice del mes actual (0-11)
const currentMonthIndex = new Date().getMonth()

// Función: Verifica si un mes es futuro o actual
const isFutureOrCurrentMonth = (monthLabel) => {
  if (!monthLabel) return false
  const index = monthsList.findIndex(
    m => m.toLowerCase() === monthLabel.toLowerCase()
  )
  return index >= currentMonthIndex
}

// Función: Navega a la página de movimientos de un proyecto
const goToMovements = (projectName) => {
  router.push({ name: 'Movements', params: { projectName } })
}

// Función: Abre el modal para editar presupuesto
const openEditBudget = (project, month, field) => {
  const row = props.rows.find((r) => r.project == project)
  const currentBudget = row?.[field] || 0
  const realField = field.replace('_budget', '_real')
  const real = row?.[realField] || 0

  selectedEdit.value = {
    project,
    month,
    currentBudget,
    newBudget: currentBudget,
    real,
    field
  }
  showModal.value = true
}

// Función: Guarda los cambios del presupuesto
const saveBudgetEdit = () => {
  if (selectedEdit.value.newBudget < selectedEdit.value.real) {
    alert(`Error: El presupuesto no puede ser menor al ejecutado real (${this.formatCurrency(selectedEdit.value.real)})`)
    return
  }

  if (selectedEdit.value.newBudget < 0) {
    alert('El presupuesto no puede ser negativo')
    return
  }

  // Emitir el cambio al componente padre
  emit('update:budget', {
    project: selectedEdit.value.project,
    month: selectedEdit.value.month,
    field: selectedEdit.value.field,
    newBudget: Number(selectedEdit.value.newBudget)
  })

  showModal.value = false
}

// Función: Formatea valores según el tipo de moneda
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

  // Fallback para otros valores
  return value
}

// Función: Formatea moneda COP (para uso interno en el modal)
const formatCurrency = (value) => {
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

// Función: Capitaliza un string
const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Función: Asigna clases CSS para celdas del header
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

// Función: Asigna clases CSS para celdas del cuerpo
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
/* Efecto hover para las filas de la tabla */
tr:hover > td {
  background-color: #f3f4f6 !important;
  color: black;
}

/* Estilo para botón deshabilitado */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
