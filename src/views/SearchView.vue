<template>
  <pre>
    {{ user }}

  </pre>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useProfilesStore } from "../store/profiles";

const profilesStore = useProfilesStore();

const user = computed(() => {
  return profilesStore.profile;
});

onMounted(async () => {
  await profilesStore.getGithubUser("kakeoff");
});
</script>
