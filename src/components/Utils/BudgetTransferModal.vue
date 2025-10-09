<template>
  <BaseModal :visible="visible" @close="emit('close')">
    <h2 class="text-xl font-semibold mb-4 text-[#545386]">Transferir presupuesto</h2>

    <div class="text-sm text-gray-700 mb-4">
      <p><strong>Desde:</strong> {{ source.project }} - <strong>{{ capitalize(source.month) }}</strong></p>
      <p><strong>Presupuestado:</strong> {{ formatCOP(source.budget) }}</p>
      <p><strong>Ejecutado (real):</strong> {{ formatCOP(source.real) }}</p>
      <p><strong>Monto (sobrante):</strong> {{ formatCOP(source.amount) }}</p>
    </div>

    <form @submit.prevent="handleTransfer" class="mt-2 space-y-4 overflow-y-scroll max-h-110">
      <Input
        v-model="formattedAmount"
        placeholder="0"
        label="Monto a transferir (COP)"
        type="text"
        clase_label="label2"
        clase_input="input2"
        required
        :error="inputError"
      />

      <Input
        v-model="note"
        placeholder="Razón"
        label="Descripción"
        type="text"
        clase_label="label2"
        clase_input="input2"
        required
      />

      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">Mes(es) destino</label>
        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="month in availableMonths"
            :key="month.label"
            class="flex items-center gap-x-2"
          >
            <input
              type="checkbox"
              :value="month.label"
              v-model="selectedTargetMonths"
              class="form-checkbox"
            />
            <span>{{ month.label }}</span>
          </div>
        </div>
      </div>

      <div v-if="selectedTargetMonths.length > 1" class="mt-4 space-y-2">
        <div
          v-for="month in selectedTargetMonths"
          :key="month"
        >
          <Input
            :label="`Monto para ${month}`"
            type="text"
            :modelValue="distributedAmountModels[month].value"
            @update:modelValue="(val) => updateDistributedAmount(month, val)"
            placeholder="0"
            clase_label="label2"
            clase_input="input2"
            :error="inputErrors"
          />
        </div>
      </div>

      <div class="text-right pt-2">
        <Button type="submit" class="bg-[#545386] text-white py-2!"> Transferir </Button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, watch } from 'vue'
import BaseModal from './BaseModal.vue'
import Input from '@/components/form/Input.vue'
import Button from '../form/Button.vue'

const props = defineProps({
  visible: Boolean,
  source: Object, // { project, month, budget, real, amount }
})

const emit = defineEmits(['close', 'transfer'])

const amount = ref(0)
const note = ref('')
const user = ref('usuario') // Reemplaza por usuario real

const selectedTargetMonths = ref([])
const distributedAmounts = ref({})
const inputError = ref('')
const inputErrors = ref('')

const months = [
  { label: 'Enero', value: 0 },
  { label: 'Febrero', value: 1 },
  { label: 'Marzo', value: 2 },
  { label: 'Abril', value: 3 },
  { label: 'Mayo', value: 4 },
  { label: 'Junio', value: 5 },
  { label: 'Julio', value: 6 },
  { label: 'Agosto', value: 7 },
  { label: 'Septiembre', value: 8 },
  { label: 'Octubre', value: 9 },
  { label: 'Noviembre', value: 10 },
  { label: 'Diciembre', value: 11 },
]

const availableMonths = computed(() => {
  const sourceMonthIndex = months.find(m => m.label.toLowerCase() === props.source.month)?.value || 0
  console.log(props.source.month);

  return months.slice(sourceMonthIndex + 1)
})

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const formatCOP = (value) =>
  Number(value || 0).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  })

const formattedAmount = computed({
  get() {
    return amount.value ? amount.value.toLocaleString('es-CO') : ''
  },
  set(val) {
    const raw = String(val).replace(/[^\d]/g, '')
    amount.value = raw ? parseInt(raw, 10) : 0
  }
})

// Computed por cada mes destino
const distributedAmountModels = computed(() => {
  const models = {}
  for (const month of selectedTargetMonths.value) {
    models[month] = computed({
      get() {
        return distributedAmounts.value[month]
          ? distributedAmounts.value[month].toLocaleString('es-CO')
          : ''
      },
      set(val) {
        const raw = String(val).replace(/[^\d]/g, '')
        distributedAmounts.value[month] = raw ? parseInt(raw, 10) : 0
      }
    })
  }
  return models
})

const updateDistributedAmount = (month, inputVal) => {
  const raw = String(inputVal).replace(/[^\d]/g, '')
  distributedAmounts.value[month] = raw ? parseInt(raw, 10) : 0
}

const handleTransfer = () => {
  if (selectedTargetMonths.value.length === 1) {
    const month = selectedTargetMonths.value[0]
    distributedAmounts.value = { [month]: amount.value }
  }

  if (selectedTargetMonths.value.length > 1) {
    let total = 0
    let hasEmpty = false
    inputErrors.value = ''

    for (const month of selectedTargetMonths.value) {
      const val = distributedAmounts.value[month]
      if (!val || val <= 0) {
        inputErrors.value = `El mes "${month}" debe tener un monto mayor a 0.`
        hasEmpty = true
        break
      }
      total += val
    }

    if (hasEmpty) return

    if (total > amount.value) {
      inputErrors.value = 'La suma total excede el monto disponible.'
      return
    }
  }

  const total = Object.values(distributedAmounts.value).reduce((sum, val) => sum + (val || 0), 0)

  if (amount.value <= 0) {
    inputError.value = 'Debes asignar un monto mayor a 0.'
    return
  }

  if (amount.value > props.source.amount) {
    inputError.value = 'El monto excede el disponible.'
    return
  }

  if (total <= 0) {
    inputErrors.value = 'Debes distribuir al menos un monto mayor a 0.'
    return
  }

  const sourceMonthIndex = months.find(m => m.label === props.source.month)?.value || 0
  for (const month of selectedTargetMonths.value) {
    const targetIndex = months.find(m => m.label === month)?.value || 0
    if (targetIndex <= sourceMonthIndex) {
      alert(`No puedes transferir al mes "${month}" porque es igual o anterior al origen.`)
      return
    }
  }

  selectedTargetMonths.value.forEach((month) => {
    const val = distributedAmounts.value[month]
    if (val > 0) {
      emit('transfer', {
        project: props.source.project,
        from: { month: props.source.month, amount: val },
        to: { month, amount: val },
        note: note.value,
        user: user.value
      })
    }
  })

  // Reset
  amount.value = 0
  note.value = ''
  selectedTargetMonths.value = []
  distributedAmounts.value = {}
  inputError.value = ''
  inputErrors.value = ''
  emit('close')
}

watch(
  () => props.visible,
  (val) => {
    if (val && props.source?.amount) {
      amount.value = props.source.amount
      note.value = ''
      selectedTargetMonths.value = []
      distributedAmounts.value = {}
      inputError.value = ''
      inputErrors.value = ''
    }
  }
)
</script>
