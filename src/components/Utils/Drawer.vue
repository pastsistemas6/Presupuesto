<script setup lang="ts">
// Importar dependencias necesarias
import { RouterLink } from 'vue-router'
import { inject, ref, onMounted, computed } from 'vue'
import { useDrawerStore } from '@/stores/drawer'

const drawer = useDrawerStore()
//import { useCart } from '@/stores/cart'

// Inyectar el estado del drawer desde el componente padre
//const cart = useCart()
//const disable = ref(cart.disable)

// Estado para manejar el tooltip activo
const activeTooltip = ref<null | { text: string; style: Record<string, string> }>(null)

// Función para manejar el evento de mouse enter y mostrar el tooltip
const handleMouseEnter = (e: MouseEvent, text: string) => {
  const rect = (e.target as HTMLElement).getBoundingClientRect()
  activeTooltip.value = {
    text,
    style: {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.right + 4}px`,
      transform: 'translateY(-50%)',
      position: 'fixed',
    },
  }
}

// Computed para verificar si hay una finca seleccionada
/*const hasFinca = computed(() => {
  return cart.finca && Object.keys(cart.finca).length > 0
})*/

// Función para manejar el mouse leave y ocultar el tooltip
const handleMouseLeave = () => {
  activeTooltip.value = null
}
</script>

<template>
  <!-- Drawer principal -->
  <aside
    id="multilevel-with-separator"
    :class="[
      'overlay [--auto-close:sm] overlay-open:translate-x-0 drawer drawer-start hidden sm:absolute sm:z-0 sm:flex sm:translate-x-0 pt-20 border-r-3 border-[#D8D2C4] fixed top-0 bottom-0 transition-all duration-300',
      drawer.isExpanded ? 'max-w-64 px-0.5' : 'max-w-30',
    ]"
    tabindex="-1"
  >
    <!-- Contenedor del tooltip -->
    <div class="drawer-body pt-4">
      <ul class="menu space-y-0.5 pb-6 pr-3 p-0">
        <!-- Botón para alternar el estado del drawer -->
        <li
          class="relative hover:bg-white cursor-default!"
          @mouseenter="(e) => handleMouseEnter(e, 'Elite Flower')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Logo y nombre de la finca -->
          <RouterLink
            to="/main"
            :class="[
              'flex flex-col justify-center px-4 py-3 items-center gap-0 hover:bg-white cursor-default! list-none',
              !drawer.isExpanded && 'px-2',
            ]"
          >
            <img
              src="../icons/elite flower-morado-64px-05.svg"
              :class="drawer.isExpanded ? 'h-10 mb-3 cursor-default' : 'h-8 mb-1'"
            />
            <!-- Nombre de la finca -->
            <h3 v-if="drawer.isExpanded" class="font-semibold cursor-default">Elite Flower</h3>
            <p v-if="drawer.isExpanded" class="text-gray-500! text-xs cursor-default">
              Finca Productora
            </p>
          </RouterLink>

          <!-- Tooltip para el logo -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!drawer.isExpanded && activeTooltip?.text === 'Elite Flower'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-gray-200 text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Solo mostrar si está expandido y hay una finca con nombre -->
        <div v-if="drawer.isExpanded" class="w-full my-2 bg-gray-200 py-[0.7px]"></div>

        <!-- Elementos del menú -->
        <!-- Cada elemento del menú tiene un tooltip que se muestra al pasar el mouse -->
        <!-- Home -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Home')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace al bodylayout -->
          <RouterLink
            to="/main"
            :class="[
              'flex items-center px-3 py-3 gap-2 hover:bg-gray-200 rounded-md',
              !drawer.isExpanded && 'justify-center px-4',
            ]"
          >
            <span>
              <img
                src="../icons/dashboard-morado-32px-03.svg"
                alt="Dashboard"
                width="24"
                height="24"
              />
            </span>
            <!-- Título del enlace -->
            <span v-if="drawer.isExpanded" class="ml-2">Home</span>
          </RouterLink>

          <!-- Tooltip para el enlace Home -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!drawer.isExpanded && activeTooltip?.text === 'Home'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-gray-200 text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Rutas y georeferencia -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Proyectos')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a rutas y georeferencia -->
          <RouterLink
            to="/proyectos"
            :class="[
              'flex items-center px-3 py-3 gap-2 hover:bg-gray-200 rounded-md',
              !drawer.isExpanded && 'justify-center px-2',
            ]"
          >
            <span>
              <img
                src="../icons/rutas & georeferencia-morado-32px-03.svg"
                alt=""
                width="24"
                height="24"
              />
            </span>
            <!-- Título del enlace -->
            <span v-if="drawer.isExpanded" class="ml-2">Proyectos</span>
          </RouterLink>

          <!-- Tooltip para el enlace Proyectos -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!drawer.isExpanded && activeTooltip?.text === 'Proyectos'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-gray-200 text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Calculo -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Calculo')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a Calculo -->
          <RouterLink
            to="/calculo"
            :class="[
              'flex items-center px-3 py-3 gap-2 hover:bg-gray-200 rounded-md',
              !drawer.isExpanded && 'justify-center px-2',
            ]"
          >
            <span>
              <img src="../icons/table.svg" alt="" width="24" height="24" />
            </span>
            <!-- Título del enlace -->
            <span v-if="drawer.isExpanded" class="ml-2">Calculo</span>
          </RouterLink>

          <!-- Tooltip para el enlace Calculo -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!drawer.isExpanded && activeTooltip?.text === 'Calculo'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-gray-200 text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Reportes -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Reportes')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a Reportes -->
          <RouterLink
            to="/reportes"
            :class="[
              'flex items-center px-3 py-3 gap-2 hover:bg-gray-200 rounded-md',
              !drawer.isExpanded && 'justify-center px-2',
            ]"
          >
            <span>
              <img src="../icons/audit-morado-24px-01.svg" alt="" width="24" height="24" />
            </span>
            <!-- Título del enlace -->
            <span v-if="drawer.isExpanded" class="ml-2">Reportes</span>
          </RouterLink>

          <!-- Tooltip para el enlace Reportes -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!drawer.isExpanded && activeTooltip?.text === 'Reportes'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-gray-200 text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Plataformas Externas -->
        <div v-if="drawer.isExpanded" class="flex items-center gap-3 pr-2 py-3 cursor-default">
          <div class="bg-gray-200 px-3 py-[0.5px]"></div>
          <span class="text-gray-400 text-sm">Plataformas Externas</span>
        </div>

        <!-- Sgmwin -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'SGMWIN')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a sgmwin -->
          <RouterLink
            :to="{ name: 'Pages externa', params: { name: 'sgmwin' } }"
            :class="[
              'flex items-center px-3 py-3 gap-2 hover:bg-gray-200 rounded-md',
              !drawer.isExpanded && 'justify-center px-2',
            ]"
          >
            <span>
              <img src="../icons/sistemas it-morado-32px-03.svg" alt="" width="24" height="24" />
            </span>
            <!-- Título del enlace -->
            <span v-if="drawer.isExpanded" class="ml-2">SGMWIN</span>
          </RouterLink>

          <!-- Tooltip para el enlace SGMWIN -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!drawer.isExpanded && activeTooltip?.text === 'SGMWIN'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-gray-200 text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- FDIM -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'FDIM')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a fdim -->
          <RouterLink
            :to="{ name: 'Pages externa', params: { name: 'fdim' } }"
            :class="[
              'flex items-center px-3 py-3 gap-2 hover:bg-gray-200 rounded-md',
              !drawer.isExpanded && 'justify-center px-2',
            ]"
          >
            <span>
              <img src="../icons/fdim.svg" alt="" width="24" height="24" />
            </span>
            <!-- Título del enlace -->
            <span v-if="drawer.isExpanded" class="ml-2">FDIM</span>
          </RouterLink>

          <!-- Tooltip para el enlace FDIM -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!drawer.isExpanded && activeTooltip?.text === 'FDIM'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-gray-200 text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Mantenimiento -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'MANTENIMIENTO')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a Mantenimiento -->
          <RouterLink
            :to="{ name: 'Pages externa', params: { name: 'mantenimiento' } }"
            :class="[
              'flex items-center px-3 py-3 gap-2 hover:bg-gray-200 rounded-md',
              !drawer.isExpanded && 'justify-center px-2',
            ]"
          >
            <span class="w-6">
              <img src="../icons/icons8-link-96.png" alt="" width="24" height="24" />
            </span>
            <!-- Título del enlace -->
            <span v-if="drawer.isExpanded" class="ml-2">Mantenimiento</span>
          </RouterLink>

          <!-- Tooltip para el enlace Mantenimiento -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!drawer.isExpanded && activeTooltip?.text === 'MANTENIMIENTO'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-gray-200 text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Divisor para separar ayuda -->
        <div v-if="drawer.isExpanded" class="flex items-center gap-4 pr-8 py-3 cursor-default">
          <div class="bg-gray-200 px-7 py-[0.5px]"></div>
          <span class="text-gray-400 text-sm">Ayuda</span>
        </div>

        <!-- Support -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Support')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a support -->
          <RouterLink
            to=""
            :class="[
              'flex items-center px-3 py-3 gap-2 hover:bg-gray-200 rounded-md',
              !drawer.isExpanded && 'justify-center px-2',
            ]"
          >
            <span>
              <img src="../icons/icons8-info-96.png" alt="" width="24" height="24" />
            </span>
            <!-- Título del enlace -->
            <span v-if="drawer.isExpanded" class="ml-2">Support</span>
          </RouterLink>

          <!-- Tooltip para el enlace Support -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!drawer.isExpanded && activeTooltip?.text === 'Support'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-gray-200 text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Documentation -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Documentation')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a documentation -->
          <RouterLink
            to=""
            :class="[
              'flex items-center px-3 py-3 gap-2 hover:bg-gray-200 rounded-md',
              !drawer.isExpanded && 'justify-center px-2',
            ]"
          >
            <span>
              <img src="../icons/icons8-info-96.png" alt="" width="24" height="24" />
            </span>
            <!-- Título del enlace -->
            <span v-if="drawer.isExpanded" class="ml-2">Documentation</span>
          </RouterLink>

          <!-- Tooltip para el enlace Documentation -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!drawer.isExpanded && activeTooltip?.text === 'Documentation'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-gray-200 text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Acerca de -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Acerca de')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a acerca de -->
          <RouterLink
            to=""
            :class="[
              'flex items-center px-3 py-3 gap-2 hover:bg-gray-200 rounded-md',
              !drawer.isExpanded && 'justify-center px-2',
            ]"
          >
            <span>
              <img src="../icons/icons8-info-96.png" alt="" width="24" height="24" />
            </span>
            <!-- Título del enlace -->
            <span v-if="drawer.isExpanded" class="ml-2">Acerca de</span>
          </RouterLink>

          <!-- Tooltip para el enlace Acerca de -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!drawer.isExpanded && activeTooltip?.text === 'Acerca de'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-gray-200 text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <div v-if="drawer.isExpanded" class="bg-gray-200 px-3 py-[0.6px] mt-1 gap-2"></div>

        <!-- Mostrar la version del prototipo -->
        <li v-if="drawer.isExpanded" class="list-none px-3 py-3">
          <span class="text-start hover:bg-white text-xs cursor-default!"
            >© 2025 Presupuesto. v1.0.0</span
          >
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
/* Estilos para el drawer */
.drawer-body {
  padding: 0;
  padding-left: 3px;
  padding-bottom: 10px;
}

li {
  color: #545386;
}

/* Transiciones suaves */
.drawer {
  transition: max-width 0.4s ease-in-out;
}

/* Ajustes para modo contraído */
.drawer.max-w-20 .menu li a {
  padding-left: 8px;
  padding-right: 8px;
}
/* Asegura que el drawer permita overflow visible */
.drawer {
  overflow: visible !important;
}

.drawer-body {
  overflow-y: auto;
  overflow-x: hidden;
}

/* Contexto de apilamiento forzado */
.menu {
  isolation: isolate;
  position: relative;
}
</style>
