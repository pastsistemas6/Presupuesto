<template>
  <div :class="['task-card', colorClass]" @click="handleAdd">
    <p>{{ text }}</p>
    <span class="py-1 px-2 bg-gray-100 rounded-md whitespace-nowrap">
      {{ presupuestado ? formatCurrency(presupuestado) : '$ 0' }}
    </span>

    <Teleport to="body">
      <BaseModal :visible="showModal" @close="closeModal">
        <h2 class="text-xl font-semibold mb-4 text-[#545386]">Información detallada</h2>

        <form class="space-y-4">
          <Input
            v-model="props.text"
            label="Nombre del proyecto"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input1"
            disabled
          />

          <Input
            v-model="props.presupuestado"
            label="Inversión del proyecto"
            class="w-full"
            type="number"
            clase_label="label2"
            clase_input="input1"
            disabled
          />

          <Input
            v-model="props.estado"
            label="Estado actual"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input1"
            disabled
          />

          <div class="text-right pt-2">
            <Button type="button" @click="closeModal" class="bg-[#545386] text-white py-2!">
              Cerrar
            </Button>
          </div>
        </form>
      </BaseModal>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import BaseModal from '../Utils/BaseModal.vue'
import Button from '../form/Button.vue'
import Input from '../form/Input.vue'

const props = defineProps({
  id: Number,
  text: String,
  presupuestado: Number,
  estado: String,
  color: { type: String, default: 'green' },
})

const showModal = ref(false)

const handleAdd = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const formatCurrency = (value) => {
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}


const colorClass = `card-${props.color}`
</script>

<style scoped>
.task-card {
  width: 99%;
  padding: 1rem;
  border-radius: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}
.task-card:hover {
  background-color: #f3f3f3;
}

.card-green {
  background-color: #dcf6d7;
}

.card-yellow {
  background-color: #fff4cc;
}

.card-red {
  background-color: #ffd4d4;
}

.card-green.sortable-ghost {
  background-color: #bdf4b7 !important;
  border: 2px dashed #6fcf97;
}

.card-yellow.sortable-ghost {
  background-color: #fff3b0 !important;
  border: 2px dashed #e1c542;
}

.card-red.sortable-ghost {
  background-color: #ffb3b3 !important;
  border: 2px dashed #ff6b6b;
}
</style>
