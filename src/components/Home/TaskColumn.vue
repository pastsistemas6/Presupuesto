<script setup>
import TaskCard from './TaskCard.vue'
import draggable from 'vuedraggable'

// Props del componente
const props = defineProps({
  title: String,        // Título de la columna
  color: String,        // Color de la columna (green, yellow, red)
  modelValue: Array,    // Lista de tareas/proyectos
})

// Emits para comunicación con el componente padre
const emit = defineEmits(['update:modelValue', 'taskUpdate'])

// Clase CSS dinámica para el header según el color
const colorClass = `header-${props.color}`

// Manejar actualización de una tarea individual
const handleTaskUpdate = (updatedTask) => {
  emit('taskUpdate', updatedTask)
}
</script>

<template>
  <!-- Contenedor principal de la columna -->
  <div class="task-column">

    <!-- Header de la columna con color dinámico -->
    <div :class="['column-header', colorClass]">
      {{ title }}
    </div>

    <!-- Componente draggable para arrastrar y soltar -->
    <!-- Lista de elementos Grupo para interoperabilidad entre columnas Clave única para cada elemento Emitir cambios en la lista -->
    <draggable
      v-model="props.modelValue"
      group="tasks"
      item-key="id"
      class="task-list"
      @update:modelValue="(newList) => emit('update:modelValue', newList)"
    >
      <!-- Template para renderizar cada elemento -->
      <template #item="{ element }">
        <TaskCard
          :id="element.id"
          :descripcion="element.descripcion"
          :empresa="element.empresa"
          :area="element.area"
          :subArea="element.subArea"
          :finca="element.finca"
          :tipoUnidad="element.tipoUnidad"
          :grupo="element.grupo"
          :presupuestado="element.presupuestado"
          :estado="element.estado"
          :color="color"
          @update="handleTaskUpdate"
        />
      </template>
    </draggable>
  </div>
</template>

<style scoped>
/* Contenedor principal de la columna */
.task-column {
  flex: 1;                    /* Ocupa espacio disponible */
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header de la columna */
.column-header {
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  color: white;
  padding: 14px 15px;
  border-radius: 12px;
  margin-bottom: 30px;
}

/* Colores para los headers */
.header-green {
  background-color: #8ee36a;    /* Verde para columnas de prioridad baja */
}

.header-yellow {
  background-color: #f8d349;    /* Amarillo para columnas de prioridad media */
}

.header-red {
  background-color: #f16767;    /* Rojo para columnas de prioridad alta */
}

/* Lista de tareas */
.task-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;                    /* Espacio entre tarjetas */
  border: 2px dashed transparent;
  border-radius: 12px;
  transition: border-color 0.2s; /* Transición suave para efectos visuales */
}

/* Estado cuando se está arrastrando sobre la columna */
.task-list.dragging-over {
  border-color: black;          /* Borde visible durante drag & drop */
}
</style>
