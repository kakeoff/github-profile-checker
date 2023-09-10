<template>
  <div
    class="tw-flex tw-text-center tw-h-full tw-items-center tw-justify-center tw-flex-col"
  >
    <h1 class="tw-font-[700] tw-text-[60px]">Not Found.</h1>
    <p class="tw-text-[30px] tw-font-[500]">
      You’ve landed on a URL that doesn’t seem to exist.
    </p>
    <v-btn @click="redirectHome" class="tw-mt-[15px]" width="300">
      RETURN HOME
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    redirectHome() {
      this.$router.push("/");
    },
  },
});
</script>
