<!-- src/components/Modals/BudgetTransferModal.vue -->
<template>
  <BaseModal :visible="visible" @close="emit('close')">
    <h2 class="text-xl font-semibold mb-4 text-[#545386]">Transferir presupuesto</h2>

    <div class="text-sm text-gray-700 mb-4">
      <p><strong>Desde:</strong> {{ source.project }} - {{ capitalize(source.month) }}</p>
      <p>Presupuestado: {{ formatCOP(source.budget) }}</p>
      <p>Ejecutado (real): {{ formatCOP(source.real) }}</p>
    </div>

    <form @submit.prevent="handleTransfer" class="space-y-4">
      <Input
        v-model="amount"
        value="0"
        label="Monto a transferir (COP)"
        type="number"
        clase_label="label2"
        clase_input="input2"
      />

      <div>
        <label class="block text-sm font-medium text-gray-600">Proyecto destino</label>
        <select
          v-model="targetProject"
          class="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
        >
          <option
            v-for="project in projects"
            :key="project"
            :value="project"
            :disabled="project === source.project"
          >
            {{ project }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-600">Mes destino</label>
        <select
          v-model="targetMonth"
          class="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
        >
          <option v-for="month in months" :key="month.label" :value="month.label">
            {{ month.label }}
          </option>
        </select>
      </div>

      <div class="text-right pt-2">
        <Button type="submit" class="bg-[#545386] text-white py-2!"> Transferir </Button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import BaseModal from './BaseModal.vue'
import Input from '@/components/form/Input.vue'
import Button from '@/components/form/Button.vue'

const props = defineProps({
  visible: Boolean,
  source: Object, // { project, month, budget, real }
  projects: Array,
})

const emit = defineEmits(['close', 'transfer'])

const amount = ref(0)
const targetProject = ref('')
const fecha = new Date()
const mes = fecha.getMonth()

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

const targetMonth = ref(months[mes].label)

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const formatCOP = (value) =>
  Number(value || 0).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  })

const handleTransfer = () => {
  if (!targetProject.value || !targetMonth.value || amount.value <= 0) return

  console.log(amount.value)
  console.log(props.source.project)
  console.log(props.source.month)
  console.log(targetProject.value)
  console.log(targetMonth.value)

  emit('transfer', {
    amount: Number(amount.value),
    from: {
      project: props.source.project,
      month: props.source.month,
    },
    to: {
      project: targetProject.value,
      month: targetMonth.value,
    },
  })

  // reset
  amount.value = 0
  targetProject.value = ''
  targetMonth.value = mes
  emit('close')
}
</script>
