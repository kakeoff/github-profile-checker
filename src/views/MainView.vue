<template>
  <div
    class="w-full px-[10px] py-[100px] flex items-center flex-col gap-[20px]"
  >
    <div class="text-center">
      <span class="text-[25px] md:text-[40px]"> Explore Github profiles </span>
    </div>
    <div class="w-full flex justify-center">
      <input
        v-model="inputValue"
        class="w-[300px] rounded-[12px] text-[20px] transition duration-200 h-[50px] hover:scale-[1.01] md:w-[500px]"
        placeholder="Profile name"
        type="text"
        @keyup.enter="onSearch"
      />
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
