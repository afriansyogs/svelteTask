<script>
  import { onMount } from "svelte";
  import {
    taskData,
    taskDelete,
    updatedTask,
  } from "./../../lib/api/TaskApi.js";
  import { goto } from "$app/navigation";
  import FormAddTask from "$lib/components/FormAddTask.svelte";
  import { fade } from "svelte/transition";
  import { getUserData, getUsername, updateImg } from "$lib/api/UserApi.js";
  import { FileUpload } from "@skeletonlabs/skeleton-svelte";
  import { alertError, alertSuccess } from "$lib/alert.js";
  import TaskData from "$lib/components/TaskData.svelte";
  import IconPlus from '@lucide/svelte/icons/plus';

  let taskItem = $state([]);
  let userItem = $state([]);
  let isLoading = $state(false);
  let errorMessage = $state("");
  let formAdd = $state(false);
  let userImg = $state();
  let selectedFiles = $state([]);
  let username = $state("");

  const token = localStorage.getItem("token");
  // console.log(token)

  function toogleFormNewTask() {
    formAdd = !formAdd;
  }

  async function handleAddAvatar() {
    const formData = new FormData();
    formData.append("userImg", selectedFiles[0]);
    console.log(`ini formdata: ${formData}`);

    if (!formData) return;
    const newImg = await updateImg(token, formData);
    const response = await newImg.json();

    if (newImg.status === 200) {
      alertSuccess("success upload data");
      userItem.userImg = response.newAvatar.userImg;
      // await fetchUser()
    } else {
      alertError("failed");
      console.log(response.error);
    }
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

  async function handleUpdateTask(e) {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("title");
      const updateTask = await updatedTask(formData);
    } catch (error) {}
  }

  async function fetchUsername() {
    try {
      const fetchUsername = await getUsername(token);
      const response = await fetchUsername.json();
      username = response.userNameData.username;
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchTask() {
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

  async function fetchUser() {
    try {
      isLoading = true;
      const userData = await getUserData(token);
      const response = await userData.json();
      userItem = response.userData;
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
    // await fetchUser();
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
      <h1 class="text-center font-bold text-5xl mt-10">
        Halo, <span class="text-orange-400 font-extrabold">{username}</span>
      </h1>
      <h1 class="text-center font-medium text-3xl mb-10">Yuk, List Tugasmu Hari ini!</h1>
    {:else}
      <h1>hola</h1>
    {/if}
  </div>

  {#if formAdd}
    <FormAddTask closeForm={toogleFormNewTask} {fetchTask} />
  {/if}

  {#if isLoading}
    <p>Loading...</p>
  {:else if errorMessage}
    <p>{errorMessage}</p>
  {:else if taskItem.length === 0}
    <p>TIdak ada data</p>
  {:else}
    <TaskData dataTask={taskItem} />
  {/if}

  <div class="fixed bottom-10 right-8">
    <button onclick={toogleFormNewTask} class="px-5 py-5 rounded-full bg-orange-500 hover:bg-amber-700 active:scale-75 transition-transform duration-150">
      <IconPlus size={32} strokeWidth={2.5}/>
    </button>
  </div>

  <!-- <FileUpload
    name="userImg"
    accept="image/*"
    maxFiles={1}
    onFileChange={({ acceptedFiles }) => {
      selectedFiles = acceptedFiles;
      console.log("File dipilih:", acceptedFiles);
    }}
    onFileReject={console.error}
    classes="w-full"
  />
  <button type="button" onclick={handleAddAvatar}>add</button>
  <h1>{userImg}</h1> -->
</div>
