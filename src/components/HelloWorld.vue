<template>
  <div>{{ message }}</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProfilesStore } from "../store/profiles";

const profilesStore = useProfilesStore();
const message = computed(() => {
  return profilesStore.message;
});
</script>
