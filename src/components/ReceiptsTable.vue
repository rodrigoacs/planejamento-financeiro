<template>
  <div class="r-wrapper">
    <div>
      <h3>
        Demonstração de recebimentos
      </h3>
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
  }
})

const receivesData = ref([])
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

watch(() => props.data, (newData) => {
  const data = []
  let total = 100
  let month = ''
  const percentageToReceiveImmediately = newData.q6
  const percentageToReceiveLater = 100 - percentageToReceiveImmediately

  for (let i = 1; i <= props.data.q8; i++) {
    if (i === 1) {
      month = `Percentual a ser recebido à vista`
    } else {
      month = `Percentual a ser recebido no mês ${i - 1}`
    }

    const percentageToReceive = i === 1 ? newData.q6 : Math.ceil((100 - newData.q6) / newData.q7)
    total -= percentageToReceive

    data.push({
      header: month,
      percentageToReceive: `${percentageToReceive}%`
    })

    if (total <= 0) {
      break
    }
  }

  receivesData.value = data

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
}, { immediate: true })

</script>

<style scoped>
.r-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.r-wrapper>div:first-child {
  width: 60vw;
}

.p-chart {
  width: 20vw;
}
</style>
