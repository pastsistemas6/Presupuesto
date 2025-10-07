<!-- layouts/Movements.vue -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-[#545386]">
      Movimientos del Proyecto: {{ projectName }}
    </h1>

    <DataTable
      :rows="[filteredProject]"
      :columns="columns"
    />

    <div class="mt-6 text-right">
      <button
        class="bg-[#545386] text-white px-4 py-2 rounded"
        @click="showModal = true"
      >
        Registrar Movimiento
      </button>
    </div>

    <BudgetTransferModal
      :visible="showModal"
      :source="selectedTransfer"
      :projects="projectList"
      @close="showModal = false"
      @transfer="handleTransfer"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import DataTable from '@/components/Utils/DataTable.vue'
import BudgetTransferModal from '@/components/Utils/BudgetTransferModal.vue'

import { rows as allRows } from '@/Services/rows'
import { columns } from '@/Services/columns'

const route = useRoute()
const projectName = route.params.projectName

const showModal = ref(false)
const selectedTransfer = ref(null)

const filteredProject = computed(() =>
  allRows.find((r) => r.project === projectName)
)

const projectList = computed(() => [...new Set(allRows.map((r) => r.project))])

const handleTransfer = ({ amount, from, to }) => {
  const origin = allRows.find((r) => r.project === from.project)
  const target = allRows.find((r) => r.project === to.project)

  if (!origin || !target) return

  const fromKey = `${from.month}_budget`
  const toKey = `${to.month}_budget`

  if (origin[fromKey] < amount) {
    alert('Fondos insuficientes')
    return
  }

  origin[fromKey] -= amount
  target[toKey] += amount
}
</script>
