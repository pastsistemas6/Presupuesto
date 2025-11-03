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
        clase_input="input1"
        clase_label="label1"
        :error="error_name"
        required
      />
      <Input
        v-model="password"
        label="Contraseña"
        placeholder="••••••••"
        type="password"
        id="password"
        clase_input="input1"
        clase_label="label1"
        :error="error_password"
        required
      />
    </div>

    <div class="w-7/12">
      <Button
        @click="handleLogin"
        type="submit"
        class="w-full py-4! text-xl! bg-[#545386] text-white"
      >
        Ingresar
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import Input from '@/components/form/Input.vue'
import Button from '@/components/form/Button.vue'

const emit = defineEmits(['login-started'])

const username = ref('')
const password = ref('')
const error_name = ref('')
const error_password = ref('')

const handleLogin = () => {
  // Validar campos
  if (username.value == '' && password.value == '') {
    error_name.value = 'Ingresa tu información';
    error_password.value = 'Ingresa tu información';
    return;
  } else if (username.value == '') {
    error_name.value = 'Ingresa tu nombre';
    error_password.value = ''
    return;
  } else if (password.value == '') {
    error_password.value = 'Ingresa tu contraseña';
    error_name.value = ''
    return;
  }

  // Si la validación pasa, emitir evento de inicio de login
  emit('login-started')
}
</script>
