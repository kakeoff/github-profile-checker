<template>
  <section class="w-full h-full">
    <div
      v-if="profileLoaded"
      class="mt-[10px] flex flex-col items-center gap-[15px] w-full h-full"
    >
      <div class="flex flex-col lg:flex-row justify-between gap-[15px] w-full">
        <ProfileSearchHistory :history="profilesHistory" />
        <ProfileBlock :user-profile="userProfile" />
      </div>
      <StatsBlock :repos-length="profileRepos.length" :graph-data="graphData" />
      <ReposTable class="mt-[10px] rounded-[12px]" :table-data="profileRepos" />
      <div
        class="select-none py-[20px] hover:scale-[1.03] transition duration-200 flex flex-row items-center justify-center gap-[5px]"
      >
        <el-checkbox
          @change="onChangeIncludeForked"
          v-model="includeForked"
          label="Show forked repositories"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, Ref, ref, watch } from "vue";
import { useProfilesStore } from "../store/profiles";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { ElLoading } from "element-plus";
import createGraphData from "../helpers/graphData";
import { GraphDataType } from "../types/chartTypes";
import ProfileBlock from "../components/ProfileBlock.vue";
import StatsBlock from "../components/StatsBlock.vue";

const route = useRoute();
const router = useRouter();

const profilesStore = useProfilesStore();

const profileLoaded: Ref<boolean> = ref(false);
const profilesHistory = computed(() => {
  return profilesStore.profilesHistory;
});

const graphData: Ref<GraphDataType> = ref({} as GraphDataType);

const userProfile = computed(() => {
  return profilesStore.profile;
});

const profileRepos = computed(() => {
  if (!includeForked.value) {
    return profilesStore.profileRepos.filter((repo) => !repo.fork);
  }
  return profilesStore.profileRepos;
});
const searchValue = computed(() => {
  return String(route.query.q);
});
const includeForked: Ref<boolean> = ref(false);

watch(searchValue, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    getAllProfileData();
  }
});

onMounted(async () => {
  includeForked.value =
    localStorage.getItem("includeForked") === "1" ? true : false;
  profilesStore.loadProfilesHistory();
  await getAllProfileData();
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
    return;
  }
};

const getRepos = async (url: string) => {
  await profilesStore.getGithubUserRepos(url);
  if (profileRepos.value.length) {
    graphData.value = createGraphData(profileRepos.value);
  }
};

const getAllProfileData = async () => {
  profileLoaded.value = false;
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });

  await getGithubUser();
  if (userProfile.value?.repos_url) {
    await getRepos(userProfile.value.repos_url);
  }

  nextTick(() => {
    profileLoaded.value = true;
  });
  loading.close();
};

const onChangeIncludeForked = () => {
  localStorage.setItem("includeForked", includeForked.value ? "1" : "0");
  if (profileRepos.value.length) {
    graphData.value = createGraphData(profileRepos.value);
  }
};
</script>
