<template>
  <div class="mt-[10px] mx-[20px] flex flex-col items-center h-screen w-full">
    <div
      v-if="profileLoaded"
      class="shadow-lg w-[80%] flex flex-row justify-between bg-gray-100 rounded-[12px]"
    >
      <div class="flex flex-row gap-[10px]">
        <img
          :src="userProfile?.avatar_url"
          class="w-[200px] h-[200px] rounded-l-[12px]"
          alt="user avatar"
        />
        <div class="flex flex-col gap-[10px] my-[10px]">
          <div
            class="text-[35px] font-[500] flex h-[40px] items-center gap-[5px]"
          >
            <span class="mdi mdi-account text-[45px]" />
            <span>{{ userProfile?.name || userProfile?.login }}</span>
          </div>
          <div class="flex text-[20px] font-[500] flex-row gap-[10px]">
            <span
              class="bg-red-300 px-[10px] py-[5px] rounded-tr-[12px] rounded-bl-[12px]"
              >{{ userProfile?.followers }} followers</span
            >
            <span
              class="bg-yellow-300 px-[10px] py-[5px] rounded-tr-[12px] rounded-bl-[12px]"
              >{{ userProfile?.following }} following</span
            >
            <span
              class="bg-blue-300 px-[10px] py-[5px] rounded-tr-[12px] rounded-bl-[12px]"
              >{{ userProfile?.public_repos }} repos</span
            >
          </div>
          <div class="flex flex-row gap-[10px]">
            <el-tooltip content="Profile creation date">
              <div
                class="text-[20px] font-[400] flex h-[40px] text-gray-600 items-center gap-[5px]"
              >
                <span class="mdi mdi-calendar-month text-[30px]" />
                <span>{{ formatDate(userProfile?.created_at) }}</span>
              </div>
            </el-tooltip>
            <el-tooltip content="Profile last activity date">
              <div
                class="text-[20px] font-[400] flex h-[40px] text-gray-600 items-center gap-[5px]"
              >
                <span class="mdi mdi-update text-[30px]" />
                <span>{{ formatDate(userProfile?.updated_at) }}</span>
              </div>
            </el-tooltip>
          </div>
          <button
            class="text-[17px] mt-[-10px] hover:shadow-md hover:scale-[1.01] transition duration-200 bg-gray-200 rounded-tr-[12px] rounded-bl-[12px] px-[10px] py-[5px] max-w-[170px] font-[400] flex h-[40px] text-gray-600 items-center gap-[5px]"
          >
            <span class="mdi mdi-information-outline text-[25px]" />
            <span>See more info</span>
          </button>
        </div>
      </div>
      <a
        :href="userProfile?.html_url"
        target="_blank"
        class="text-[15px] bg-gray-200 p-[5px] min-w-[150px] rounded-tr-[12px] rounded-bl-[12px] hover:shadow-md hover:scale-[1.01] transition duration-200 font-[400] flex h-[40px] items-center gap-[5px]"
      >
        <span class="mdi mdi-github text-[25px]" />
        <span>Profile Link</span>
        <span class="mdi mdi-link-variant"></span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, Ref, ref, watch } from "vue";
import { useProfilesStore } from "../store/profiles";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { ElLoading } from "element-plus";

const route = useRoute();
const router = useRouter();

const profilesStore = useProfilesStore();

const profileLoaded: Ref<boolean> = ref(false);

const userProfile = computed(() => {
  return profilesStore.profile;
});
const searchValue = computed(() => {
  return String(route.query.q);
});

watch(searchValue, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    getAllProfileData();
  }
});

onMounted(async () => {
  getAllProfileData();
});

const getGithubUser = async () => {
  if (!searchValue.value.length) return;
  const user = await profilesStore.getGithubUser(searchValue.value);
  if (!user) {
    ElNotification({
      title: "Profile not found",
      type: "error",
      message: "Profile with this name does not exist. Try again.",
    });
    router.push("/");
  }
};

const getAllProfileData = async () => {
  profileLoaded.value = false;
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });

  // data
  await getGithubUser();
  // -------

  nextTick(() => {
    profileLoaded.value = true;
  });
  loading.close();
};

const formatDate = (inputDateString: string | undefined) => {
  if (!inputDateString) return "Date not found";
  const date = new Date(inputDateString);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  return formattedDate;
};
</script>
