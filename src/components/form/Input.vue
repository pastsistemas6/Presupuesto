<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: { type: String, default: 'text' },
  id: String,
  error: String,
  disabled: Boolean,
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.label {
  margin-bottom: 0.35rem;
  font-size: 17px;
  font-weight: 500;
  color: #545386;
}

.input {
  padding: 1rem 1rem;
  background-color: #ccca;
  border-radius: 10px;
  font-size: 1rem;
}

.input:focus {
  outline: none;
  border-color: #6c47ff;
}

.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.3rem;
}
</style>
