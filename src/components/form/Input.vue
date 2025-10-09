<template>
  <div class="base-input">
    <label v-if="label" :for="id" :class="props.clase_label">{{ label }}</label>
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
    <p v-if="error" class="error">{{ props.error }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: { type: String, default: 'text' },
  id: String,
  clase_input: String,
  clase_label: String,
  error: String,
  disabled: Boolean,
  required: Boolean,
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.label1 {
  margin-bottom: 0.35rem;
  font-size: 17px;
  font-weight: 500;
  color: #545386;
}

.label2 {
  margin-bottom: 0.35rem;
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #4a5565;
}

.input1 {
  padding: 1rem 1rem;
  background-color: #ccca;
  border-radius: 10px;
  font-size: 1rem;
}

.input1:focus {
  outline: none;
  border-color: #6c47ff;
}

.input2 {
  padding: 10px 15px;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #d1d5dc;
  font-size: 1rem;
}

.input2:focus {
  outline: none;
  border: 2px solid #545386;
}

.error {
  color: red;
  background-color: rgba(255, 0, 0, 0.112);
  font-size: 0.875rem;
  margin-top: 0.3rem;
  padding: 10px 10px;
  border-radius: 6px;
}
</style>
