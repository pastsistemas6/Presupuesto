<template>
  <div class="relative flex flex-wrap gap-4 mb-6 items-start" ref="filterContainer">
    <!-- Botón Proyectos -->
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

    <!-- Botón Meses -->
    <div class="relative">
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

    <!-- Botón Limpiar todos -->
    <Button
      @click="clearFilters"
      :disabled="!selectedProjects.length && !selectedMonths.length"
      class="px-5! py-2.5! text-sm! rounded-md text-white"
      :class="{
        'bg-[#545386] hover:bg-[#3e3c61]': selectedProjects.length || selectedMonths.length,
        'bg-gray-300 text-gray-500 cursor-not-allowed':
          !selectedProjects.length && !selectedMonths.length,
      }"
    >
      Limpiar filtros
    </Button>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted, onBeforeUnmount } from 'vue'

import Button from '../form/Button.vue'

const props = defineProps({
  rows: Array,
})

const emit = defineEmits(['filter'])

const selectedProjects = ref([])
const selectedMonths = ref([])

const showProjects = ref(false)
const showMonths = ref(false)

const filterContainer = ref(null)

const toggleDropdown = (type) => {
  if (type === 'projects') {
    showProjects.value = !showProjects.value
    showMonths.value = false
  } else if (type === 'months') {
    showMonths.value = !showMonths.value
    showProjects.value = false
  }
}

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

const uniqueProjects = computed(() => {
  return [...new Set(props.rows.map((row) => row.project))]
})

const emitFilters = () => {
  emit('filter', {
    projects: selectedProjects.value,
    months: selectedMonths.value,
  })
}

const clearFilter = (type) => {
  if (type === 'projects') {
    selectedProjects.value = []
  } else if (type === 'months') {
    selectedMonths.value = []
  }
  emitFilters()
}

const clearFilters = () => {
  selectedProjects.value = []
  selectedMonths.value = []
  emitFilters()
}

// Cerrar dropdowns si se hace clic fuera
const handleClickOutside = (event) => {
  if (!filterContainer.value?.contains(event.target)) {
    showProjects.value = false
    showMonths.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
