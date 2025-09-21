<script>
	import { taskDetail } from './../../../lib/api/TaskApi.js';
  import { page } from "$app/state";
  import { alertError } from '$lib/alert';
  import { onMount } from 'svelte';

  const token = localStorage.getItem('token');
  const {id} = page.params;
  console.log(id)

  let detailData = $state({
    id: id,
    title: '',
    description: '',
    taskImg: [],
    deadline: '',
    priority: '',
    status: '',
  })

  async function fetchDetailTask() {
    try {
      const detailTask = await taskDetail(token, id)
      const response = await detailTask.json()
      if (detailTask.status === 200) {
        detailData = response.task
      } else {
        await alertError(detailTask.error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  $inspect(detailData)

  onMount(async () => {
    await fetchDetailTask();
  })
</script>

<div class="">
  <h1 class="text-4xl font-bold text-center mt-10">Detail Task!</h1>
  <h1>Task:</h1>
  <h1>{detailData?.title}</h1>
  <h1>Description:</h1>
  <h1>{detailData?.description}</h1>
  <h1>Deadline:</h1>
  <h1>{detailData?.deadline}</h1>
  <h1>Priority:</h1>
  <h1>{detailData?.priority}</h1>
  <h1>Status:</h1>
  <h1>{detailData?.status}</h1>
  {#each detailData.taskImg as imgTask}
    <h1>{imgTask}</h1>
  {/each}
</div>