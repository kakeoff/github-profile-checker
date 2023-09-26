<template>
  <Doughnut
    :chart-options="chartOptions"
    :data="chartData"
    :width="500"
    :height="500"
  />
</template>

<script lang="ts">
import { Doughnut } from "vue-chartjs";
import { ChartDataType } from "../../types/chartTypes";
import { defineComponent, PropType } from "vue";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default defineComponent({
  components: {
    Doughnut,
  },
  props: {
    chartData: {
      default: () => ({}),
      type: Object as PropType<ChartDataType>,
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
});
</script>
