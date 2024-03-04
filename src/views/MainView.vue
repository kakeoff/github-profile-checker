<template>
  <div
    class="w-full px-[10px] py-[100px] flex items-center flex-col gap-[20px]"
  >
    <div class="text-center">
      <span class="text-[25px] md:text-[40px]"> Explore Github profiles </span>
    </div>
    <div class="w-full flex justify-center items-center flex-col gap-[30px]">
      <input
        id="inputEl"
        v-model="inputValue"
        class="w-[300px] rounded-[12px] text-[20px] transition duration-200 h-[50px] focus:bg-black/5 focus:ring-0 border-[1px] shadow-md focus:border-black md:w-[500px]"
        placeholder="Profile name"
        type="text"
        @keyup.enter="onSearch"
      />
      <label
        @click="onSearch"
        for="inputEl"
        class="bg-black cursor-pointer flex justify-center items-center gap-[5px] text-white p-[10px] hover:scale-[1.05] transition duration-200 rounded-[8px]"
      >
        <span>GO TO PROFILE</span>

        <div class="mdi mdi-arrow-down-thick rotate-[-90deg]" />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const inputValue = ref("");

const onSearch = () => {
  if (inputValue.value.length) {
    router.push({
      name: "searchView",
      query: {
        q: inputValue.value,
      },
    });
    inputValue.value = "";
  }
};
</script>
