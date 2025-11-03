<template>
  <!-- Tarjeta principal con color dinámico -->
  <div :class="['task-card', colorClass]" @click="handleAdd">
    <!-- Descripción del proyecto -->
    <p>{{ descripcion }}</p>

    <!-- Presupuesto formateado -->
    <span class="py-1 px-2 bg-gray-100 rounded-md whitespace-nowrap">
      {{ presupuestado ? formatCurrency(presupuestado) : '$ 0' }}
    </span>

    <!-- Modal teleportado al body -->
    <Teleport to="body">
      <BaseModal :visible="showModal" @close="closeModal" :tamano="true">
        <h2 class="text-xl font-semibold mb-4 text-[#545386]">Información detallada</h2>

        <!-- Formulario de edición -->
        <form class="grid grid-cols-2 gap-x-3" @submit.prevent="handleSave">

          <!-- Campo Descripción (solo lectura) -->
          <Input
            v-model="props.descripcion"
            label="Descripción del proyecto"
            class="w-full col-span-2"
            type="text"
            clase_label="label2"
            clase_input="input1"
            disabled
          />

          <!-- Campo Empresa (solo lectura) -->
          <Input
            v-model="props.empresa"
            label="Empresa responsable"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input1"
            disabled
          />

          <!-- Campo Area (solo lectura) -->
          <Input
            v-model="props.area"
            label="Area"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input1"
            disabled
          />

          <!-- Campo Sub-area (solo lectura) -->
          <Input
            v-model="props.subArea"
            label="Sub-area"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input1"
            disabled
          />

          <!-- Campo Grupo (solo lectura) -->
          <Input
            v-model="props.grupo"
            label="Grupo"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input1"
            disabled
          />

          <!-- Campo Finca (solo lectura) -->
          <Input
            v-model="props.finca"
            label="Finca"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input1"
            disabled
          />

          <!-- Campo Tipo Unidad (solo lectura) -->
          <Input
            v-model="props.tipoUnidad"
            label="Tipo de unidad"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input1"
            disabled
          />

          <!-- Campo Presupuesto (editable) -->
          <Input
            v-model="localPresupuestado"
            @input="handlePresupuestoChange"
            label="Inversión del proyecto"
            class="w-full"
            type="text"
            clase_label="label2"
            clase_input="input1 focus:bg-white! focus:border-2 focus:border-gray-300!"
            :disabled="props.estado === 'Terminado'"
          />

          <!-- Selector de Estado -->
          <div class="w-full flex flex-col">
            <label class="label2 mb-1.5 text-sm text-[#545386] font-medium">Estado actual</label>
            <select
              v-model="localEstado"
              @change="handleEstadoChange"
              :disabled="props.estado === 'Terminado'"
              :class="['w-full px-3 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#545386]', estadoColorClass]"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En curso">En curso</option>
              <option value="Terminado">Terminado</option>
            </select>
          </div>

          <!-- Botones de acción -->
          <div class="text-right pt-2 col-span-2">
            <Button
              type="button"
              @click="closeModal"
              class="bg-gray-500 text-white py-2! mr-2!"
              v-if="!hasChanges"
            >
              Cerrar
            </Button>
            <Button
              type="submit"
              class="bg-[#545386] text-white py-2!"
              v-if="hasChanges"
            >
              Guardar
            </Button>
          </div>
        </form>
      </BaseModal>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import BaseModal from '../Utils/BaseModal.vue'
import Button from '../form/Button.vue'
import Input from '../form/Input.vue'

// Props del componente
const props = defineProps({
  id: Number,
  descripcion: String,
  empresa: String,
  area: String,
  subArea: String,
  finca: String,
  tipoUnidad: String,
  grupo: String,
  presupuestado: Number,
  estado: String,
  color: { type: String, default: 'green' },
})

// Emits para comunicación con el padre
const emit = defineEmits(['update'])

// Estados reactivos
const showModal = ref(false)
const localPresupuestado = ref('')
const localEstado = ref('')
const hasChanges = ref(false)

// Función para abrir el modal
const handleAdd = () => {
  localPresupuestado.value = formatCurrency(props.presupuestado || 0)
  localEstado.value = props.estado || 'Pendiente'
  hasChanges.value = false
  showModal.value = true
}

// Función para cerrar el modal
const closeModal = () => {
  showModal.value = false
  hasChanges.value = false
}

// Manejo de cambios en el presupuesto
const handlePresupuestoChange = (event) => {
  const rawValue = event.target.value.replace(/[^\d]/g, '')
  const numericValue = parseInt(rawValue) || 0
  localPresupuestado.value = formatCurrency(numericValue)
  checkForChanges()
}

// Manejo de cambios en el estado
const handleEstadoChange = () => {
  checkForChanges()
}

// Verificación de cambios en los datos
const checkForChanges = () => {
  const originalPresupuesto = props.presupuestado || 0
  const currentPresupuesto = parseCurrency(localPresupuestado.value)

  hasChanges.value =
    currentPresupuesto !== originalPresupuesto ||
    localEstado.value !== props.estado
}

// Función para guardar los cambios
const handleSave = () => {
  const updatedData = {
    id: props.id,
    presupuestado: parseCurrency(localPresupuestado.value),
    estado: localEstado.value
  }

  emit('update', updatedData)
  closeModal()
}

// Formatear número a moneda
const formatCurrency = (value) => {
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

// Parsear moneda a número
const parseCurrency = (currencyString) => {
  const numericString = currencyString.replace(/[^\d]/g, '')
  return parseInt(numericString) || 0
}

// Clase de color dinámica para el select de estado
const estadoColorClass = computed(() => {
  switch (localEstado.value) {
    case 'Pendiente':
      return 'bg-orange-100 border-orange-300 text-orange-800'
    case 'En curso':
      return 'bg-yellow-100 border-yellow-300 text-yellow-800'
    case 'Terminado':
      return 'bg-green-100 border-green-300 text-green-800'
    default:
      return 'bg-gray-100 border-gray-300'
  }
})

// Clase de color para la tarjeta
const colorClass = `card-${props.color}`
</script>

<style scoped>
/* Estilos base de la tarjeta */
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

/* Efecto hover */
.task-card:hover {
  background-color: #f3f3f3;
}

/* Colores de tarjeta */
.card-green {
  background-color: #dcf6d7;
}

.card-yellow {
  background-color: #fff4cc;
}

.card-red {
  background-color: #ffd4d4;
}

/* Estilos para drag and drop (ghost) */
.card-green.sortable-ghost {
  background-color: #bdf4b7 !important;
  border: 4px dashed #6fcf97;
}

.card-yellow.sortable-ghost {
  background-color: #fff3b0 !important;
  border: 4px dashed #e1c542;
}

.card-red.sortable-ghost {
  background-color: #ffb3b3 !important;
  border: 4px dashed #ff6b6b;
}
</style>
