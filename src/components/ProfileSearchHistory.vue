<template>
  <div
    class="shadow-lg w-full max-w-[500px] font-[600] text-[12px] text-gray-500 p-[20px] bg-gray-100 rounded-[12px]"
  >
    <span class="">SEARCH HISTORY</span>
    <div class="w-full flex flex-col gap-[5px] pt-[10px]">
      <div
        class="bg-gray-200 flex flex-row items-center gap-[10px] text-[20px] font-[400] rounded-[6px] hover:bg-gray-300"
        v-for="item in history"
        :key="item.login"
      >
        <img
          class="w-[35px] h-[35px] rounded-[6px]"
          :src="item.avatar_url"
          alt="avatar"
        />
        <span>{{ item.login }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProfileSearchHistoryType } from "../types/profilesServiceTypes";

defineProps<{
  history: ProfileSearchHistoryType[];
}>();
</script>
