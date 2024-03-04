<template>
  <div
    class="shadow-lg text-center sm:text-left w-full px-[20px] py-[15px] border bg-gray-100 rounded-[12px]"
  >
    <span class="text-[35px] font-[700]">STATISTICS</span>
    <div
      v-if="reposLength"
      class="flex flex-row flex-wrap justify-center lg:justify-between gap-[20px] items-start mt-[10px] w-full"
    >
      <div
        class="w-[300px] sm:w-[500px] md:w-[600px] lg:w-[280px] xl:w-[370px] 2xl:w-[450px] flex flex-col items-center gap-[5px]"
      >
        <span class="font-[500] text-[25px]">OVER TIME</span>
        <LineChart
          v-if="graphData.numberOfReposByYear"
          :chart-data="graphData.numberOfReposByYear"
        />
      </div>
      <div
        class="w-[300px] sm:w-[500px] md:w-[600px] lg:w-[280px] xl:w-[370px] 2xl:w-[450px] flex flex-col items-center gap-[5px]"
      >
        <span class="font-[500] text-[25px]">POPULAR</span>
        <BarChart
          v-if="graphData.topReposByStars"
          :chart-data="graphData.topReposByStars"
        />
      </div>
      <div
        class="w-[300px] sm:w-[500px] md:w-[600px] h-full lg:w-[280px] xl:w-[370px] 2xl:w-[450px] flex flex-col items-center gap-[5px]"
      >
        <span class="font-[500] text-[25px]">LANGUAGES</span>
        <DoughnutChart
          v-if="
            graphData.languageTypes.labels &&
            graphData.languageTypes.labels?.length
          "
          :chart-data="graphData.languageTypes"
        />
        <span class="text-gray-500" v-else>NO DATA</span>
      </div>
    </div>
    <div
      class="w-full h-[100px] flex justify-center items-center text-gray-500"
      v-else
    >
      <span>There are no public repositories</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LineChart from "./charts/LineChart.vue";
import DoughnutChart from "./charts/DoughnutChart.vue";
import BarChart from "./charts/BarChart.vue";
import { GraphDataType } from "../types/chartTypes";

defineProps<{
  reposLength: number;
  graphData: GraphDataType;
}>();
</script>
