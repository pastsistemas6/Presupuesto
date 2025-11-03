<template>
  <BaseModal :visible="visible" @close="handleClose" :tamano="true">
    <h2 class="text-xl font-semibold mb-4 text-[#545386]">Transferir presupuesto</h2>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <!-- Información del origen -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-semibold text-lg mb-2">Origen</h3>
        <p><strong>Proyecto:</strong> {{ source.project }}</p>
        <p><strong>Mes:</strong> {{ capitalize(source.month) }}</p>
        <p><strong>Presupuesto:</strong> {{ formatCurrency(source.budget) }}</p>
        <p><strong>Ejecutado:</strong> {{ formatCurrency(source.real) }}</p>
        <p><strong>Disponible:</strong> {{ formatCurrency(availableAmount) }}</p>
      </div>

      <!-- Solo mostrar checks si es diciembre -->
      <div v-if="isDecember" class="space-y-3">
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            v-model="transferToOtherMonth"
            class="accent-[#545386]"
          />
          <span>Pasar a otro mes</span>
        </label>

        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            v-model="transferToOtherProject"
            class="accent-[#545386]"
          />
          <span>Pasar a otro proyecto</span>
        </label>
      </div>

      <!-- Selección de proyecto destino (solo si es diciembre y se selecciona) -->
      <div v-if="isDecember && transferToOtherProject" class="space-y-3">
        <label class="block text-sm font-medium text-gray-600">Proyecto destino</label>
        <select
          v-model="selectedProject"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#545386]"
        >
          <option value="">Seleccionar proyecto</option>
          <option v-for="project in availableProjects" :key="project" :value="project">
            {{ project }}
          </option>
        </select>
      </div>

      <!-- Selección de meses destino (siempre visible excepto cuando se transfiere a otro proyecto) -->
      <div v-if="!transferToOtherProject" class="space-y-3">
        <label class="block text-sm font-medium text-gray-600">Meses destino</label>
        <div class="space-y-2">
          <label
            v-for="monthOption in availableMonths"
            :key="monthOption.value"
            class="flex items-center gap-2"
          >
            <input
              type="checkbox"
              :value="monthOption.value"
              v-model="selectedMonths"
              class="accent-[#545386]"
            />
            <span>{{ monthOption.label }}</span>
          </label>
        </div>
      </div>

      <!-- Inputs para distribución por mes (solo si hay más de 1 mes seleccionado) -->
      <div v-if="selectedMonths.length > 1" class="space-y-3">
        <label class="block text-sm font-medium text-gray-600">Distribución del monto</label>

        <div v-for="month in selectedMonths" :key="month" class="space-y-2">
          <Input
            :label="`Monto para ${getMonthLabel(month)}`"
            type="text"
            v-model="monthDistribution[month]"
            @input="formatMonthAmount(month)"
            :error="getMonthError(month)"
            clase_label="label2"
            clase_input="input2"
            placeholder="0"
          />
        </div>

        <div class="flex justify-between items-center text-sm">
          <span>Total distribuido: {{ formatCurrency(totalDistributed) }}</span>
          <span class="font-semibold" :class="totalDistributed > availableAmount ? 'text-red-600' : 'text-green-600'">
            Disponible: {{ formatCurrency(availableAmount - totalDistributed) }}
          </span>
        </div>
      </div>

      <!-- Input para monto único (cuando es 1 mes o transferencia a proyecto) -->
      <div v-if="shouldShowSingleAmount" class="space-y-3">
        <Input
          label="Monto a transferir"
          type="text"
          v-model="singleAmount"
          @input="formatSingleAmount"
          :error="getSingleAmountError"
          clase_label="label2"
          clase_input="input2"
          placeholder="0"
        />
        <p class="text-xs text-gray-500">
          Disponible: {{ formatCurrency(availableAmount) }}
        </p>
      </div>

      <!-- Descripción -->
      <Input
        label="Descripción de la transferencia"
        type="text"
        v-model="note"
        clase_label="label2"
        clase_input="input2"
        placeholder="Motivo de la transferencia..."
        required
      />

      <!-- Mensajes de error general -->
      <div v-if="generalError" class="text-red-600 text-sm bg-red-50 p-2 rounded">
        {{ generalError }}
      </div>

      <div class="text-right pt-2">
        <Button
          type="submit"
          :disabled="!isFormValid || availableAmount <= 0"
          class="bg-[#545386] text-white py-2!"
          :class="{ 'opacity-50 cursor-not-allowed': !isFormValid || availableAmount <= 0 }"
        >
          {{ availableAmount <= 0 ? 'Sin saldo disponible' : 'Transferir' }}
        </Button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue'
