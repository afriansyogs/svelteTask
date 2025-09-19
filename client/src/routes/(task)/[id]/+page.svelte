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
  <h1>{detailData?.title}</h1>
  <h1>{detailData?.description}</h1>
  <h1>{detailData?.deadline}</h1>
  <h1>{detailData?.priority}</h1>
  <h1>{detailData?.status}</h1>
</div>