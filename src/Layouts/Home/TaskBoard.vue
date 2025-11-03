<template>
  <!-- Contenedor principal -->
  <div class="pt-4 pb-6 flex flex-col shadow-sm rounded-lg cursor-default">
    <!-- Título de la página -->
    <h2 class="w-full pl-8 text-4xl font-bold text-[#545386]">Gestión de proyectos</h2>
    <!-- Línea divisoria -->
    <div class="bg-gray-200 mt-4 mb-6 px-3 py-[0.8px]"></div>

    <!-- Sección de filtros -->
    <div class="px-6">
      <MultiFilters
        :rows="allTasks"
        @filter="handleFilter"
        layout="taskboard"
      />
    </div>

    <div class="px-6">
      <!-- Layout para 1 columna visible -->
      <div v-if="visibleColumnsCount === 1" class="w-full">
        <div v-if="showHighPriority" class="w-full">
          <TaskColumn
            title="Prioridad alta"
            color="red"
            :modelValue="filteredHigh"
            @update:modelValue="(val) => filteredHigh = val"
            @task-update="handleTaskUpdate"
          />
        </div>
        <div v-else-if="showMediumPriority" class="w-full">
          <TaskColumn
            title="Prioridad media"
            color="yellow"
            :modelValue="filteredMedium"
            @update:modelValue="(val) => filteredMedium = val"
            @task-update="handleTaskUpdate"
          />
        </div>
        <div v-else-if="showLowPriority" class="w-full">
          <TaskColumn
            title="Prioridad baja"
            color="green"
            :modelValue="filteredLow"
            @update:modelValue="(val) => filteredLow = val"
            @task-update="handleTaskUpdate"
          />
        </div>
      </div>

      <!-- Layout para 2 columnas visibles -->
      <div v-else-if="visibleColumnsCount === 2" class="grid grid-cols-2 gap-6">
        <div v-if="showHighPriority" class="w-full">
          <TaskColumn
            title="Prioridad alta"
            color="red"
            :modelValue="filteredHigh"
            @update:modelValue="(val) => filteredHigh = val"
            @task-update="handleTaskUpdate"
          />
        </div>
        <div v-if="showMediumPriority" class="w-full">
          <TaskColumn
            title="Prioridad media"
            color="yellow"
            :modelValue="filteredMedium"
            @update:modelValue="(val) => filteredMedium = val"
            @task-update="handleTaskUpdate"
          />
        </div>
        <div v-if="showLowPriority && !showMediumPriority" class="w-full">
          <TaskColumn
            title="Prioridad baja"
            color="green"
            :modelValue="filteredLow"
            @update:modelValue="(val) => filteredLow = val"
            @task-update="handleTaskUpdate"
          />
        </div>
      </div>

      <!-- Layout para 3 columnas visibles -->
      <div v-else class="grid grid-cols-41 place-items-start">
        <!-- Columna Prioridad Baja -->
        <div v-if="showLowPriority" class="col-span-13 w-full">
          <TaskColumn
            title="Prioridad baja"
            color="green"
            :modelValue="filteredLow"
            @update:modelValue="(val) => filteredLow = val"
            @task-update="handleTaskUpdate"
          />
        </div>
        <!-- Separador entre columnas -->
        <div v-if="showLowPriority && showMediumPriority && showHighPriority"
             class="col-span-1 border-r-2 px-2 h-full border-gray-300"></div>

        <!-- Columna Prioridad Media -->
        <div v-if="showMediumPriority" class="col-span-13 w-full">
          <TaskColumn
            title="Prioridad media"
            color="yellow"
            :modelValue="filteredMedium"
            @update:modelValue="(val) => filteredMedium = val"
            @task-update="handleTaskUpdate"
          />
        </div>
        <!-- Separador entre columnas -->
        <div v-if="((showLowPriority && showMediumPriority && showHighPriority) ||
                   (!showLowPriority && showMediumPriority && showHighPriority) ||
                   (showLowPriority && !showMediumPriority && showHighPriority))"
             class="col-span-1 border-r-2 px-2 h-full border-gray-300"></div>

        <!-- Columna Prioridad Alta -->
        <div v-if="showHighPriority" class="col-span-13 w-full">
          <TaskColumn
            title="Prioridad alta"
            color="red"
            :modelValue="filteredHigh"
            @update:modelValue="(val) => filteredHigh = val"
            @task-update="handleTaskUpdate"
          />
        </div>
      </div>

      <!-- Botón para agregar nuevo proyecto -->
      <div class="add-button">
        <Button @click="handleAdd" class="w-full bg-[#545386] text-white">Agregar proyecto</Button>
      </div>

      <!-- Modal para agregar nuevo proyecto -->
      <BaseModal :visible="showModal" @close="closeModal" :tamano="true">
        <h2 class="text-xl font-semibold mb-4 text-[#545386]">Agregar nuevo proyecto</h2>

        <!-- Formulario para nuevo proyecto -->
        <form class="grid grid-cols-2 gap-x-3" @submit.prevent="saveNewProject">
          <Input
            v-model="newProject.descripcion"
            label="Descripción del proyecto"
            class="w-full col-span-2"
            type="text"
            clase_label="label2"
            clase_input="input2"
            required
          />

          <Input
            v-model="newProject.presupuestado"
            label="Inversión del proyecto"
            class="w-full"
            type="number"
            clase_label="label2"
            clase_input="input2"
            required
          />

          <Input
            v-model="newProject.empresa"
            label="Empresa responsable"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input2"
            required
          />

          <Input
            v-model="newProject.area"
            label="Area"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input2"
            required
          />

          <Input
            v-model="newProject.subArea"
            label="Sub-area"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input2"
            required
          />

          <Input
            v-model="newProject.grupo"
            label="Grupo"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input2"
            required
          />

          <Input
            v-model="newProject.finca"
            label="Finca"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input2"
            required
          />

          <Input
            v-model="newProject.tipoUnidad"
            label="Tipo de unidad"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input2"
            required
          />

          <!-- Selector de prioridad -->
          <div>
            <label class="block mb-1.5 text-sm font-medium text-gray-600">Prioridad</label>
            <select
              v-model="newProject.prioridad"
              class="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#545386]"
            >
              <option value="3">Baja</option>
              <option value="2">Media</option>
              <option value="1">Alta</option>
            </select>
          </div>

          <!-- Botón de guardar -->
          <div class="text-right pt-2 col-span-2">
            <Button type="submit" class="bg-[#545386] text-white py-2!"> Guardar </Button>
          </div>
        </form>
      </BaseModal>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TaskColumn from '@/components/Home/TaskColumn.vue'
