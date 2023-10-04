<template>
  <nav
    class="text-[18px] md:text-[25px] fixed top-0 w-full h-[50px] flex items-center justify-between px-[10px] bg-gray-200 z-[2] font-[700]"
  >
    <router-link
      to="/"
      class="hover:scale-[1.01] hover:text-gray-700 transition duration-200"
    >
      Github Profile Checker
    </router-link>
    <el-tooltip
      v-if="!isMainView"
      :disabled="showSearchInput"
      content="Search profile"
      placement="bottom"
    >
      <div class="flex items-center">
        <span
          @click="onShowSearchInput(true)"
          :class="{
            'hover:scale-[1.1] transition duration-200 cursor-pointer':
              !showSearchInput,
          }"
          class="mdi mdi-magnify text-[35px]"
        />
        <input
          v-model="inputValue"
          @blur="onShowSearchInput(false)"
          @keyup.enter="onSearch"
          ref="searchInputEl"
          placeholder="Profile name"
          v-if="showSearchInput"
          class="transition bg-gray-200 duration-200 rounded-[12px] h-[30px]"
          type="text"
        />
      </div>
    </el-tooltip>
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
          >kakeoff</a
        >
        using
        <a class="text-blue-600" href="https://vuejs.org/" target="_blank"
          >VueJS</a
        >
        +
        <a class="text-blue-600" href="https://pinia.vuejs.org/" target="_blank"
          >Pinia</a
        >
        +
        <a class="text-blue-600" href="https://www.chartjs.org/" target="_blank"
          >ChartsJS</a
        >. Check out the code
        <a
          class="text-blue-600"
          href="https://github.com/kakeoff/github-profile-checker"
          target="_blank"
          >here</a
        >.
      </span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, Ref, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showSearchInput: Ref<boolean> = ref(false);
const searchInputEl: Ref<HTMLInputElement | null> = ref(null);
const inputValue = ref("");

const isMainView = computed(() => {
  return router.currentRoute.value.name === "mainView";
});

const onShowSearchInput = async (value: boolean) => {
  showSearchInput.value = value;
  nextTick(() => {
    if (searchInputEl.value && value) {
      searchInputEl.value.focus();
    }
  });
};

const onSearch = () => {
  if (inputValue.value.length) {
    router.push({
      name: "searchView",
      query: {
        q: inputValue.value,
      },
    });
    onShowSearchInput(false);
    inputValue.value = "";
  }
};
</script>
