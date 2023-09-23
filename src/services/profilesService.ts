import { GitHubRepoType, GithubUserType } from "../types/profilesServiceTypes";

export const getGithubUser = async (
  username: string,
): Promise<GithubUserType | null> => {
  try {
    const response: Response = await fetch(
      `https://api.github.com/users/${username}`,
    );

    if (response.ok) {
      return (await response.json()) as GithubUserType;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getGithubUserRepos = async (
  url: string,
): Promise<GitHubRepoType[]> => {
  const response: Response = await fetch(`${url}?sort=created&per_page=100`);
  const json: GitHubRepoType[] = await response.json();
  let remainingRepos: GitHubRepoType[] = [];

  if (json.length === 100) {
    remainingRepos = await getRemainingRepos(url);
  }

  const allRepos: GitHubRepoType[] = [...json, ...remainingRepos];

  const reposCleaned: GitHubRepoType[] = allRepos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .map((repo) => ({
      created_at: repo.created_at,
      description: repo.description,
      fork: repo.fork,
      forks: repo.forks,
      forks_count: repo.forks_count,
      homepage: repo.homepage,
      html_url: repo.html_url,
      id: repo.id,
      language: repo.language,
      languages_url: repo.languages_url,
      name: repo.name,
      open_issues: repo.open_issues,
      open_issues_count: repo.open_issues_count,
      size: repo.size,
      stargazers_count: repo.stargazers_count,
      updated_at: repo.updated_at,
      url: repo.url,
      watchers_count: repo.watchers_count,
    }));

  return reposCleaned;
};

const getRemainingRepos = async (url: string): Promise<GitHubRepoType[]> => {
  let latestResponse: GitHubRepoType[] = [];
  let allResponses: GitHubRepoType[] = [];
  let pageCount = 2;

  do {
    const response: Response = await fetch(
      `${url}?sort=created&per_page=100&page=${pageCount}`,
    );
    latestResponse = await response.json();
    allResponses = [...allResponses, ...latestResponse];
    pageCount += 1;
  } while (latestResponse.length === 100);

  return allResponses;
};
