<template>
  <Line :height="500" :width="500" :data="chartData" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "vue-chartjs";
import { defineComponent, PropType } from "vue";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default defineComponent({
  components: {
    Line,
  },
  props: {
    chartData: {
      default: () => ({}),
      type: Object as PropType<ChartData<"line", number[], unknown>>,
    },
  },
});
</script>
