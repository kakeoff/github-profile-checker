import { defineStore } from "pinia";
import * as api from "../services/profilesService";
import { GithubUserType } from "../types/profilesServiceTypes";

export const useProfilesStore = defineStore("profiles", {
  state: () => ({
    profile: null as GithubUserType | null,
  }),
  getters: {},
  actions: {
    async getGithubUser(username: string): Promise<GithubUserType | null> {
      const userResponse = await api.getGithubUser(username);
      this.profile = userResponse;
      return userResponse;
    },
  },
});
