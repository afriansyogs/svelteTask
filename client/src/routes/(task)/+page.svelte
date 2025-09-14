<script>
  import { onMount } from "svelte";
  import { taskData } from "./../../lib/api/TaskApi.js";
  import { goto } from "$app/navigation";
  import FormAddTask from "$lib/components/FormAddTask.svelte";
  import { fade } from "svelte/transition";

  let taskItem = $state([]);
  let isLoading = $state(false);
  let errorMessage = $state("")
  let formAdd = $state(false)

  const token = localStorage.getItem("token");
  // console.log(token)

  async function getTaskData() {
    if (!token) return goto("/login");
    try {
      isLoading = true;
      const taskList = await taskData(token);
      const response = await taskList.json();
      taskItem = response.task;
    } catch (error) {
      console.log(error.message);
      errorMessage = error;
    } finally {
      isLoading = false;
    }
  }

  onMount(async () => {
    await getTaskData();
  });
</script>

<div class="">
  <h1>Task</h1>
  <button onclick={() => formAdd = !formAdd} type="button" class="px-4 py-2 bg-gray-900 rounded-md border border-blue-400">Add Task</button>
  {#if formAdd}
    <FormAddTask />
  {/if}

  {#if isLoading}
    <p>Loading...</p>
  {:else if errorMessage}
    <p>{errorMessage}</p>
  {:else if taskItem.length === 0}
    <p>TIdak ada data</p>
  {:else}
    <ul transition:fade>
      {#each taskItem as item (item.id)}
        <li>{item.title}</li>
        <li>{item.description}</li>
        <li>{item.deadline}</li>
        <li>{item.priority}</li>
        <li>{item.status}</li>
      {/each}
    </ul>
  {/if}
</div>
