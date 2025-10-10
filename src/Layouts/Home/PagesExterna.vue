<template>
  <div class="min-h-full py-2 pr-5 pb-6 cursor-default">
    <SystemInfoCard
      v-if="props.name == 'sgmwin'"
      title="SGMWIN"
      description="Para acceder a SGMWIN, haga click en el siguiente botón:"
      url="https://mantenimiento.eliteflower.com/"
    />
    <SystemInfoCard
      v-if="props.name == 'fdim'"
      title="FDIM.co"
      description="Para acceder a FDIM.co, haga click en el siguiente botón:"
      url="https://www.fdim.co/"
    />
    <SystemInfoCard
      v-if="props.name == 'mantenimiento'"
      title="Mantenimiento "
      description="Para acceder a Mantenimiento, haga click en el siguiente botón:"
      url="https://mantenimiento-omega.vercel.app/"
    />
  </div>
</template>

<script setup>
import SystemInfoCard from '@/components/Utils/SystemInfoCard.vue'
import { defineProps } from 'vue'

const props = defineProps({
  // Define tus props aquí si es necesario
  name: String,
})
</script>
