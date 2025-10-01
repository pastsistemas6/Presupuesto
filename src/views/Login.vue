<template>
  <div
    v-if="validar"
    class="grid grid-cols-2 px-5 place-items-center place-content-center h-full w-full"
  >
    <ImgLoginLayout></ImgLoginLayout>
    <AuthLayout></AuthLayout>
  </div>
  <div v-if="!validar" class="w-full h-dvh flex justify-center items-center">
    <Loading></Loading>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AuthLayout from '@/Layouts/log/AuthLayout.vue'
import ImgLoginLayout from '@/Layouts/log/ImgLoginLayout.vue'
import Loading from '@/components/Utils/Loading.vue'

const validar = ref(true)
</script>

<style scoped></style>
