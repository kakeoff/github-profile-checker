<template>
  <div class="flex text-center h-full items-center justify-center flex-col">
    <h1 class="font-[700] text-[60px]">Not Found.</h1>
    <p class="text-[30px] font-[500]">
      You’ve landed on a URL that doesn’t seem to exist.
    </p>
    <button
      class="p-[10px] bg-gray-200 mt-[15px] rounded-[12px] hover:bg-gray-300 transition duration-200"
      @click="redirectHome"
    >
      RETURN HOME
    </button>
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
