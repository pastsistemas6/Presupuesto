<template>
  <Header1 />
  <div
    class="fixed h-full transition-all duration-300"
    :class="drawer.isExpanded ? 'w-1/7' : 'w-20'"
  >
    <Drawer></Drawer>
  </div>
  <div
    class="pt-22 pb-5 mr-5 transition-all duration-300"
    :class="drawer.isExpanded ? 'w-9/11 ml-auto' : 'w-11/12 ml-auto'"
  >
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import Header1 from '@/components/Utils/Header.vue'
import Drawer from '@/components/Utils/Drawer.vue'
import TaskBoard from '@/Layouts/Home/TaskBoard.vue'
import { useDrawerStore } from '@/stores/drawer'

const drawer = useDrawerStore()

// Importaciones necesarias
import { RouterView } from 'vue-router'
import { ref, computed, provide, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
//import { useCart } from '@/stores/cart'

// Estado del drawer
//const cart = useCart()
const router = useRouter()
//const disable = ref(cart.disable)

// Función para cerrar sesión y redirigir al home
function cerrar() {
  //cart.resetCart()
  router.push({ name: 'home' })
}
</script>
