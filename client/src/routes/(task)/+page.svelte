<script>
	import TaskStatusTab from './../../lib/components/TaskStatusTab.svelte';
  import { onMount } from "svelte";
  import {
    taskData,
    taskDelete,
    updatedTask,
  } from "./../../lib/api/TaskApi.js";
  import { goto } from "$app/navigation";
  import FormAddTask from "$lib/components/FormAddTask.svelte";
  import { fade, fly } from "svelte/transition";
  import { getUserData, getUsername } from "$lib/api/UserApi.js";
  import { FileUpload } from "@skeletonlabs/skeleton-svelte";
  import { alertError, alertSuccess } from "$lib/alert.js";
  import TaskData from "$lib/components/TaskData.svelte";
  import IconPlus from '@lucide/svelte/icons/plus';

  const token = localStorage.getItem("token");
  let taskItem = $state([]);
  let userItem = $state([]);
  let isLoading = $state(false);
  let errorMessage = $state("");
  let formAdd = $state(false);
  let userImg = $state();
  let selectedFiles = $state([]);
  let username = $state("");

  function toogleFormNewTask() {
    formAdd = !formAdd;
  }

  async function handleDeleteTask(e, id) {
    e.preventDefault();
    try {
      const deleteTask = await taskDelete(token, id);
      const response = await deleteTask.json();
      if (deleteTask.status === 200) {
        alertSuccess("success");
        await fetchTask();
      } else {
        alertError("error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUsername() {
    try {
      isLoading
      const fetchUsername = await getUsername(token);
      const response = await fetchUsername.json();
      username = response.data.username;
    } catch (error) {
      console.log(error.message);
    } finally {
      isLoading = false
    }
  }

  async function fetchTask() {
    if (!token) return goto("/login");
    try {
      isLoading = true;
      const taskList = await taskData(token);
      if (taskList.status === 401) {
        await goto('/login');
        return;
      }
      const response = await taskList.json();
      taskItem = response.data;
    } catch (error) {
      console.log(error.message);
      errorMessage = error;
    } finally {
      isLoading = false;
    }
  }

  onMount(async () => {
    await fetchUsername();
    await fetchTask();
  });
</script>

<div class="pb-20">
  <div class="mt-2 border-b-2 mx-10">
    <!-- <img
      src="/img/undraw_completed-tasks.png"
      alt="TaskList-img"
      class="w-[23%] mx-auto"
    /> -->
    {#if username}
      <h1 class="text-center font-bold text-3xl md:text-5xl mt-10">
        Halo, <span class="text-orange-400 font-extrabold">{username}</span>
      </h1>
      <h1 class="text-center font-bold text-xl md:text-3xl mb-3 md:mb-10 mt-2 md:mt-0">Yuk, List Tugasmu Hari ini!</h1>
    {/if}
  </div>

  <div class="mt-5 ms-2 md:hidden">
    <TaskStatusTab />
  </div>

  {#if formAdd}
    <FormAddTask closeForm={toogleFormNewTask} {fetchTask} />
  {/if}

  {#if isLoading}
    <p>Loading...</p>
  {:else if errorMessage}
    <p>{errorMessage}</p>
  {:else if !isLoading && (!taskItem || taskItem.length === 0)}
    <p class="font-bold text-2xl text-center mt-10">Kamu belum membuat list task!</p>
  {:else}
    <TaskData dataTask={taskItem} handleDelete={handleDeleteTask} fetchTask={fetchTask}/>
  {/if}

  <div class="fixed bottom-10 right-8">
    <button onclick={toogleFormNewTask} class="px-5 py-5 rounded-full bg-orange-500 hover:bg-amber-700 active:scale-75 transition-transform duration-150">
      <IconPlus size={32} strokeWidth={2.5}/>
    </button>
  </div>
</div>
