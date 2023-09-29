<template>
  <Doughnut :data="chartData" :width="500" :height="500" />
</template>

<script lang="ts">
import { Doughnut } from "vue-chartjs";
import { defineComponent, PropType } from "vue";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ChartData,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default defineComponent({
  components: {
    Doughnut,
  },
  props: {
    chartData: {
      default: () => ({}),
      type: Object as PropType<ChartData<"doughnut", number[], unknown>>,
    },
  },
});
</script>
