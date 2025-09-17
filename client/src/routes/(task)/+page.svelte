<script>
  import { onMount } from "svelte";
  import { taskData } from "./../../lib/api/TaskApi.js";
  import { goto } from "$app/navigation";
  import FormAddTask from "$lib/components/FormAddTask.svelte";
  import { fade } from "svelte/transition";
  import { getUserData, updateImg } from "$lib/api/UserApi.js";
  import { FileUpload } from '@skeletonlabs/skeleton-svelte';
  import { alertError, alertSuccess } from "$lib/alert.js";

  let taskItem = $state([]);
  let userItem = $state([]);
  let isLoading = $state(false);
  let errorMessage = $state("")
  let formAdd = $state(false)
  let userImg = $state()
  let selectedFiles = $state([])

  const token = localStorage.getItem("token");
  // console.log(token)

  function toogleFormNewTask() {
    formAdd = !formAdd
  }

  async function handleAddAvatar() {
    const formData = new FormData()
    formData.append('userImg', selectedFiles[0])
    console.log(`ini formdata: ${formData}`)

    if (!formData) return 
    const newImg = await updateImg(token, formData)
    const response = await newImg.json()

    if (newImg.status === 200) {
      alertSuccess("success upload data")
      userItem.userImg = response.newAvatar.userImg
      // await fetchUser()
    } else {
      alertError("failed")
      console.log(response.error)
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
      isLoading = true
      const userData = await getUserData(token)
      const response = await userData.json()
      userItem = response.userData
    } catch (error) {
      console.log(error.message);
      errorMessage = error;
    } finally {
      isLoading = false
    }
  }

  onMount(async () => {
    await fetchTask();
    await fetchUser();
  });
</script>

<div class="">
  <h1>Task</h1>
  <button onclick={toogleFormNewTask} type="button" class="px-4 py-2 bg-gray-900 rounded-md border border-blue-400">Add Task</button>
  {#if formAdd}
    <FormAddTask closeForm={toogleFormNewTask} fetchTask={fetchTask}/>
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
      {#each item.taskImg as imgTask}
      <img src={`http://localhost:3000/${imgTask}`} alt="Task image" />
    {/each}
        <li>{item.priority}</li>
        <li>{item.status}</li>
      {/each}
    </ul>
  {/if}

{#if userItem}
  <div transition:fade>
    <p>{userItem.username}</p>
    <p>{userItem.email}</p>
    <img src={`http://localhost:3000/${userItem.userImg}`} alt={userItem.username} />
    <h1>{userItem.userImg}</h1>
  </div>
{/if}

<FileUpload name="userImg" accept="image/*" maxFiles={1} onFileChange={({acceptedFiles}) => {
    selectedFiles = acceptedFiles;
    console.log("File dipilih:", acceptedFiles);
  }} 
  onFileReject={console.error} classes="w-full" />
<button type="button" onclick={handleAddAvatar}>add</button>
<h1>{userImg}</h1>
</div>
