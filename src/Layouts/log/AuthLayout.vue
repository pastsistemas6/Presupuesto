<template>
  <div class="w-full h-dvh py-5 flex flex-col items-center justify-evenly">
    <div class="flex flex-col items-center gap-2">
      <h2 class="text-5xl tracking-tight font-bold text-[#545386]">INICIAR SESIÓN</h2>
      <h3 class="text-center mt-4 text-lg text-gray-600">
        Por favor ingrese sus credenciales para continuar
      </h3>
    </div>

    <img class="h-2/9" src="../../components/Img/logo_elite.png" alt="" />

    <div class="w-7/12 flex flex-col gap-4">
      <Input
        v-model="username"
        label="Usuario"
        placeholder="Ingresa tu usuario"
        id="username"
        class="w-full"
      />
      <Input
        v-model="password"
        label="Contraseña"
        placeholder="••••••"
        type="password"
        id="password"
        class="w-full"
      />
    </div>

    <div class="w-7/12">
      <Button @click="login" class="w-full py-4! text-xl! bg-[#545386] text-white">Ingresar</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/form/Button.vue'
import Input from '@/components/form/Input.vue'

const username = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  router.push({ name: 'home' })
}
</script>
