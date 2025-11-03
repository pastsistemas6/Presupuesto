<template>
  <div class="relative flex flex-wrap gap-4 mb-6 items-start" ref="filterContainer">

    <!-- Filtro de Proyectos -->
    <div class="relative">
      <Button
        @click="toggleDropdown('projects')"
        class="px-5! py-2.5! text-sm! rounded-md bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-white"
      >
        Proyectos
      </Button>

      <div
        v-if="showProjects"
        class="absolute z-10 mt-2 w-72 divide-y-2 divide-gray-300 max-h-56 overflow-auto bg-white border-2 border-gray-400 rounded-lg shadow-md px-3 py-2"
      >
        <div class="flex justify-between items-center">
          <p v-if="selectedProjects.length" class="text-sm! font-bold text-blue-600 px-1 py-1 mb-2">
            Quitar filtro ->
          </p>
          <Button
            v-if="selectedProjects.length"
            @click.stop="clearFilter('projects')"
            class="text-xs! text-red-400 p-0! mb-2"
          >
            <img class="w-5" src="../icons/icons8-delete-100.png" alt="" />
          </Button>
        </div>
        <label
          v-for="project in uniqueProjects"
          :key="project"
          class="flex items-center gap-3 text-sm my-1 py-1 pb-2"
        >
          <input
            type="checkbox"
            :value="project"
            v-model="selectedProjects"
            @change="emitFilters"
            class="accent-[#545386] w-4! h-4!"
          />
          {{ project }}
        </label>
      </div>
    </div>

    <!-- Filtro de Estados (solo para taskboard) -->
    <div v-if="showTaskboardFilters" class="relative">
      <Button
        @click="toggleDropdown('estados')"
        class="px-5! py-2.5! text-sm! rounded-md bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-white"
      >
        Estados
      </Button>

      <div
        v-if="showEstados"
        class="absolute z-10 mt-2 w-54 divide-y-2 divide-gray-300 max-h-56 overflow-auto bg-white border-2 border-gray-400 rounded-lg shadow-md px-3 py-2"
      >
        <div class="flex justify-between items-center">
          <p v-if="selectedEstados.length" class="text-sm! font-bold text-blue-600 px-1 py-1 mb-2">
            Quitar filtro ->
          </p>
          <Button
            v-if="selectedEstados.length"
            @click.stop="clearFilter('estados')"
            class="text-xs! text-red-400 p-0! mb-2"
          >
            <img class="w-5" src="../icons/icons8-delete-100.png" alt="" />
          </Button>
        </div>
        <label
          v-for="estado in uniqueEstados"
          :key="estado"
          class="flex items-center gap-3 text-sm my-1 py-1 pb-2"
        >
          <input
            type="checkbox"
            :value="estado"
            v-model="selectedEstados"
            @change="emitFilters"
            class="accent-[#545386] w-4! h-4!"
          />
          {{ estado }}
        </label>
      </div>
    </div>

    <!-- Filtro de Prioridades (solo para taskboard) -->
    <div v-if="showTaskboardFilters" class="relative">
      <Button
        @click="toggleDropdown('prioridades')"
        class="px-5! py-2.5! text-sm! rounded-md bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-white"
      >
        Prioridades
      </Button>

      <div
        v-if="showPrioridades"
        class="absolute z-10 mt-2 w-54 divide-y-2 divide-gray-300 max-h-56 overflow-auto bg-white border-2 border-gray-400 rounded-lg shadow-md px-3 py-2"
      >
        <div class="flex justify-between items-center">
          <p v-if="selectedPrioridades.length" class="text-sm! font-bold text-blue-600 px-1 py-1 mb-2">
            Quitar filtro ->
          </p>
          <Button
            v-if="selectedPrioridades.length"
            @click.stop="clearFilter('prioridades')"
            class="text-xs! text-red-400 p-0! mb-2"
          >
            <img class="w-5" src="../icons/icons8-delete-100.png" alt="" />
          </Button>
        </div>
        <label
          v-for="prioridad in uniquePrioridades"
          :key="prioridad"
          class="flex items-center gap-3 text-sm my-1 py-1 pb-2"
        >
          <input
            type="checkbox"
            :value="prioridad"
            v-model="selectedPrioridades"
            @change="emitFilters"
            class="accent-[#545386] w-4! h-4!"
          />
          {{ getPrioridadLabel(prioridad) }}
        </label>
      </div>
    </div>

    <!-- Filtro de Meses (solo para el otro layout) -->
    <div v-if="!showTaskboardFilters" class="relative">
      <Button
        @click="toggleDropdown('months')"
        class="px-5! py-2.5! text-sm! bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-white"
      >
        Meses
      </Button>

      <div
        v-if="showMonths"
        class="absolute z-10 mt-2 w-54 max-h-56 divide-y-2 divide-gray-300 overflow-auto bg-white border-2 border-gray-400 rounded-lg shadow-md px-3 py-2"
      >
        <div class="flex justify-between items-center">
          <p v-if="selectedMonths.length" class="text-sm! font-bold text-blue-600 px-1 py-1 mb-2">
            Quitar filtro ->
          </p>
          <Button
            v-if="selectedMonths.length"
            @click.stop="clearFilter('months')"
            class="text-xs! text-red-400 p-0! mb-2"
          >
            <img class="w-5" src="../icons/icons8-delete-100.png" alt="" />
          </Button>
        </div>
        <label
          v-for="month in months"
          :key="month.value"
          class="flex items-center gap-3 text-sm my-1 py-1 pb-2"
        >
          <input
            type="checkbox"
            :value="month.value"
            v-model="selectedMonths"
            @change="emitFilters"
            class="accent-[#545386] w-4! h-4!"
          />
          {{ month.label }}
        </label>
      </div>
    </div>

    <!-- Botón para limpiar todos los filtros -->
    <Button
      @click="clearFilters"
      :disabled="!hasActiveFilters"
      class="px-5! py-2.5! text-sm! rounded-md text-white"
      :class="{
        'bg-[#545386] hover:bg-[#3e3c61]': hasActiveFilters,
        'bg-gray-300 text-gray-500 cursor-not-allowed': !hasActiveFilters,
      }"
    >
      Limpiar filtros
    </Button>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted, onBeforeUnmount } from 'vue'
