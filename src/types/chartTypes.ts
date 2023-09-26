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
  numberOfReposByYear: ChartDataType;
  languageTypes: ChartDataType;
  topReposByStars: ChartDataType;
};
