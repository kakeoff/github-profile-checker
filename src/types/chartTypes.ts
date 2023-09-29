import { ChartData } from "chart.js";

export type DatasetType = {
  label: string;
  borderColor: string;
  fill: boolean;
  data: (number | string)[];
  lineTension: number;
  backgroundColor?: string | string[];
};

export type ChartDataType = {
  labels: string[];
  datasets: DatasetType[];
};

export type GraphDataType = {
  numberOfReposByYear: ChartData<"line", number[], unknown>;
  languageTypes: ChartData<"doughnut", number[], unknown>;
  topReposByStars: ChartData<"bar", number[], unknown>;
};
