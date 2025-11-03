<template>
  <!-- Contenedor principal del componente -->
  <div class="min-h-full py-2 pr-5 pb-6 cursor-default">

    <!-- Tarjeta para el sistema SGMWIN -->
    <SystemInfoCard
      v-if="props.name == 'sgmwin'"
      title="SGMWIN"
      description="Para acceder a SGMWIN, haga click en el siguiente botón:"
      url="https://mantenimiento.eliteflower.com/"
    />

    <!-- Tarjeta para el sistema FDIM.co -->
    <SystemInfoCard
      v-if="props.name == 'fdim'"
      title="FDIM.co"
      description="Para acceder a FDIM.co, haga click en el siguiente botón:"
      url="https://www.fdim.co/"
    />

    <!-- Tarjeta para el sistema de Mantenimiento -->
    <SystemInfoCard
      v-if="props.name == 'mantenimiento'"
      title="Mantenimiento "
      description="Para acceder a Mantenimiento, haga click en el siguiente botón:"
      url="https://mantenimiento-omega.vercel.app/"
    />
  </div>
</template>

<script setup>
// Importación del componente de tarjeta de sistema
import SystemInfoCard from '@/components/Utils/SystemInfoCard.vue'
import { defineProps } from 'vue'

// Definición de propiedades del componente
const props = defineProps({
  // Propiedad que determina qué sistema mostrar
  name: String,
})
</script>
