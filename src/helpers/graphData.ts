import { ChartData } from "chart.js";
import { GitHubRepoType } from "../types/profilesServiceTypes";
import { defaultColors } from "./colors";

interface RepoData {
  labels: string[];
  date: Date;
  numberOfRepos: number;
  sizeOfRepos: number;
  datasets: {
    label: string;
    data: number[];
  }[];
}

const createNumberOfReposByYear = (
  repos: GitHubRepoType[],
): ChartData<"line", number[], unknown> => {
  const cleanRepos = [...repos].sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  const earliestDate = new Date(cleanRepos[0].created_at);
  const currentDate = new Date();

  const reposByDate: RepoData[] = [
    {
      date: new Date(currentDate),
      numberOfRepos: 0,
      sizeOfRepos: 0,
      labels: [],
      datasets: [],
    },
  ];

  while (currentDate > earliestDate) {
    currentDate.setMonth(currentDate.getMonth() - 1);

    reposByDate.push({
      date: new Date(currentDate),
      numberOfRepos: 0,
      sizeOfRepos: 0,
      labels: [],
      datasets: [],
    });
  }

  reposByDate.sort((a, b) => a.date.getTime() - b.date.getTime());

  let totalSize = 0;

  cleanRepos.forEach((repo, i) => {
    const index = reposByDate.findIndex(
      (r) => new Date(repo.created_at) < r.date,
    );

    totalSize += repo.size / 1000;

    reposByDate[index].numberOfRepos = i + 1;
    reposByDate[index].sizeOfRepos = Number(totalSize.toFixed(2));
  });

  let numberOfRepos = 0;
  let sizeOfRepos = 0;

  reposByDate.forEach((repo) => {
    if (repo.numberOfRepos === 0) {
      repo.numberOfRepos = numberOfRepos;
      repo.sizeOfRepos = sizeOfRepos;
    } else {
      numberOfRepos = repo.numberOfRepos;
      sizeOfRepos = repo.sizeOfRepos;
    }
  });

  return reposByDate.reduce<ChartData<"line", number[], unknown>>(
    (acc, curr) => {
      if (acc.labels) {
        acc.labels.push(
          curr.date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric" as const,
          }),
        );
        acc.datasets[0].data.push(curr.numberOfRepos);
        acc.datasets[1].data.push(curr.sizeOfRepos);
      }

      return acc;
    },
    {
      labels: [] as Array<string>,
      datasets: [
        {
          label: "Repos",
          borderColor: "#3298dc",
          fill: false,
          data: [] as Array<number>,
        },
        {
          label: "Total size of repos (in MB)",
          borderColor: "#48C774",
          fill: false,
          data: [] as Array<number>,
        },
      ],
    },
  );
};

const createLanguageTypes = (
  repos: GitHubRepoType[],
): ChartData<"doughnut", number[], unknown> => {
  const data: { [key: string]: number } = repos.reduce(
    (all: { [key: string]: number }, current) => {
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

  const returnData = {
    labels: [] as Array<string>,
    datasets: [
      {
        label: "Languages",
        backgroundColor: defaultColors,
        data: [] as Array<number>,
      },
    ],
  };

  Object.keys(data)
    .sort((a, b) => data[b] - data[a])
    .forEach((item) => {
      returnData.labels.push(item);
      returnData.datasets[0].data.push(data[item]);
    });

  return returnData;
};

const createTopReposByStars = (
  repos: GitHubRepoType[],
): ChartData<"bar", number[], unknown> => {
  let sortedRepos = [...repos].sort(
    (a, b) =>
      b.stargazers_count + b.forks_count - (a.stargazers_count + a.forks_count),
  );

  if (sortedRepos.length > 5) sortedRepos = sortedRepos.slice(0, 5);

  const returnData = {
    labels: [] as Array<string>,
    datasets: [
      {
        label: "Stars",
        backgroundColor: defaultColors[5],
        data: [] as Array<number>,
      },
      {
        label: "Forks",
        backgroundColor: defaultColors[1],
        data: [] as Array<number>,
      },
    ],
  };
  sortedRepos.forEach((repo) => {
    returnData.labels.push(repo.name.substring(0, 12) + "...");
    returnData.datasets[0].data.push(repo.stargazers_count);
    returnData.datasets[1].data.push(repo.forks_count);
  });
  return returnData;
};

const createGraphData = (repos: GitHubRepoType[]) => {
  const numberOfReposByYear = createNumberOfReposByYear(repos);
  const languageTypes = createLanguageTypes(repos);
  const topReposByStars = createTopReposByStars(repos);
  console.log(topReposByStars);
  return {
    numberOfReposByYear,
    languageTypes,
    topReposByStars,
  };
};

export default createGraphData;