import Button from '../form/Button.vue'

// Props del componente
const props = defineProps({
  rows: Array,
  layout: {
    type: String,
    default: 'taskboard'
  }
})

// Emits para comunicación con el componente padre
const emit = defineEmits(['filter'])

// Estados reactivos para los filtros seleccionados
const selectedProjects = ref([])
const selectedMonths = ref([])
const selectedEstados = ref([])
const selectedPrioridades = ref([])

// Estados reactivos para controlar la visibilidad de los dropdowns
const showProjects = ref(false)
const showMonths = ref(false)
const showEstados = ref(false)
const showPrioridades = ref(false)

// Referencia al contenedor principal para detectar clicks fuera
const filterContainer = ref(null)

// Computed: Determina si mostrar filtros de taskboard
const showTaskboardFilters = computed(() => props.layout === 'taskboard')

// Computed: Verifica si hay filtros activos
const hasActiveFilters = computed(() => {
  return selectedProjects.value.length > 0 ||
         selectedMonths.value.length > 0 ||
         selectedEstados.value.length > 0 ||
         selectedPrioridades.value.length > 0
})

// Función: Alterna la visibilidad de los dropdowns
const toggleDropdown = (type) => {
  if (
    (type === 'projects' && showProjects.value) ||
    (type === 'months' && showMonths.value) ||
    (type === 'estados' && showEstados.value) ||
    (type === 'prioridades' && showPrioridades.value)
  ) {
    closeAllDropdowns()
    return
  }

  closeAllDropdowns()

  switch (type) {
    case 'projects':
      showProjects.value = true
      break
    case 'months':
      showMonths.value = true
      break
    case 'estados':
      showEstados.value = true
      break
    case 'prioridades':
      showPrioridades.value = true
      break
  }
}

// Función: Cierra todos los dropdowns
const closeAllDropdowns = () => {
  showProjects.value = false
  showMonths.value = false
  showEstados.value = false
  showPrioridades.value = false
}

// Array de meses para el filtro
const months = [
  { label: 'Enero', value: 'enero' },
  { label: 'Febrero', value: 'febrero' },
  { label: 'Marzo', value: 'marzo' },
  { label: 'Abril', value: 'abril' },
  { label: 'Mayo', value: 'mayo' },
  { label: 'Junio', value: 'junio' },
  { label: 'Julio', value: 'julio' },
  { label: 'Agosto', value: 'agosto' },
  { label: 'Septiembre', value: 'septiembre' },
  { label: 'Octubre', value: 'octubre' },
  { label: 'Noviembre', value: 'noviembre' },
  { label: 'Diciembre', value: 'diciembre' },
]

// Computed: Obtiene proyectos únicos de los datos
const uniqueProjects = computed(() => {
  return [...new Set(props.rows.map((row) => row.descripcion || row.project))]
})

// Computed: Obtiene estados únicos de los datos
const uniqueEstados = computed(() => {
  return [...new Set(props.rows.map((row) => row.estado).filter(Boolean))]
})

// Computed: Obtiene prioridades únicas normalizadas
const uniquePrioridades = computed(() => {
  const prioridades = props.rows.map((row) => {
    if (row.prioridad === 1 || row.prioridad === '1' || row.prioridad === 'high') return '1'
    if (row.prioridad === 2 || row.prioridad === '2' || row.prioridad === 'medium') return '2'
    if (row.prioridad === 3 || row.prioridad === '3' || row.prioridad === 'low') return '3'
    return row.prioridad
  }).filter(Boolean)

  return [...new Set(prioridades)]
})

// Función: Obtiene la etiqueta legible para una prioridad
const getPrioridadLabel = (prioridad) => {
  const labels = {
    'low': 'Baja',
    'medium': 'Media',
    'high': 'Alta',
    '1': 'Alta',
    '2': 'Media',
    '3': 'Baja',
    1: 'Alta',
    2: 'Media',
    3: 'Baja'
  }
  return labels[prioridad] || prioridad
}

// Función: Emite los filtros actuales al componente padre
const emitFilters = () => {
  const filters = {
    projects: selectedProjects.value,
    estados: selectedEstados.value,
    prioridad: selectedPrioridades.value,
    months: selectedMonths.value,
  }
  console.log('Emitting filters:', filters)
  emit('filter', filters)
}

// Función: Limpia un filtro específico
const clearFilter = (type) => {
  switch (type) {
    case 'projects':
      selectedProjects.value = []
      break
    case 'months':
      selectedMonths.value = []
      break
    case 'estados':
      selectedEstados.value = []
      break
    case 'prioridades':
      selectedPrioridades.value = []
      break
  }
  emitFilters()
}

// Función: Limpia todos los filtros
const clearFilters = () => {
  selectedProjects.value = []
  selectedMonths.value = []
  selectedEstados.value = []
  selectedPrioridades.value = []
  emitFilters()
}

// Función: Maneja el click fuera del componente para cerrar dropdowns
const handleClickOutside = (event) => {
  if (!filterContainer.value?.contains(event.target)) {
    closeAllDropdowns()
  }
}

// Lifecycle hooks para manejar eventos del DOM
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
