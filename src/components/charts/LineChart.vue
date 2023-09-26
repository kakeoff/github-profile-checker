<template>
  <Line :height="500" :width="500" :data="chartData" :options="options" />
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
} from "chart.js";
import { Line } from "vue-chartjs";
import { ChartDataType } from "../../types/chartTypes";
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
  data() {
    return {
      options: {
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                callback(dataLabel: string, index: number) {
                  return index % 2 === 0 ? dataLabel : "";
                },
              },
            },
          ],
        },
      },
    };
  },
  props: {
    chartData: {
      default: () => ({}),
      type: Object as PropType<ChartDataType>,
    },
  },
});
</script>
