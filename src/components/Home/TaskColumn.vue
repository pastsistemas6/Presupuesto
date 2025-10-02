<template>
  <div class="task-column">
    <div :class="['column-header', colorClass]">
      {{ title }}
    </div>
    <div class="task-list">
      <TaskCard v-for="task in tasks" :key="task.id" :id="task.id" :text="task.text" :costo="task.costo" :color="color" />
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
}
</style>
