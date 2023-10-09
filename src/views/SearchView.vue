<template>
  <section class="w-full h-full">
    <div
      v-if="profileLoaded"
      class="mt-[10px] flex flex-col items-center gap-[15px] w-full h-full"
    >
      <div class="flex flex-col lg:flex-row justify-between gap-[15px] w-full">
        <ProfileSearchHistory :history="profilesHistory" />
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
                  >{{ userProfile?.followers }} followers</span
                >
                <span
                  class="bg-yellow-300 px-[10px] text-center py-[5px] rounded-tr-[12px] rounded-bl-[12px]"
                  >{{ userProfile?.following }} following</span
                >
                <span
                  class="bg-blue-300 px-[10px] text-center py-[5px] rounded-tr-[12px] rounded-bl-[12px]"
                  >{{ userProfile?.public_repos }} repos</span
                >
              </div>
              <div
                class="flex flex-row text-[15px] justify-center md:justify-start md:text-[20px] mb-[5px] gap-[10px]"
              >
                <el-tooltip content="Profile creation date">
                  <div
                    class="font-[400] flex h-[40px] text-gray-600 items-center justify-center gap-[5px]"
                  >
                    <span
                      class="mdi mdi-calendar-month text-[25px] md:text-[30px]"
                    />
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
                class="text-[12px] md:text-[17px] mt-[-10px] hover:shadow-md hover:scale-[1.01] hover:bg-gray-300 transition duration-200 bg-gray-200 rounded-tr-[12px] rounded-bl-[12px] px-[10px] py-[5px] w-[150px] md:w-[200px] font-[400] flex h-[40px] text-gray-600 items-center gap-[5px]"
              >
                <span class="mdi mdi-github text-[25px]" />
                <span>Check profile</span>
                <span class="mdi mdi-link-variant"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        class="shadow-lg text-center sm:text-left w-full px-[20px] py-[15px] border bg-gray-100 rounded-[12px]"
      >
        <span class="text-[35px] font-[700]">STATISTICS</span>
        <div
          v-if="profileRepos.length"
          class="flex flex-row flex-wrap justify-center lg:justify-between gap-[25px] items-center mt-[10px] w-full"
        >
          <div
            class="w-[300px] sm:w-[500px] md:w-[600px] lg:w-[280px] xl:w-[370px] 2xl:w-[450px] flex flex-col items-center gap-[5px]"
          >
            <span class="font-[500] text-[25px]">REPOS OVER TIME</span>
            <LineChart
              v-if="graphData.numberOfReposByYear"
              :chart-data="graphData.numberOfReposByYear"
            />
          </div>
          <div
            class="w-[300px] sm:w-[500px] md:w-[600px] lg:w-[280px] xl:w-[370px] 2xl:w-[450px] flex flex-col items-center gap-[5px]"
          >
            <span class="font-[500] text-[25px]">POPULAR REPOS</span>

            <BarChart
              v-if="graphData.topReposByStars"
              :chart-data="graphData.topReposByStars"
            />
          </div>
          <div
            class="w-[300px] sm:w-[500px] md:w-[600px] lg:w-[280px] xl:w-[370px] 2xl:w-[450px] flex flex-col items-center gap-[5px]"
          >
            <span class="font-[500] text-[25px]">LANGUAGES</span>
            <DoughnutChart
              v-if="graphData.languageTypes"
              :chart-data="graphData.languageTypes"
            />
          </div>
        </div>
        <div
          class="w-full h-[100px] flex justify-center items-center text-gray-500"
          v-else
        >
          <span>There are no public repositories</span>
        </div>
      </div>

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
import LineChart from "../components/charts/LineChart.vue";
import DoughnutChart from "../components/charts/DoughnutChart.vue";
import BarChart from "../components/charts/BarChart.vue";
import { formatDate } from "../helpers/helper";

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