import MultiFilters from '@/components/Utils/MultiFilters.vue';
import Input from '@/components/form/Input.vue';
import BaseModal from '@/components/Utils/BaseModal.vue';
import Button from '@/components/form/Button.vue';
import { data, lowPriorityTasks, mediumPriorityTasks, highPriorityTasks } from '@/Services/proyect'

// Estados reactivos para datos y filtros
const allTasks = ref([])
const filteredLow = ref([])
const filteredMedium = ref([])
const filteredHigh = ref([])
const activeFilters = ref({})

// Estados para el modal de nuevo proyecto
const showModal = ref(false)
const newProject = ref({
  descripcion: '',
  presupuestado: 0,
  empresa: '',
  area: '',
  subArea: '',
  grupo: '',
  finca: '',
  tipoUnidad: '',
  estado: 'En curso',
  prioridad: '1'
})

// Computed properties para controlar visibilidad de columnas
const showLowPriority = computed(() => {
  return !activeFilters.value.prioridad ||
         activeFilters.value.prioridad.length === 0 ||
         activeFilters.value.prioridad.includes('3') ||
         activeFilters.value.prioridad.includes('low')
})

const showMediumPriority = computed(() => {
  return !activeFilters.value.prioridad ||
         activeFilters.value.prioridad.length === 0 ||
         activeFilters.value.prioridad.includes('2') ||
         activeFilters.value.prioridad.includes('medium')
})

const showHighPriority = computed(() => {
  return !activeFilters.value.prioridad ||
         activeFilters.value.prioridad.length === 0 ||
         activeFilters.value.prioridad.includes('1') ||
         activeFilters.value.prioridad.includes('high')
})

