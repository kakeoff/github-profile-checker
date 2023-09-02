import { defineStore } from "pinia"

export const useProfilesStore = defineStore('profiles', {
    state: () => ({
        message: 'Store is working'
    }),
    getters: {},
    actions: {},
  })