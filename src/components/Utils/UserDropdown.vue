<template>
  <!-- Contenedor principal del dropdown -->
  <div class="relative my-2 dropdown hover:bg-gray-200 px-3 py-1.5 rounded-md">

    <!-- Botón para mostrar/ocultar el dropdown -->
    <button @click.stop="toggleDropdown" class="flex items-center space-x-3">
      <!-- Avatar del usuario con iniciales -->
      <div
        class="size-10 text-sm flex-none rounded-full flex items-center justify-center text-white font-bold"
        :style="{ backgroundColor: `var(--color-${role.toLowerCase()})` }"
      >
        {{ getInitials(username) }}
      </div>

      <!-- Nombre del usuario -->
      <span class="font-medium text-[#545386]">{{ username }}</span>

      <!-- Ícono de flecha (animado) -->
      <svg
        :class="
          showDropdown
            ? 'w-4 h-4 text-[#545386] rotate-180 duration-100'
            : 'w-4 h-4 text-[#545386] duration-100'
        "
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Contenido del dropdown -->
    <div
      v-if="showDropdown"
      class="absolute right-0 mt-2 w-48 bg-white shadow-sm border-gray-200 border-1 hover:bg-white rounded-lg z-20 flex flex-col p-2 gap-2"
    >
      <!-- Sección del rol del usuario -->
      <div
        class="px-4 py-2 pb-3 border-b border-b-gray-300 text-center text-md font-normal text-black"
      >
        <span class="text-[#545386] cursor-default">{{ role }}</span>
      </div>

      <!-- Botón de cerrar sesión -->
      <Button
        @click="cerrar"
        class="py-2! font-medium! text-md! bg-red-100 text-red-500 hover:bg-red-200"
      >
        Cerrar sesión
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from '../form/Button.vue'

// Props del componente
const props = defineProps({
  username: { type: String, required: true },  // Nombre del usuario
  role: { type: String, required: true },      // Rol del usuario
})

// Inicialización del router y estado del dropdown
const router = useRouter()
const showDropdown = ref(false)

// Función: Alterna la visibilidad del dropdown
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Función: Obtiene las iniciales del nombre del usuario
const getInitials = (name) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
}

// Función: Cierra la sesión y redirige al login
function cerrar() {
  router.push({ name: 'login' })
}

// Función: Cierra el dropdown al hacer clic fuera
const closeDropdown = (e) => {
  if (!e.target.closest('.dropdown')) {
    showDropdown.value = false
  }
}

// Lifecycle hooks para manejar eventos del DOM
onMounted(() => window.addEventListener('click', closeDropdown))
onUnmounted(() => window.removeEventListener('click', closeDropdown))
</script>
