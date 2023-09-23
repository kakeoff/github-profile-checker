import { defineStore } from "pinia";
import * as api from "../services/profilesService";
import { GitHubRepoType, GithubUserType } from "../types/profilesServiceTypes";

export const useProfilesStore = defineStore("profiles", {
  state: () => ({
    profile: null as GithubUserType | null,
    profileRepos: [] as GitHubRepoType[],
  }),
  getters: {},
  actions: {
    async getGithubUser(username: string): Promise<GithubUserType | null> {
      const userResponse = await api.getGithubUser(username);
      this.profile = userResponse;
      return userResponse;
    },

    async getGithubUserRepos(url: string): Promise<GitHubRepoType[]> {
      const reposResponse = await api.getGithubUserRepos(url);
      this.profileRepos = reposResponse;
      return reposResponse;
    },
  },
});
