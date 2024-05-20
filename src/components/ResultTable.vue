<template>
  <div class="card">
    <h3>
      Demonstração de vendas, produção e receita
    </h3>
    <DataTable
      tableStyle="min-width: 50rem"
      :value="infos"
    >
      <Column field="month" />

      <Column
        field="salesQtde"
        header="Previsão da quantidade vendida (em unidades)"
      />

      <Column
        field="stock"
        header="Estoque final desejado* (em unidades)"
      />

      <Column
        field="initialStock"
        header="Estoque inicial (em unidades)"
      />

      <Column
        field="production"
        header="Produção (em unidades)"
      />

      <Column
        field="unitPrice"
        header="Preço unitário"
      />

      <Column
        field="revenue"
        header="Receita de Produto ou Serviço 1 (em R$)"
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

const infos = ref()
// month is the month number (1, 2, 3, ...)
// salesQtde is anterior month sales + (1 * q2/100)
// stock is salesQtde * q3/100
// initialStock is stock of the previous month
// production is salesQtde + stock - initialStock
// unitPrice is q4
// revenue is salesQtde * unitPrice

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
    data.push({
      month,
      salesQtde,
      stock,
      initialStock,
      production,
      unitPrice,
      revenue
    })
  }
  infos.value = data
}, { immediate: true })
</script>

<style scoped>
.p-datatable {
  width: 80vw;
}
</style>