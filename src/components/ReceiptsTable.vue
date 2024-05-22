<template>
  <div v-if="props.visible">
    <div class="r-wrapper">
      <div>
        <h2>Demonstração de recebimentos</h2>
        <DataTable
          tableStyle="min-width: 50rem"
          :value="receivesData"
        >
          <Column
            field="header"
            header="Previsão de vendas à vista e a prazo"
          />
          <Column field="percentageToReceive" />
        </DataTable>
      </div>
      <Chart
        type="doughnut"
        :data="chartData"
      />
    </div>
    <br />
    <DataTable
      tableStyle="min-width: 50rem"
      :value="salesReceipts"
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
import Chart from 'primevue/chart'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  }
})

const receivesData = ref([])
const salesReceipts = ref([])
const months = ref([])
const chartData = ref({
  labels: ['À vista', 'A prazo'],
  datasets: [
    {
      data: [0, 0],
      backgroundColor: ['#FF6384', '#36A2EB'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB']
    }
  ]
})

const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

watch(() => props.data, (newData) => {
  const receives = []
  const percentageToReceiveImmediately = newData.q6
  const percentageToReceiveLater = 100 - percentageToReceiveImmediately
  const monthlyInstallments = newData.q7
  let total = 100

  for (let i = 1; i <= props.data.q8; i++) {
    const month = i === 1 ? 'Percentual a ser recebido à vista' : `Percentual a ser recebido no mês ${i - 1}`
    const percentageToReceive = i === 1 ? newData.q6 : Math.ceil((100 - newData.q6) / newData.q7)
    total -= percentageToReceive

    receives.push({
      header: month,
      percentageToReceive: `${percentageToReceive}%`
    })

    if (total <= 0) {
      break
    }
  }

  receivesData.value = receives

  chartData.value = {
    labels: ['À vista', 'A prazo'],
    datasets: [
      {
        data: [percentageToReceiveImmediately, percentageToReceiveLater],
        backgroundColor: ['#DE177A', '#03C0DD'],
        hoverBackgroundColor: ['#B6025C', '#08879B']
      }
    ]
  }

  const salesReceiptsData = []
  months.value = Array.from({ length: newData.q8 }, (_, i) => `Mês ${i + 1}`)

  const totalRevenues = JSON.parse(localStorage.getItem('data')).map(({ revenue }) => revenue)
  const immediateReceipts = totalRevenues.map(revenue => revenue * (percentageToReceiveImmediately / 100))
  const installmentReceipts = totalRevenues.map(revenue => revenue * (percentageToReceiveLater / 100) / monthlyInstallments)

  const totalVistaRow = { header: 'Recebimento de vendas à vista no mês' }
  const totalPrazoRow = { header: 'Recebimento de vendas a prazo no mês' }
  const totalReceiptsRow = { header: 'Total recebimento' }

  for (let monthIndex = 0; monthIndex < newData.q8; monthIndex++) {
    const key = `month${monthIndex + 1}`
    totalVistaRow[key] = immediateReceipts[monthIndex] || 0

    if (monthIndex === 0) {
      totalPrazoRow[key] = 0
    } else if (monthIndex < monthlyInstallments) {
      totalPrazoRow[key] = installmentReceipts.slice(0, monthIndex).reduce((acc, curr) => acc + curr, 0)
    } else {
      totalPrazoRow[key] = installmentReceipts.slice(monthIndex - monthlyInstallments, monthIndex).reduce((acc, curr) => acc + curr, 0)
    }

    totalReceiptsRow[key] = totalVistaRow[key] + totalPrazoRow[key]
  }

  for (let monthIndex = 0; monthIndex < newData.q8; monthIndex++) {
    const key = `month${monthIndex + 1}`
    totalVistaRow[key] = formatCurrency(totalVistaRow[key])
    totalPrazoRow[key] = formatCurrency(totalPrazoRow[key])
    totalReceiptsRow[key] = formatCurrency(totalReceiptsRow[key])
  }

  salesReceiptsData.push(totalVistaRow)
  salesReceiptsData.push(totalPrazoRow)
  salesReceiptsData.push(totalReceiptsRow)

  salesReceipts.value = salesReceiptsData
}, { immediate: true })

</script>

<style scoped>
.r-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.r-wrapper>div:first-child {
  width: 60vw;
}

.p-chart {
  margin: 0 auto;
}
</style>
