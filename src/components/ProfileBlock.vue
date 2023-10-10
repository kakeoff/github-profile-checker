<template>
  <div class="shadow-lg border w-full bg-gray-100 rounded-[12px]">
    <div
      class="flex flex-col sm:flex-row items-center md:items-start gap-0 md:gap-[10px]"
    >
      <div class="h-full flex items-center justify-center p-[10px]">
        <img
          :src="userProfile?.avatar_url"
          class="w-[400px] border pointer-events-none min-w-[220px] sm:w-[220px] rounded-[12px]"
          alt="user avatar"
        />
      </div>
      <div
        class="flex flex-col items-center sm:items-start gap-[10px] mt-[4px] mb-[10px]"
      >
        <div
          class="sm:text-[35px] text-[25px] font-[500] flex min-h-[30px] items-center gap-[5px]"
        >
          <span class="mdi mdi-account sm:text-[45px] text-[35px]" />
          <span>{{ userProfile?.name || userProfile?.login }}</span>
        </div>
        <div
          class="flex text-[15px] mx-[10px] sm:mx-0 justify-center md:justify-start md:text-[20px] font-[500] flex-row gap-[10px]"
        >
          <span
            class="bg-red-300 px-[10px] text-center py-[5px] rounded-tr-[12px] rounded-bl-[12px]"
            >{{ userProfile.followers }} followers</span
          >
          <span
            class="bg-yellow-300 px-[10px] text-center py-[5px] rounded-tr-[12px] rounded-bl-[12px]"
            >{{ userProfile.following }} following</span
          >
          <span
            class="bg-blue-300 px-[10px] text-center py-[5px] rounded-tr-[12px] rounded-bl-[12px]"
            >{{ userProfile.public_repos }} repos</span
          >
        </div>
        <div
          class="flex flex-row text-[15px] justify-center md:justify-start md:text-[20px] mb-[5px] gap-[10px]"
        >
          <el-tooltip content="Profile creation date">
            <div
              class="font-[400] flex h-[40px] text-gray-600 items-center justify-center gap-[5px]"
            >
              <span class="mdi mdi-calendar-month text-[25px] md:text-[30px]" />
              <span>{{ formatDate(userProfile?.created_at) }}</span>
            </div>
          </el-tooltip>
          <el-tooltip content="Profile last activity date">
            <div
              class="font-[400] flex h-[40px] text-gray-600 items-center justify-center gap-[5px]"
            >
              <span class="mdi mdi-update text-[25px] md:text-[30px]" />
              <span>{{ formatDate(userProfile?.updated_at) }}</span>
            </div>
          </el-tooltip>
        </div>
        <a
          :href="userProfile?.html_url"
          target="_blank"
          class="text-[12px] md:text-[17px] mt-[-10px] hover:shadow-md hover:scale-[1.01] hover:bg-gray-300 transition duration-200 bg-gray-200 rounded-[12px] px-[10px] py-[5px] w-[150px] md:w-[200px] font-[400] flex h-[40px] text-gray-600 items-center gap-[5px]"
        >
          <span class="mdi mdi-github text-[25px]" />
          <span>Check profile</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GithubUserType } from "../types/profileServiceTypes";
import { formatDate } from "../helpers/helper";

defineProps<{
  userProfile: GithubUserType;
}>();
</script>
