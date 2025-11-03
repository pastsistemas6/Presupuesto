<template>
  <!-- Header fijo en la parte superior -->
  <Header1 />

  <!-- Drawer/Navegación lateral con animación -->
  <div
    class="fixed h-full transition-all duration-300"
    :class="drawer.isExpanded ? 'w-1/7' : 'w-20'"
  >
    <Drawer></Drawer>
  </div>

  <!-- Área de contenido principal con animación -->
  <div
    class="pt-22 pb-5 mr-5 transition-all duration-300"
    :class="drawer.isExpanded ? 'w-9/11 ml-auto' : 'w-11/12 ml-auto'"
  >
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import Header1 from '@/components/Utils/Header.vue'
import Drawer from '@/components/Utils/Drawer.vue'
import { useDrawerStore } from '@/stores/drawer'

// Store para gestionar el estado del drawer
const drawer = useDrawerStore()

// Importaciones para funcionalidad de router
import { RouterView } from 'vue-router'

</script>
