<template>
  <!-- <Button
    @click="visible = true"
    rounded
    icon="pi pi-question"
  /> -->
  <div class="wrapper">
    <Question
      id="q1"
      label="Qual a previsão de vendas para o primeiro mês?"
      v-model="q1"
    />
    <Question
      id="q2"
      label="Qual o percentual de crescimento mensal na quantidade vendida?"
      v-model="q2"
    />

    <Question
      id="q3"
      label="Qual o nível de estoque de segurança desejado (percentual em relação à previsão de vendas do mês)?"
      v-model="q3"
    />

    <Question
      id="q4"
      label="Qual o preço de venda do produto?"
      v-model="q4"
    />

    <Question
      id="q5"
      label="Baseado no tipo de produto/serviço, qual a tabela do simples nacional a ser utilizada? (I a VI)"
      v-model="q5"
    />

    <Question
      id="q6"
      label="Qual o percentual da vendas realizado à vista?"
      v-model="q6"
    />

    <Question
      id="q7"
      label="As vendas não realizadas à vista são, em geral, divididas em quantas vezes?"
      v-model="q7"
    />

    <Question
      id="q8"
      label="Quantidade de meses para projeção dos resultados:"
      v-model="q8"
    />

    <ResultTable :data="{
      q1,
      q2,
      q3,
      q4,
      q5,
      q6,
      q7,
      q8
    }" />

    <Dialog
      v-model:visible="visible"
      modal
      header="Simples Nacional 2019"
      :style="{ width: '25rem' }"
    >
      <p>
        Anexo I - empresas de comércio (lojas em geral)
      </p>
      <p>
        Anexo II - fábricas/indústrias e empresas industriais
      </p>
      <p>
        Anexo III - empresas prestadoras de serviços
      </p>
      <p>
        Anexo IV - empresas que fornecem serviço de limpeza, vigilância, obras, construção de imóveis, serviços
        advocatícios
      </p>
      <p>
        Anexo V - empresas que fornecem serviço de auditoria, jornalismo, tecnologia, publicidade, engenharia, entre
        outros
      </p>
      <p>
        mais informações
        <a
          href="https://ideal.cnt.br/timeline-post/simples-nacional-tabelas-2019/"
          target="_blank"
        >
          clique aqui
        </a>
      </p>
    </Dialog>
  </div>

</template>

<script setup>
import Question from './components/Question.vue'
import ResultTable from './components/ResultTable.vue'
import Dialog from 'primevue/dialog'
import { ref, computed } from 'vue'

const visible = ref(false)

const q1 = ref('')
const q2 = ref('')
const q3 = ref('')
const q4 = ref('')
const q5 = ref('')
const q6 = ref('')
const q7 = ref('')
const q8 = ref('')

</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
