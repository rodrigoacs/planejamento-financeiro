<template>
  <FloatLabel>
    <InputText
      :id="id"
      v-model="model"
      :disabled="isDisabled"
    />
    <label :for="id">
      {{ label }}
    </label>
  </FloatLabel>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import InputText from 'primevue/inputtext'
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
  }
})

// desabling 

const disabledIds = ['q6', 'q7']

const isDisabled = ref(disabledIds.includes(props.id))

</script>

<style scoped>
.p-inputtext {
  width: 80vw;
}
</style>
