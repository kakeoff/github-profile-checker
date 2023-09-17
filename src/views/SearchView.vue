<template>
  <pre>
    {{ userProfile }}

  </pre>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useProfilesStore } from "../store/profiles";
import { useRoute } from "vue-router";

const route = useRoute();

const profilesStore = useProfilesStore();

const userProfile = computed(() => {
  return profilesStore.profile;
});
const searchValue = computed(() => {
  return String(route.query.q);
});

watch(searchValue, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    getGithubUser();
  }
});

onMounted(async () => {
  getGithubUser();
});

const getGithubUser = async () => {
  if (!searchValue.value.length) return;
  await profilesStore.getGithubUser(searchValue.value);
};
</script>
