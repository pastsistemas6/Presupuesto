<template>
  <div
    :class="[
      'w-[99%] p-4 rounded-xl text-left flex justify-between items-center cursor-pointer hover:w-full hover:bg-gray-200! hover:duration-100',
      colorClass,
    ]"
    @click="enviar"
  >
    <p>{{ text }}</p>
    <span class="py-1 px-2 bg-gray-100 rounded-md">{{ costo ? '$ ' + costo : '$ 0' }}</span>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  id: Intl,
  text: String,
  costo: Intl,
  color: { type: String, default: 'green' },
})

const colorClass = `card-${props.color}`

function enviar() {
  router.push({ name: 'Reportes' })
}
</script>

<style scoped>
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
