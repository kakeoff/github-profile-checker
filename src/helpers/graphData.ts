import moment from "moment";
import { defaultColors } from "../helpers/colors";
import { GitHubRepoType } from "../types/profilesServiceTypes";
import { ChartDataType, GraphDataType } from "../types/chartTypes";

// Тип для данных, создаваемых функцией createGraphData

const createNumberOfReposByYear = (repos: GitHubRepoType[]): ChartDataType => {
  const sortedRepos = repos
    .slice()
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );

  let datePlaceholder = moment().toDate();
  const earliestRepoDate = new Date(sortedRepos[0].created_at);

  const reposByDate: {
    date: Date;
    numberOfRepos: number;
    sizeOfRepos: string;
  }[] = [];

  while (datePlaceholder > earliestRepoDate) {
    const nextDate = moment(datePlaceholder).subtract(2, "months").toDate();
    reposByDate.push({
      date: datePlaceholder,
      numberOfRepos: 0,
      sizeOfRepos: "0",
    });
    datePlaceholder = nextDate;
  }

  let totalSize = 0;
  sortedRepos.forEach((repo, i) => {
    const nextIndex = reposByDate.findIndex(
      (r) => new Date(repo.created_at) < r.date,
    );
    totalSize += repo.size / 1000;

    reposByDate[nextIndex].numberOfRepos = i + 1;
    reposByDate[nextIndex].sizeOfRepos = totalSize.toFixed(2);
  });

  const chartData: ChartDataType = {
    labels: [],
    datasets: [
      {
        label: "Repos",
        borderColor: "#3298dc",
        fill: false,
        data: [],
        lineTension: 0,
      },
      {
        label: "Total size of repos (in MB)",
        borderColor: "#48C774",
        fill: false,
        data: [],
        lineTension: 0,
      },
    ],
  };

  reposByDate.forEach((repo) => {
    chartData.labels.push(moment(repo.date).format("MMM YYYY"));
    chartData.datasets[0].data.push(repo.numberOfRepos);
    chartData.datasets[1].data.push(repo.sizeOfRepos);
  });

  return chartData;
};

const createLanguageTypes = (repos: GitHubRepoType[]): ChartDataType => {
  const data: Record<string, number> = repos.reduce(
    (all: Record<string, number>, current) => {
      if (!current.language) {
        return all;
      }
      if (all[current.language] === undefined) {
        all[current.language] = 1;
      } else {
        all[current.language] += 1;
      }
      return all;
    },
    {},
  );

  const returnData: ChartDataType = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Languages",
        backgroundColor: defaultColors.slice(0, Object.keys(data).length),
        data: Object.values(data),
        fill: false,
        lineTension: 0,
        borderColor: "",
      },
    ],
  };

  return returnData;
};

const createTopReposByStars = (repos: GitHubRepoType[]): ChartDataType => {
  let sortedRepos = [...repos].sort(
    (a, b) =>
      b.stargazers_count + b.forks_count - (a.stargazers_count + a.forks_count),
  );

  if (sortedRepos.length > 5) sortedRepos = sortedRepos.slice(0, 5);

  const returnData: ChartDataType = {
    labels: [],
    datasets: [
      {
        label: "Stars",
        backgroundColor: defaultColors[5],
        data: [],
        borderColor: "",
        fill: false,
        lineTension: 0,
      },
      {
        label: "Forks",
        backgroundColor: defaultColors[1],
        data: [],
        borderColor: "",
        fill: false,
        lineTension: 0,
      },
    ],
  };
  sortedRepos.forEach((repo) => {
    returnData.labels.push(repo.name);
    returnData.datasets[0].data.push(repo.stargazers_count);
    returnData.datasets[1].data.push(repo.forks_count);
  });
  return returnData;
};

const createGraphData = (repos: GitHubRepoType[]): GraphDataType => {
  const numberOfReposByYear = createNumberOfReposByYear(repos);
  const languageTypes = createLanguageTypes(repos);
  const topReposByStars = createTopReposByStars(repos);

  return {
    numberOfReposByYear,
    languageTypes,
    topReposByStars,
  };
};

export default createGraphData;
