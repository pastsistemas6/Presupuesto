<template>
  <!-- Header fijo en la parte superior -->
  <div
    class="w-full fixed z-5 bg-white px-8 border-b-3 border-[#D8D2C4] grid grid-cols-15 grid-rows-1 gap-x-4 place-items-center place-content-start shadow"
  >

    <!-- Sección del botón de menú hamburguesa -->
    <div class="w-full col-span-1 flex justify-start items-center p-2">
      <button
        @click="drawer.toggleDrawer"
        class="btn shadow-none bg-white border-0 text-[#545386] hover:bg-gray-200 rounded-md p-1.5"
      >
        <img
          src="../icons/menu.png"
          :class="
            drawer.isExpanded
              ? 'w-10 text-[#545386] duration-200'
              : 'w-10 text-[#545386] rotate-90 duration-200'
          "
        />
      </button>
    </div>

    <!-- Sección del título principal -->
    <h1 class="w-full col-span-10 text-3xl font-bold tracking-tight text-[#545386]">Presupuesto</h1>

    <!-- Sección del dropdown de usuario -->
    <div class="w-full col-span-4 flex justify-end">
      <UserDropdown username="Miguel Gomez" role="Administrador" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserDropdown from '@/components/Utils/UserDropdown.vue'
import { useDrawerStore } from '@/stores/drawer'

// Store para controlar el estado del drawer/menú lateral
const drawer = useDrawerStore()
</script>