import BaseModal from './BaseModal.vue'
import Input from '../form/Input.vue'
import Button from '../form/Button.vue'
import { rows } from '@/Services/rows'
import { budgetMovements } from '@/Services/budgetMovements'

// Definición de propiedades del componente
const props = defineProps({
  visible: Boolean,  // Controla la visibilidad del modal
  source: Object     // Datos de origen para la transferencia
})

// Definición de eventos emitidos por el componente
const emit = defineEmits(['close', 'transfer'])

// Estados reactivos del formulario
const transferToOtherMonth = ref(false)      // Checkbox para transferir a otro mes
const transferToOtherProject = ref(false)    // Checkbox para transferir a otro proyecto
const selectedProject = ref('')              // Proyecto destino seleccionado
const selectedMonths = ref([])               // Meses destino seleccionados
const monthDistribution = ref({})            // Distribución de montos por mes
const singleAmount = ref('')                 // Monto único para transferencias simples
const note = ref('')                         // Descripción de la transferencia
const generalError = ref('')                 // Error general del formulario

// Computed: Verifica si el mes de origen es diciembre
const isDecember = computed(() => {
  return props.source.month?.toLowerCase() === 'diciembre'
})

// Computed: Calcula el monto disponible considerando transferencias previas
const availableAmount = computed(() => {
  if (!props.source) return 0

  // Calcular movimientos previos desde este origen
  const previousTransfers = budgetMovements.filter(movement =>
    movement.from.project === props.source.project &&
    movement.from.month === props.source.month
  ).reduce((total, movement) => total + movement.from.amount, 0)

  // Saldo disponible = saldo original - transferencias previas
  return Math.max(0, props.source.amount - previousTransfers)
})

// Computed: Lista de proyectos disponibles excluyendo el actual
const availableProjects = computed(() => {
  return [...new Set(rows.map(row => row.project))].filter(project => project !== props.source.project)
})

// Computed: Lista de meses disponibles posteriores al mes actual
const availableMonths = computed(() => {
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ]

  const currentMonthIndex = months.indexOf(props.source.month?.toLowerCase())
  return months
    .slice(currentMonthIndex + 1)
    .map(month => ({
      value: month,
      label: capitalize(month)
    }))
})

// Computed: Determina si mostrar el input de monto único
const shouldShowSingleAmount = computed(() => {
  return transferToOtherProject.value || selectedMonths.value.length === 1
})

// Computed: Calcula el total distribuido entre meses
const totalDistributed = computed(() => {
  return Object.values(monthDistribution.value).reduce((total, amount) => {
    return total + (parseInt(amount.replace(/\D/g, '')) || 0)
  }, 0)
})

// Computed: Parsea el monto único a número
const parsedSingleAmount = computed(() => {
  return singleAmount.value ? parseInt(singleAmount.value.replace(/\D/g, '')) || 0 : 0
})

// Computed: Valida si el formulario es válido para enviar
const isFormValid = computed(() => {
  if (generalError.value) return false
  if (availableAmount.value <= 0) return false

  // Validar que se haya seleccionado al menos un mes (excepto cuando es transferencia a proyecto)
  if (!transferToOtherProject.value && selectedMonths.value.length === 0) {
    return false
  }

  // Validar que se haya seleccionado un proyecto cuando es transferencia a proyecto
  if (transferToOtherProject.value && !selectedProject.value) {
    return false
  }

  const hasValidAmount = selectedMonths.value.length > 1
    ? totalDistributed.value > 0 && totalDistributed.value <= availableAmount.value
    : parsedSingleAmount.value > 0 && parsedSingleAmount.value <= availableAmount.value

  return hasValidAmount && note.value
})

// Computed: Mensaje de error para el monto único
const getSingleAmountError = computed(() => {
  if (parsedSingleAmount.value > availableAmount.value) {
    return `El monto no puede ser mayor a ${formatCurrency(availableAmount.value)}`
  }
  return ''
})

