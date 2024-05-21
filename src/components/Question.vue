<template>
  <FloatLabel>
    <InputNumber
      :id="id"
      v-model="model"
      :disabled="isDisabled"
      :mode="mode"
      currency="BRL"
      :prefix="prefix"
      :suffix="suffix"
      :min="min"
      :max="max"
    />
    <label :for="id">
      {{ label }}
    </label>
  </FloatLabel>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import InputNumber from 'primevue/inputnumber'
import FloatLabel from 'primevue/floatlabel'

const model = defineModel()

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    default: 'decimal'
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
  }

})

</script>

<style scoped>
.p-inputnumber {
  width: 80vw;
}
</style>
