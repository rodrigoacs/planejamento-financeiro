<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Bem vindo!"
    :style="{ width: '50rem' }"
  >
    <div class="a-wrapper">
      <img
        src="/welcome_image.svg"
        alt=""
        style="width: 100%; height: 300px"
      >

      <Divider layout="vertical" />

      <p>
        Bem-vindo à nossa plataforma de planejamento financeiro para startups! Nossa aplicação facilita a gestão de
        orçamento, previsão de fluxos de caixa e decisões estratégicas. Com visualizações claras e relatórios
        detalhados, simplificamos as finanças para você focar no crescimento do seu negócio. Impulsione sua startup com
        nossa solução!
      </p>
    </div>
  </Dialog>
</template>

<script setup>
import Divider from 'primevue/divider'
import Dialog from 'primevue/dialog'

import { ref } from 'vue'

const visible = ref(true)

</script>

<style scoped>
p {
  text-align: justify;
  max-width: 15vw;
}

img {
  max-width: 15vw;
}

.a-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
  margin-right: 2rem;
  max-width: 80vw;
  gap: 2rem;
}
</style>