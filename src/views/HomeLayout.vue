<template>
  <nav
    class="text-[18px] md:text-[25px] fixed top-0 w-full h-[55px] flex items-center justify-between px-[35px] bg-gray-200 z-[2] font-[700]"
  >
    <router-link to="/"> GITHUB PROFILE CHECKER </router-link>
    <div class="flex items-center">
      <div v-if="!isMainView" class="flex items-center h-[35px]">
        <input
          id="searchInput"
          v-model="inputValue"
          ref="searchInputEl"
          @keydown.enter="onSearch"
          placeholder="Profile name"
          class="transition w-[120px] sm:w-[250px] focus:ring-0 focus:border-black focus:bg-black/5 bg-gray-200 duration-200 rounded-l-[8px] h-full"
          type="text"
        />
        <label
          for="searchInput"
          @click="onSearch"
          class="border-[1px] h-full cursor-pointer group border-black bg-black flex items-center justify-center text-white w-[50px] rounded-r-[8px]"
        >
          <span
            class="mdi mdi-magnify text-[30px] group-hover:scale-[0.9] transition duration-200"
          />
        </label>
      </div>
    </div>
  </nav>
  <div
    class="px-[15px] md:px-[40px] flex flex-col w-full h-full pt-[60px] justify-between items-center"
  >
    <slot />
    <footer
      v-if="isMainView"
      class="w-full text-center px-[30px] flex flex-row items-center py-[20px] justify-center"
    >
      <span>
        Created by
        <a
          class="text-blue-600"
          href="https://github.com/kakeoff"
          target="_blank"
        >
          kakeoff
        </a>
        using
        <a class="text-blue-600" href="https://vuejs.org/" target="_blank">
          VueJS
        </a>
        +
        <a
          class="text-blue-600"
          href="https://pinia.vuejs.org/"
          target="_blank"
        >
          Pinia
        </a>
        +
        <a
          class="text-blue-600"
          href="https://www.chartjs.org/"
          target="_blank"
        >
          ChartsJS</a
        >. Check out the code
        <a
          class="text-blue-600"
          href="https://github.com/kakeoff/github-profile-checker"
          target="_blank"
        >
          here</a
        >.
      </span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const searchInputEl: Ref<HTMLInputElement | null> = ref(null);
const inputValue = ref("");

const isMainView = computed(() => {
  return router.currentRoute.value.name === "mainView";
});

const onSearch = () => {
  if (inputValue.value.length) {
    router.push({
      name: "searchView",
      query: {
        q: inputValue.value,
      },
    });
  }
};
</script>
