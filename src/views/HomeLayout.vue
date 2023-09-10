<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar app title="Github profile checker" :elevation="8">
      <template #append>
        <v-btn icon="mdi-theme-light-dark" @click="toggleDarkMode" />
      </template>
    </v-app-bar>
    <v-main class="d-flex align-center justify-center tw-min-h-[500px]">
      <slot />
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTheme } from "vuetify";

export default defineComponent({
  setup() {
    const theme = useTheme();

    function toggleDarkMode() {
      theme.global.name.value = theme.global.current.value.dark
        ? "light"
        : "dark";
      localStorage.setItem("theme", theme.global.name.value);
    }

    return {
      theme,
      toggleDarkMode,
      currentTheme: theme.global.name.value,
    };
  },

  mounted() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.theme.global.name.value = savedTheme;
    }
  },
});
</script>
