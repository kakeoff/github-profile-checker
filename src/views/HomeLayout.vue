<template>
  <div class="w-full h-screen overflow-hidden">
    <nav
      class="text-[25px] h-[50px] flex items-center justify-between px-[10px] bg-gray-200 font-[700]"
    >
      <router-link
        to="/"
        class="hover:scale-[1.01] hover:text-gray-700 transition duration-200"
      >
        Github Profile Checker
      </router-link>
      <div class="flex items-center">
        <span
          @click="onShowSearchInput(true)"
          class="mdi mdi-magnify cursor-pointer text-[35px]"
        />
        <input
          v-model="inputValue"
          @blur="onShowSearchInput(false)"
          ref="searchInputEl"
          placeholder="Profile name"
          v-if="showSearchInput"
          class="transition bg-gray-200 duration-200 rounded-[12px] h-[30px]"
          type="text"
        />
      </div>
    </nav>
    <slot class="overflow-y-auto" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, Ref, ref } from "vue";

const showSearchInput: Ref<boolean> = ref(false);
const searchInputEl: Ref<HTMLInputElement | null> = ref(null);
const inputValue = ref("");
const onShowSearchInput = async (value: boolean) => {
  showSearchInput.value = value;
  nextTick(() => {
    if (searchInputEl.value && value) {
      searchInputEl.value.focus();
    }
  });
};
</script>
