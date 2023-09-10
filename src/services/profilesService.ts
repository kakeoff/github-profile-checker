import { GithubUserType } from "../types/profilesServiceTypes";

export const getGithubUser = async (
  username: string,
): Promise<GithubUserType | null> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

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
