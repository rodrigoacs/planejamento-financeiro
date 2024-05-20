<template>
  <div class="card">
    <h3>
      Demonstração de vendas, produção e receita
    </h3>
    <DataTable
      tableStyle="min-width: 50rem"
      :value="transformedData"
    >
      <Column
        field="header"
        header="Categoria"
      />
      <Column
        v-for="(month, index) in months"
        :key="index"
        :field="`month${index + 1}`"
        :header="month"
      />
    </DataTable>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const infos = ref([])
const transformedData = ref([])
const months = ref([])

const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

watch(() => props.data, (newData) => {
  const data = []
  for (let i = 1; i <= props.data.q8; i++) {
    const month = `Mês ${i}`
    const salesQtde = i === 1 ? Math.ceil(newData.q1) : Math.ceil(data[i - 2].salesQtde * (1 + newData.q2 / 100))
    const stock = Math.ceil(salesQtde * newData.q3 / 100)
    const initialStock = i === 1 ? 0 : Math.ceil(data[i - 2].stock)
    const production = salesQtde + stock - initialStock
    const unitPrice = newData.q4
    const revenue = salesQtde * unitPrice
    const taxesAliquot = {
      I: {
        180000: 4,
        360000: 7.3,
        720000: 9.5,
        1800000: 10.7,
        3600000: 14.3,
        4800000: 19
      },
      II: {
        180000: 4.5,
        360000: 7.8,
        720000: 10,
        1800000: 11.2,
        3600000: 14.7,
        4800000: 30.0
      },
      III: {
        180000: 6,
        360000: 11.2,
        720000: 13.5,
        1800000: 16,
        3600000: 21,
        4800000: 33
      },
      IV: {
        180000: 4.5,
        360000: 9.0,
        720000: 10.2,
        1800000: 14,
        3600000: 22.0,
        4800000: 33.0
      },
      V: {
        180000: 15.5,
        360000: 18.0,
        720000: 19.5,
        1800000: 20.5,
        3600000: 23.0,
        4800000: 30.5
      }
    }
    const calculatedTaxes = revenue * taxesAliquot[newData.q5][Object.keys(taxesAliquot[newData.q5]).find(key => revenue <= key)] / 100
    const payedTaxes = i === 1 ? 0 : data[i - 2].calculatedTaxes

    data.push({
      month,
      salesQtde,
      stock,
      initialStock,
      production,
      unitPrice,
      revenue,
      taxesAliquot: taxesAliquot[newData.q5][Object.keys(taxesAliquot[newData.q5]).find(key => revenue <= key)],
      calculatedTaxes,
      payedTaxes
    })
  }

  infos.value = data

  const transformed = [
    { header: 'Previsão da quantidade vendida (em unidades)', ...data.reduce((acc, item, index) => ({ ...acc, [`month${index + 1}`]: item.salesQtde }), {}) },
    { header: 'Estoque final desejado* (em unidades)', ...data.reduce((acc, item, index) => ({ ...acc, [`month${index + 1}`]: item.stock }), {}) },
    { header: 'Estoque inicial (em unidades)', ...data.reduce((acc, item, index) => ({ ...acc, [`month${index + 1}`]: item.initialStock }), {}) },
    { header: 'Produção (em unidades)', ...data.reduce((acc, item, index) => ({ ...acc, [`month${index + 1}`]: item.production }), {}) },
    { header: 'Preço unitário', ...data.reduce((acc, item, index) => ({ ...acc, [`month${index + 1}`]: formatCurrency(item.unitPrice) }), {}) },
    { header: 'Receita de Produto ou Serviço 1 (em R$)', ...data.reduce((acc, item, index) => ({ ...acc, [`month${index + 1}`]: formatCurrency(item.revenue) }), {}) },
    { header: 'Alíquota do Simples Nacional', ...data.reduce((acc, item, index) => ({ ...acc, [`month${index + 1}`]: `${item.taxesAliquot}%` }), {}) },
    { header: 'Valor dos tributos calculados no mês', ...data.reduce((acc, item, index) => ({ ...acc, [`month${index + 1}`]: formatCurrency(item.calculatedTaxes) }), {}) },
    { header: 'Valor dos tributos pagos no mês', ...data.reduce((acc, item, index) => ({ ...acc, [`month${index + 1}`]: formatCurrency(item.payedTaxes) }), {}) }
  ]

  transformedData.value = transformed
  months.value = data.map(item => item.month)
}, { immediate: true })
</script>

<style scoped>
.p-datatable {
  width: 80vw;
}
</style>
