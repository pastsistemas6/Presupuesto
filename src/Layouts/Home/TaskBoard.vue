<template>
  <div class="py-4 flex flex-col shadow-sm rounded-md">
    <h2 class="w-full pl-8 text-4xl font-bold text-[#545386]">Gestión de proyectos</h2>
    <div class="bg-gray-200 mt-4 mb-8 px-3 py-[0.8px]"></div>
    <div class="grid grid-cols-6 gap-4 place-items-center">
      <TaskColumn
        class="col-span-2 w-full"
        title="Prioridad baja"
        color="green"
        :tasks="lowPriorityTasks"
      />
      <TaskColumn
        class="col-span-2 w-full"
        title="Prioridad media"
        color="yellow"
        :tasks="mediumPriorityTasks"
      />
      <TaskColumn
        class="col-span-2 w-full"
        title="Prioridad alta"
        color="red"
        :tasks="highPriorityTasks"
      />
      <div class="add-button">
        <Button @click="handleAdd" class="w-full bg-[#545386] text-white">Agregar proyecto</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import TaskColumn from '@/components/Home/TaskColumn.vue'
import Button from '@/components/form/Button.vue'

const lowPriorityTasks = [
  { id: 1, text: 'Proyecto 1' },
  { id: 2, text: 'Proyecto 2' },
]

const mediumPriorityTasks = [
  { id: 3, text: 'Proyecto 3' },
  { id: 4, text: 'Proyecto 4' },
]

const highPriorityTasks = [
  { id: 5, text: 'Proyecto 5' },
  { id: 6, text: 'Proyecto 6' },
]

const handleAdd = () => {
  console.log('Agregar proyecto')
}
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
