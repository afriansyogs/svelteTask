<script lang="ts">
  import { formatDateTimeLocal } from "./../../../lib/utils/FormatDateTime.js";
  import { taskDetail } from "./../../../lib/api/TaskApi.js";
  import { page } from "$app/state";
  import { alertError } from "$lib/alert";
  import { onMount } from "svelte";
  import type { TaskDetail } from "$lib/types/type.js";
  import { token } from "$lib/state/token.svelte.js";

  token.token = localStorage.getItem("token");
  const { id } = page.params;
  let detailData = $state<TaskDetail>({
    id: id,
    title: "",
    description: "",
    taskImg: [],
    deadline: "",
    priority: "",
    status: "",
  });

  async function fetchDetailTask() {
    try {
      const detailTask = await taskDetail(token.token, id);
      const response = await detailTask.json();
      if (detailTask.status === 200) {
        detailData = response.data;
      } else {
        await alertError(detailTask.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  $inspect(detailData);

  onMount(async () => {
    await fetchDetailTask();
  });
</script>

<div class="w-[95%] mx-auto">
  <h1 class="text-4xl font-bold text-center mt-10">Detail Task!</h1>
  <div class="space-y-5">
    <div class="">
      <h1 class="font-semibold">Title:</h1>
      <div class="bg-neutral-900 w-full h-auto py-2 rounded-md">
        <h1 class="ms-2">{detailData?.title}</h1>
      </div>
    </div>
    <div class="">
      <h1 class="font-semibold">Description:</h1>
      <div class="bg-neutral-900 w-full h-auto py-2 rounded-md">
        <h1 class="ms-2">{detailData?.description}</h1>
      </div>
    </div>
    <div class="">
      <h1 class="font-semibold">Description:</h1>
      <div class="bg-neutral-900 w-full h-auto py-2 rounded-md">
        <h1 class="ms-2">{formatDateTimeLocal(detailData?.deadline)}</h1>
      </div>
    </div>
    <div class="flex space-x-5">
      <div class="w-full">
        <h1 class="font-semibold">Priority:</h1>
        <div class="bg-neutral-900 w-full h-auto py-2 rounded-md">
          <h1
            class="ms-2
                    {detailData?.priority === 'LOW'
                      ? 'text-cyan-700'
                    : detailData?.priority === 'MEDIUM'
                      ? 'text-amber-600'
                      : 'text-red-700'}"
          >
            {detailData?.priority}
          </h1>
        </div>
      </div>
      <div class="w-full">
        <h1 class="font-semibold">Status:</h1>
        <div class="bg-neutral-900 w-full h-auto py-2 rounded-md">
          <h1
            class="ms-2
                  {detailData?.status === 'PENDING'
                    ? 'text-red-500'
                  : detailData?.status === 'INPROGRESS'
                    ? 'text-yellow-500'
                    : 'text-green-500'}"
          >
            {detailData?.status}
          </h1>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-5">
      {#each detailData?.taskImg && detailData.taskImg.filter(img => img.trim() !== "") as imgTask}
        <img src="http://localhost:3000/{imgTask}" alt="" class="w-full h-[75%] object-cover rounded-md">
      {/each}
    </div>
  </div>
</div>
