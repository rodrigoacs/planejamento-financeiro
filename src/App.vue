<template>

  <div class="wrapper">
    <Apresentation />

    <h2>Questionário</h2>

    <Question
      id="q1"
      label="Qual a previsão de vendas para o primeiro mês?"
      v-model="q1"
      min="1"
    />

    <Question
      id="q2"
      label="Qual o percentual de crescimento mensal na quantidade vendida?"
      v-model="q2"
      suffix="%"
    />

    <Question
      id="q3"
      label="Qual o nível de estoque de segurança desejado (percentual em relação à previsão de vendas do mês)?"
      v-model="q3"
      suffix="%"
    />

    <Question
      id="q4"
      label="Qual o preço de venda do produto?"
      v-model="q4"
      mode="currency"
    />

    <FloatLabel class="wrapper">
      <Dropdown
        id="q5"
        placeholder="Baseado no tipo de produto/serviço, qual a tabela do simples nacional a ser utilizada? (I a V)"
        option-label="name"
        v-model="q5"
        :options="anexos"
      />
      <label for="q5">
        Baseado no tipo de produto/serviço, qual a tabela do simples nacional a ser utilizada? (I a V)
      </label>
    </FloatLabel>

    <Question
      id="q6"
      label="Qual o percentual da vendas realizado à vista?"
      v-model="q6"
      suffix="%"
      min="0"
      max="100"
    />

    <Question
      id="q7"
      label="As vendas não realizadas à vista são, em geral, divididas em quantas vezes?"
      v-model="q7"
      min="1"
      max="12"
    />

    <Question
      id="q8"
      label="Quantidade de meses para projeção dos resultados:"
      v-model="q8"
    />

    <Button
      label="gerar projeções"
      @click="visible = true"
    />

    <SalesTable
      :visible="visible"
      :data="{ q1, q2, q3, q4, q5: q5.code, q6, q7, q8 }"
    />

    <ReceiptsTable
      :visible="visible"
      :data="{ q1, q2, q3, q4, q5: q5.code, q6, q7, q8 }"
    />

  </div>

</template>

<script setup>
import Question from './components/Question.vue'
import SalesTable from './components/SalesTable.vue'
import Apresentation from './components/Apresentation.vue'
import ReceiptsTable from './components/ReceiptsTable.vue'

import Dropdown from 'primevue/dropdown'
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'

import { ref } from 'vue'

const visible = ref(false)

const q1 = ref()
const q2 = ref()
const q3 = ref()
const q4 = ref()
const q5 = ref('')
const q6 = ref()
const q7 = ref()
const q8 = ref()

const anexos = ref([
  { name: 'Anexo I', code: 'I' },
  { name: 'Anexo II', code: 'II' },
  { name: 'Anexo III', code: 'III' },
  { name: 'Anexo IV', code: 'IV' },
  { name: 'Anexo V', code: 'V' },
])

</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.p-dropdown {
  width: 80vw;
}

@media screen and (max-width: 768px) {}
</style>
