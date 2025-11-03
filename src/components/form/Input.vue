<template>
  <div class="base-input">
    <!-- Etiqueta del input (condicional) -->
    <label v-if="label" :for="id" :class="props.clase_label">{{ label }}</label>

    <!-- Input principal -->
    <input
      :id="props.id"
      :type="props.type"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      :disabled="props.disabled"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="props.clase_input"
      :required="props.required"
    />

    <!-- Mensaje de error (condicional) -->
    <p v-if="error" class="error">{{ props.error }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// Definición de propiedades
const props = defineProps({
  modelValue: String,           // Valor del input (v-model)
  label: String,                // Texto de la etiqueta
  placeholder: String,          // Texto placeholder
  type: { type: String, default: 'text' },  // Tipo de input
  id: String,                   // ID para asociar label-input
  clase_input: String,          // Clase CSS personalizada para el input
  clase_label: String,          // Clase CSS personalizada para el label
  error: String,                // Mensaje de error
  disabled: Boolean,            // Estado deshabilitado
  required: Boolean,            // Campo obligatorio
})

// Definición de eventos emitidos
defineEmits(['update:modelValue'])
</script>

<style scoped>
/* Contenedor principal del input */
.base-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

/* Estilo para label tipo 1 */
.label1 {
  margin-bottom: 0.35rem;
  font-size: 17px;
  font-weight: 500;
  color: #545386;
}

/* Estilo para label tipo 2 */
.label2 {
  margin-bottom: 0.35rem;
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #4a5565;
}

/* Estilo para input tipo 1 */
.input1 {
  padding: 1rem 1rem;
  background-color: #ccca;
  border-radius: 10px;
  font-size: 1rem;
}

/* Efecto focus para input tipo 1 */
.input1:focus {
  outline: none;
  border-color: #6c47ff;
}

/* Estilo para input tipo 2 */
.input2 {
  padding: 10px 15px;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #d1d5dc;
  font-size: 1rem;
}

/* Efecto focus para input tipo 2 */
.input2:focus {
  outline: none;
  border: 2px solid #545386;
}

/* Estilo para mensajes de error */
.error {
  color: red;
  background-color: rgba(255, 0, 0, 0.112);
  font-size: 0.875rem;
  margin-top: 0.3rem;
  padding: 10px 10px;
  border-radius: 6px;
}
</style>
