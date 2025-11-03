<template>
  <!-- Estado de carga durante autenticación: Muestra loading de pantalla completa -->
  <div v-if="authenticating" class="w-full h-dvh flex flex-col justify-center items-center bg-white">
    <Loading />
  </div>

  <!-- Estado normal: Muestra layout completo de login -->
  <div
    v-else-if="validar"
    class="grid grid-cols-2 px-5 place-items-center place-content-center h-full w-full"
  >
    <!-- Componente de imagen decorativa -->
    <ImgLoginLayout></ImgLoginLayout>
    <!-- Componente de formulario de autenticación -->
    <AuthLayout @login-started="handleLoginStarted"></AuthLayout>
  </div>

  <!-- Estado de carga/validación inicial: Muestra spinner de carga -->
  <div v-else class="w-full h-dvh flex justify-center items-center">
    <Loading></Loading>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/Layouts/log/AuthLayout.vue'
import ImgLoginLayout from '@/Layouts/log/ImgLoginLayout.vue'
import Loading from '@/components/Utils/Loading.vue'

const router = useRouter()

// Estado reactivo que controla qué layout mostrar
const validar = ref(true)
const authenticating = ref(false)

// Función que se ejecuta cuando se inicia el login
const handleLoginStarted = async () => {
  // Mostrar loading de autenticación
  authenticating.value = true

  try {
    // Simular proceso de autenticación (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Redirigir después de autenticación exitosa
    router.push({ name: 'Main' })

  } catch (error) {
    // Manejar errores de autenticación
    console.error('Error de autenticación:', error)
    // Volver al formulario en caso de error
    authenticating.value = false
  }
}
</script>
