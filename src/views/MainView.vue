<template>
  <div class="tw-w-full"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useProfilesStore } from "../store/profiles";
import { mapStores } from "pinia";

export default defineComponent({
  computed: {
    ...mapStores(useProfilesStore),
  },
  async mounted() {
    const userProfile = await this.profilesStore.getGithubUser("kakeoff");
    console.log(userProfile);
  },
});
</script>