// Computed para contar columnas visibles
const visibleColumnsCount = computed(() => {
  let count = 0
  if (showLowPriority.value) count++
  if (showMediumPriority.value) count++
  if (showHighPriority.value) count++
  return count
})

// Función para abrir modal de nuevo proyecto
const handleAdd = () => {
  showModal.value = true
}

// Función para cerrar modal
const closeModal = () => {
  showModal.value = false
  resetNewProject()
}

// Función para resetear formulario de nuevo proyecto
const resetNewProject = () => {
  newProject.value = {
    descripcion: '',
    presupuestado: 0,
    empresa: '',
    area: '',
    subArea: '',
    grupo: '',
    finca: '',
    tipoUnidad: '',
    estado: 'En curso',
    prioridad: '1'
  }
}

// Función para guardar nuevo proyecto
const saveNewProject = () => {
  // Generar ID único
  const newId = Math.max(...allTasks.value.map(t => t.id), 0) + 1

  // Obtener fecha actual
  const now = new Date()
  const fecha = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  const projectToAdd = {
    id: newId,
    fecha: fecha,
    ...newProject.value,
    presupuestado: Number(newProject.value.presupuestado),
    prioridad: Number(newProject.value.prioridad)
  }

  // Agregar a allTasks
  allTasks.value.push(projectToAdd)

  // Re-aplicar filtros para actualizar las columnas
  applyFilters()

  closeModal()
}

// Función para manejar actualizaciones de tareas
const handleTaskUpdate = (updatedTask) => {
  updateTaskInLists(updatedTask)
}

// Función para actualizar tarea en todas las listas
const updateTaskInLists = (updatedTask) => {
  const index = allTasks.value.findIndex(task => task.id === updatedTask.id)
  if (index !== -1) {
    allTasks.value[index] = { ...allTasks.value[index], ...updatedTask }
  }

  // Re-aplicar filtros para actualizar las columnas
  applyFilters()
}

// Función para manejar filtros aplicados
const handleFilter = (filters) => {
  activeFilters.value = filters
  applyFilters()
}

// Función para aplicar filtros a las tareas
const applyFilters = () => {
  // Filtrar todas las tareas según los criterios activos
  const filteredTasks = allTasks.value.filter(task => {
    // Filtrar por estado
    if (activeFilters.value.estados && activeFilters.value.estados.length > 0) {
      if (!activeFilters.value.estados.includes(task.estado)) return false
    }

    // Filtrar por proyecto (descripción)
    if (activeFilters.value.projects && activeFilters.value.projects.length > 0) {
      const matchesProyecto = activeFilters.value.projects.some(proyecto =>
        task.descripcion.toLowerCase().includes(proyecto.toLowerCase())
      )
      if (!matchesProyecto) return false
    }

    // Filtrar por prioridad
    if (activeFilters.value.prioridad && activeFilters.value.prioridad.length > 0) {
      const taskPriority = task.prioridad.toString()
      const filterMatches = activeFilters.value.prioridad.some(filterPriority => {
        const normalizedFilter = getPriorityValue(filterPriority).toString()
        return taskPriority === normalizedFilter
      })
      if (!filterMatches) return false
    }

    return true
  })

  // Dividir tareas filtradas por prioridad
  filteredLow.value = filteredTasks.filter(task => task.prioridad === 3 || task.prioridad === '3')
  filteredMedium.value = filteredTasks.filter(task => task.prioridad === 2 || task.prioridad === '2')
  filteredHigh.value = filteredTasks.filter(task => task.prioridad === 1 || task.prioridad === '1')
}

// Función auxiliar para normalizar valores de prioridad
const getPriorityValue = (priority) => {
  if (typeof priority === 'number') return priority
  const priorityMap = { 'low': 3, 'medium': 2, 'high': 1 }
  return priorityMap[priority] || priority
}

// Inicialización al montar el componente
onMounted(async () => {
  // Usar data como fuente principal
  allTasks.value = [...data]

  // Inicializar listas filtradas
  applyFilters()
})
</script>

<style scoped>
/* Botón flotante para agregar proyectos */
.add-button {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}
</style>
