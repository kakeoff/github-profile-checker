<template>
  <div
    class="shadow-lg border text-center sm:text-left w-full px-[20px] pt-[15px] pb-[20px] bg-gray-100 rounded-[12px]"
  >
    <div
      class="w-full flex flex-col sm:flex-row items-center sm:justify-between"
    >
      <span class="text-[35px] font-[700]">REPOSITORIES</span>
      <input
        v-model="searchValue"
        placeholder="Type to search"
        class="transition focus:ring-0 focus:border-black focus:bg-black/5 bg-transparent duration-200 rounded-[8px] h-full"
        type="text"
      />
    </div>
    <el-table
      class="rounded-[12px] mt-[10px]"
      :height="400"
      :data="filterTableData"
      style="width: 100%"
    >
      <el-table-column prop="name" label="Name" width="300" />
      <el-table-column prop="html_url" label="Links">
        <template #default="scope">
          <el-tooltip v-if="scope.row.html_url" content="Repo link">
            <a
              :href="scope.row.html_url"
              class="mdi mdi-github text-blue-700 text-[20px]"
              target="_blank"
            />
          </el-tooltip>
          <el-tooltip
            v-if="scope.row.homepage !== null && scope.row.homepage !== ''"
            content="Homepage link"
          >
            <a
              v-if="scope.row.homepage !== null && scope.row.homepage !== ''"
              :href="scope.row.homepage"
              target="_blank"
            >
              <span class="mdi mdi-home-search text-blue-700 text-[20px]" />
            </a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column width="130" prop="size" label="Size">
        <template #default="scope">{{ `${scope.row.size} KB` }}</template>
      </el-table-column>
      <el-table-column width="130" prop="forks_count" label="Forks">
        <template #default="scope">
          <div class="flex flex-row items-center gap-[3px]">
            <span class="mdi mdi-source-branch text-green-500 text-[20px]" />
            <span> {{ scope.row.forks_count }} </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="130" prop="stargazers_count" label="Stars">
        <template #default="scope">
          <div class="flex flex-row items-center gap-[3px]">
            <span class="mdi mdi-star text-yellow-500 text-[20px]" />
            <span> {{ scope.row.stargazers_count }} </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="130px" prop="open_issues_count" label="Issues">
        <template #default="scope">
          <div class="flex flex-row items-center gap-[3px]">
            <span class="mdi mdi-alert text-red-500 text-[20px]" />
            <span> {{ scope.row.open_issues_count }} </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="130" prop="language" label="Language" />
      <el-table-column width="135" prop="created_at" label="Created">
        <template #default="scope">
          <div class="flex flex-row items-center gap-[3px]">
            <span class="mdi mdi-calendar-month text-orange-500 text-[20px]" />

            <span> {{ formatDate(scope.row.created_at) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="135" prop="updated_at" label="Updated">
        <template #default="scope">
          <div class="flex flex-row items-center gap-[3px]">
            <span class="mdi mdi-update text-purple-500 text-[20px]" />
            <span> {{ formatDate(scope.row.updated_at) }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { GitHubRepoType } from "../types/profilesServiceTypes";
import { formatDate } from "../helpers/helper";
import { computed, Ref, ref } from "vue";

const props = defineProps<{
  tableData: GitHubRepoType[];
}>();

const searchValue: Ref<string> = ref("");

const filterTableData = computed(() =>
  props.tableData
    .filter(
      (data) =>
        !searchValue.value ||
        (data.name &&
          data.name.toLowerCase().includes(searchValue.value.toLowerCase())) ||
        (data.language &&
          data.language
            .toLowerCase()
            .includes(searchValue.value.toLowerCase())),
    )
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    ),
);
</script>