// Función: Formatea un número como moneda colombiana
const formatCurrency = (value) => {
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

// Función: Capitaliza la primera letra de un string
const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// Función: Obtiene el label formateado para un mes
const getMonthLabel = (month) => {
  return capitalize(month)
}

// Función: Formatea el monto único mientras se escribe
const formatSingleAmount = () => {
  const num = parseInt(singleAmount.value.replace(/\D/g, ''), 10)
  singleAmount.value = isNaN(num) ? '' : formatCurrency(num)
  validateForm()
}

// Función: Formatea el monto de distribución para un mes específico
const formatMonthAmount = (month) => {
  const num = parseInt(monthDistribution.value[month]?.replace(/\D/g, '') || '0', 10)
  monthDistribution.value[month] = isNaN(num) ? '' : formatCurrency(num)
  validateForm()
}

// Función: Obtiene mensaje de error para un mes específico
const getMonthError = (month) => {
  const amount = parseInt(monthDistribution.value[month]?.replace(/\D/g, '') || '0', 10)

  if (amount > availableAmount.value) {
    return `No puede exceder ${formatCurrency(availableAmount.value)}`
  }
  return ''
}

// Función: Valida el formulario y establece errores generales
const validateForm = () => {
  generalError.value = ''

  if (selectedMonths.value.length > 1) {
    if (totalDistributed.value > availableAmount.value) {
      generalError.value = `El total distribuido (${formatCurrency(totalDistributed.value)}) excede el disponible (${formatCurrency(availableAmount.value)})`
    }
  }
}

// Función: Maneja el envío del formulario de transferencia
const handleSubmit = () => {
  if (!isFormValid.value) return

  const transferData = {
    project: props.source.project,
    from: {
      month: props.source.month,
      amount: selectedMonths.value.length > 1 ? totalDistributed.value : parsedSingleAmount.value
    },
    to: {},
    note: note.value,
    user: 'admin',
    timestamp: new Date().toISOString()
  }

  if (transferToOtherProject.value) {
    transferData.to = {
      month: 'enero',
      amount: parsedSingleAmount.value
    }
  } else if (selectedMonths.value.length > 1) {
    // Para distribución múltiple
    transferData.to = {
      months: selectedMonths.value.map(month => ({
        month: month,
        amount: parseInt(monthDistribution.value[month]?.replace(/\D/g, '') || '0', 10)
      }))
    }
  } else {
    // Transferencia simple a otro mes (1 mes seleccionado)
    transferData.to = {
      month: selectedMonths.value[0],
      amount: parsedSingleAmount.value
    }
  }

  // Agregar el movimiento
  console.log(transferData);

  budgetMovements.push(transferData)

  // Emitir el evento de transferencia
  emit('transfer', transferData)

  // Limpiar y cerrar
  handleClose()
}

// Función: Maneja el cierre del modal
const handleClose = () => {
  resetForm()
  emit('close')
}

// Función: Reinicia todos los estados del formulario
const resetForm = () => {
  transferToOtherMonth.value = false
  transferToOtherProject.value = false
  selectedProject.value = ''
  selectedMonths.value = []
  monthDistribution.value = {}
  singleAmount.value = ''
  note.value = ''
  generalError.value = ''
}

// Watcher: Reacciona a cambios en los meses seleccionados
watch(selectedMonths, (newMonths) => {
  // Inicializar distribución para nuevos meses (solo si hay más de 1)
  if (newMonths.length > 1) {
    newMonths.forEach(month => {
      if (!monthDistribution.value[month]) {
        monthDistribution.value[month] = ''
      }
    })

    // Remover meses que ya no están seleccionados
    Object.keys(monthDistribution.value).forEach(month => {
      if (!newMonths.includes(month)) {
        delete monthDistribution.value[month]
      }
    })
  } else {
    // Limpiar distribución si solo hay 1 mes
    monthDistribution.value = {}

    // Auto-llenar el monto único con el total disponible
    if (newMonths.length === 1 && !transferToOtherProject.value) {
      singleAmount.value = formatCurrency(availableAmount.value)
    }
  }

  validateForm()
})

// Watcher: Reacciona a cambios en las opciones de transferencia
watch([transferToOtherMonth, transferToOtherProject], () => {
  if (transferToOtherProject.value) {
    transferToOtherMonth.value = false
    selectedMonths.value = []
  }
  validateForm()
})

// Watcher: Reacciona a cambios en la visibilidad del modal
watch(() => props.visible, (newVal) => {
  if (newVal) {
    resetForm()
    // Auto-seleccionar el primer mes disponible
    if (availableMonths.value.length > 0 && !isDecember.value) {
      selectedMonths.value = [availableMonths.value[0].value]
    }
  }
})
</script>
