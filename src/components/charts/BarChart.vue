<template>
  <Bar :data="chartData" :width="500" :height="500" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartData,
} from "chart.js";
import { defineComponent, PropType } from "vue";
import { Bar } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default defineComponent({
  components: {
    Bar,
  },
  props: {
    chartData: {
      default: () => ({}),
      type: Object as PropType<ChartData<"bar", number[], unknown>>,
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
