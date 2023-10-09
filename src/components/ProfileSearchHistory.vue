<template>
  <div
    class="shadow-lg w-full lg:max-w-[400px] border max-h-[240px] pb-[10px] overflow-hidden font-[600] text-[12px] text-gray-500 p-[20px] bg-gray-100 rounded-[12px]"
  >
    <span>HISTORY</span>
    <div
      class="w-full flex flex-col overflow-y-auto max-h-[190px] gap-[5px] mt-[10px] pb-[10px]"
    >
      <router-link
        :to="`/search?q=${item.login}`"
        class="pl-[5px] pr-[10px] border min-h-[55px] flex flex-row items-center justify-between text-[20px] font-[400] rounded-[6px]"
        v-for="item in history"
        :class="{
          'bg-gray-300':
            String(router.currentRoute.value.query.q) === item.login,
          'transition duration-200 hover:scale-[0.99] hover:bg-gray-200':
            String(router.currentRoute.value.query.q) !== item.login,
        }"
        :key="item.login"
      >
        <div class="flex flex-row items-center gap-[10px]">
          <img
            class="w-[45px] pointer-events-none h-[45px] rounded-[6px]"
            :src="item.avatar_url"
            alt="avatar"
          />
          <span>{{ item.name ?? item.login }}</span>
        </div>
        <el-tooltip content="Profile link">
          <button
            @click.stop="redirectProfilePage(item.html_url)"
            class="mdi mdi-github text-[25px] hover:text-black transition duration-200"
            :href="item.html_url"
          />
        </el-tooltip>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProfileSearchHistoryType } from "../types/profilesServiceTypes";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps<{
  history: ProfileSearchHistoryType[];
}>();

const redirectProfilePage = (url: string) => {
  window.open(url);
};
</script>
