<template>
  <div class="task-column">
    <div :class="['column-header', colorClass]">
      {{ title }}
    </div>
    <div class="task-list">
      <TaskCard v-for="task in tasks" :key="task.id" :text="task.text" :color="color" />
    </div>
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'

const props = defineProps({
  title: String,
  color: { type: String, default: 'green' },
  tasks: { type: Array, default: () => [] },
})

const colorClass = `header-${props.color}`
</script>

<style scoped>
.task-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.column-header {
  width: 80%;
  text-align: center;
  font-weight: bold;
  color: white;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
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
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
