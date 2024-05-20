<template>
  <div class="a-wrapper">
    <img
      src="/welcome_image.svg"
      alt=""
      style="width: 100%; height: 300px"
    >

    <Divider layout="vertical" />

    <p>
      Bem-vindo à nossa plataforma de planejamento financeiro! Nossa aplicação web
      oferece ferramentas intuitivas e poderosas que ajudam você a gerenciar seu orçamento, prever fluxos de caixa e
      tomar decisões financeiras estratégicas. Com visualizações claras e relatórios detalhados, simplificamos o
      complexo mundo das finanças, permitindo que você se concentre no crescimento do seu negócio. Descubra como nossa
      solução pode transformar sua gestão financeira e impulsionar sua startup rumo ao sucesso!
    </p>
  </div>
</template>

<script setup>
import Divider from 'primevue/divider'

</script>

<style scoped>
p {
  text-align: justify;
  max-width: 35vw;
}

img {
  max-width: 35vw;
}

.a-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  max-width: 80vw;
  gap: 2rem;
}
</style>