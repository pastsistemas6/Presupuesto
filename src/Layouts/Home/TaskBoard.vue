<template>
  <div class="pt-4 pb-6 flex flex-col shadow-sm rounded-lg">
    <h2 class="w-full pl-8 text-4xl font-bold text-[#545386]">Gestión de proyectos</h2>
    <div class="bg-gray-200 mt-4 mb-6 px-3 py-[0.8px]"></div>
    <div class="grid grid-cols-41 place-items-start px-6">
      <TaskColumn class="col-span-13 w-full" title="Prioridad baja" color="green" :tasks="low" />
      <div class="col-span-1 border-r-2 px-2 h-full border-r-gray-200"></div>
      <TaskColumn
        class="col-span-13 w-full"
        title="Prioridad media"
        color="yellow"
        :tasks="medium"
      />
      <div class="col-span-1 border-r-2 px-2 h-full border-r-gray-200"></div>
      <TaskColumn class="col-span-13 w-full" title="Prioridad alta" color="red" :tasks="high" />
      <div class="add-button">
        <Button @click="handleAdd" class="w-full bg-[#545386] text-white">Agregar proyecto</Button>
      </div>

      <BaseModal :visible="showModal" @close="closeModal">
        <h2 class="text-xl font-semibold mb-4 text-[#545386]">Agregar nuevo proyecto</h2>

        <!-- Aquí colocas el formulario o inputs -->
        <form class="space-y-4">
          <Input
            v-model="username"
            label="Nombre del proyecto"
            id="username"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input2"
          />

          <Input
            v-model="username"
            label="Inversión del proyecto"
            id="username"
            class="w-full"
            type="number"
            clase_label="label2"
            clase_input="input2"
          />

          <div>
            <label class="block text-sm font-medium text-gray-600">Prioridad</label>
            <select
              class="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#545386]"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div class="text-right pt-2">
            <Button type="submit" class="bg-[#545386] text-white py-2!"> Guardar </Button>
          </div>
        </form>
      </BaseModal>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TaskColumn from '@/components/Home/TaskColumn.vue'

import Button from '@/components/form/Button.vue'
import Input from '@/components/form/Input.vue'
import BaseModal from '@/components/Utils/BaseModal.vue'
import { lowPriorityTasks, mediumPriorityTasks, highPriorityTasks } from '@/Services/proyect'

const low = ref([])
const medium = ref([])
const high = ref([])

const showModal = ref(false)

const handleAdd = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

onMounted(async () => {
  low.value = lowPriorityTasks
  medium.value = mediumPriorityTasks
  high.value = highPriorityTasks
})
</script>

<style scoped>
.task-board {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
}

.add-button {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}
</style>
