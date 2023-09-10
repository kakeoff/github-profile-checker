<template>
  <HomeLayout>
    <router-view />
  </HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeLayout from "./views/HomeLayout.vue";

export default defineComponent({
  components: { HomeLayout },
});
</script>
