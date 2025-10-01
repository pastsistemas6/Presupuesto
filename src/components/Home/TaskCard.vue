<template>
  <div :class="['task-card', colorClass]">
    {{ text }}
  </div>
</template>

<script setup>
const props = defineProps({
  text: String,
  color: { type: String, default: 'green' },
})

const colorClass = `card-${props.color}`
</script>

<style scoped>
.task-card {
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  text-align: center;
}

.card-green {
  background-color: #dcf6d7;
}

.card-yellow {
  background-color: #fff4cc;
}

.card-red {
  background-color: #ffd4d4;
}
</style>
