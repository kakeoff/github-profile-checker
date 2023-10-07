import { defineStore } from "pinia";
import * as api from "../services/profilesService";
import {
  GitHubRepoType,
  GithubUserType,
  ProfileSearchHistoryType,
} from "../types/profilesServiceTypes";

export const useProfilesStore = defineStore("profiles", {
  state: () => ({
    profile: null as GithubUserType | null,
    profileRepos: [] as GitHubRepoType[],
    profilesHistory: [] as ProfileSearchHistoryType[],
  }),
  getters: {},
  actions: {
    async getGithubUser(username: string): Promise<GithubUserType | null> {
      const userResponse = await api.getGithubUser(username);
      if (userResponse) {
        this.profile = userResponse;
        const historyObj: ProfileSearchHistoryType = {
          avatar_url: userResponse.avatar_url,
          name: userResponse.name,
          login: userResponse.login,
          url: userResponse.url,
        };
        const isHistoryObjExists = this.profilesHistory.find(
          (profile) => profile.login === historyObj.login,
        );
        if (!isHistoryObjExists) {
          this.profilesHistory.push(historyObj);
        }
      }
      return userResponse;
    },

    async getGithubUserRepos(url: string): Promise<GitHubRepoType[]> {
      const reposResponse = await api.getGithubUserRepos(url);
      this.profileRepos = reposResponse;
      return reposResponse;
    },
  },
});
