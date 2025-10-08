<script setup>
import TaskCard from './TaskCard.vue'
import draggable from 'vuedraggable'

const props = defineProps({
  title: String,
  color: String,
  modelValue: Array,
})

const emit = defineEmits(['update:modelValue'])

const colorClass = `header-${props.color}`
</script>

<template>
  <div class="task-column">
    <div :class="['column-header', colorClass]">
      {{ title }}
    </div>

    <draggable
      v-model="props.modelValue"
      group="tasks"
      item-key="id"
      class="task-list"
      @update:modelValue="(newList) => emit('update:modelValue', newList)"
    >
      <template #item="{ element }">
        <TaskCard
          :id="element.id"
          :text="element.text"
          :presupuestado="element.presupuestado"
          :estado="element.estado"
          :color="color"
        />
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.task-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

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

.header-green {
  background-color: #8ee36a;
}

.header-yellow {
  background-color: #f8d349;
}

.header-red {
  background-color: #f16767;
}

.task-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 2px dashed transparent;
  border-radius: 12px;
  transition: border-color 0.2s;
}

.task-list.dragging-over {
  border-color: black;
}
</style>
