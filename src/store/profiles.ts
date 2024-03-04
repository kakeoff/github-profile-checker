import { defineStore } from "pinia";
import * as api from "../services/profilesService";
import {
  GitHubRepoType,
  GithubUserType,
  ProfileSearchHistoryType,
} from "../types/profilesServiceTypes";

export const useProfilesStore = defineStore("profiles", {
  state: () => ({
    profile: {} as GithubUserType,
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
          html_url: userResponse.html_url,
        };
        const isHistoryObjExists = this.profilesHistory.find(
          (profile) => profile.login === historyObj.login,
        );
        if (!isHistoryObjExists) {
          this.profilesHistory.unshift(historyObj);
          this.saveProfilesHistory();
        }
      }
      return userResponse;
    },

    async getGithubUserRepos(url: string): Promise<GitHubRepoType[]> {
      const reposResponse = await api.getGithubUserRepos(url);
      this.profileRepos = reposResponse;
      return reposResponse;
    },

    saveProfilesHistory() {
      try {
        localStorage.setItem(
          "profilesHistory",
          JSON.stringify(this.profilesHistory),
        );
      } catch (error) {
        console.error(
          "Error while saving profile history in localStorage:",
          error,
        );
      }
    },

    loadProfilesHistory() {
      try {
        const savedHistory = localStorage.getItem("profilesHistory");
        if (savedHistory) {
          this.profilesHistory = JSON.parse(savedHistory);
        }
      } catch (error) {
        console.error(
          "Error while loading profile history from localStorage:",
          error,
        );
      }
    },
  },
});
