<script>
  import { FileUpload } from '@skeletonlabs/skeleton-svelte';
  // Icons
  import IconDropzone from '@lucide/svelte/icons/image-plus';
  import IconFile from '@lucide/svelte/icons/paperclip';
  import IconRemove from '@lucide/svelte/icons/circle-x';

  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { alertError, alertSuccess } from "$lib/alert";
  import { taskDetail, updatedTask } from "$lib/api/TaskApi";
  import { error } from "@sveltejs/kit";
  import { onMount } from "svelte";

  let token = localStorage.getItem('token')
  let {id} = page.params

  let task = $state({
    id: id,
    title: '',
    description: '',
    taskImg: [],
    deadline: '',
    priority: '',
    status: '',
  })
  // let oldImg = $state([])

  // let finalImg = $derived.by(() => {
  //   let totalItemDelete = task.taskImg.length
  //   let oldImgDelete = oldImg.slice(totalItemDelete)
  //   let allImg = [...oldImgDelete, ...task.taskImg]
  //   debugger
  //   console.log(oldImg.length)
  //   return allImg
  // })

  function formatDateTimeLocal(date) {
    const dateTime = new Date(date)
    const local = new Date(dateTime.getTime() - dateTime.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  }

  async function getTaskData() {
    try {
      let response = await taskDetail(token, id)
      let responseBody = await response.json()
      // task = response
      if (response.status === 200) {
        task.title = responseBody.task.title
        task.description = responseBody.task.description
        task.taskImg = responseBody.task.taskImg
        task.deadline = formatDateTimeLocal(responseBody.task.deadline)
        task.priority = responseBody.task.priority
        task.status = responseBody.task.status
        // oldImg = responseBody.task.taskImg
      } else {
        await alertError(error.messages)
      }
      console.log(task)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      let formData = new FormData()
      formData.append('title', task.title)
      formData.append('description', task.description)
      formData.append('deadline', task.deadline)
      formData.append('priority', task.priority)
      formData.append('status', task.status)
      task.taskImg.forEach((item, index) => {
        formData.append('taskImg', item)
      });
      

      let update = await updatedTask(token, id, formData)
      let response = await update.json()
      
      if (update.status === 200) {
        alertSuccess("success update Data")
        goto('/')
      } else {
        await alertError(error.messages)
      }
    } catch (error) {
      alertError(error.messages)
      console.log(error)
    }
  }

  onMount(async () => {
    await getTaskData()
  })
</script>

<div class="flex min-h-[100dvh] items-center justify-center">
  <div class="w-[85%]">
    <h1 class="text-center font-bold text-4xl">Edit Task</h1>
    <form onsubmit={handleUpdate} class="bg-neutral-800 border-2 border-black shadow-xl rounded-md space-y-3 px-5 py-5 mt-4">
      <div class="flex justify-end">
        <a href="/" class="px-3 py-2 bg-orange-900 rounded-md">Close</a>
      </div>
      <label for="title" class="font-semibold">Title:</label>
      <input type="text" name="title" id="title" bind:value={task.title} class="w-full border-2 border-neutral-600 rounded-md py-2" placeholder={task.title} required>
      <label for="description" class="font-semibold">Description:</label>
      <input type="text" name="description" id="description" bind:value={task.description} class="w-full border-2 border-neutral-600 rounded-md py-2" placeholder={task.description} required>
      <label for="taskImg" class="font-semibold">Task Image</label>
      <FileUpload
        name="taskImg"
        accept="image/*"
        maxFiles={3}
        subtext="Attach up to 3 files."
        onFileChange={({acceptedFiles}) => {
          task.taskImg = acceptedFiles;
          console.log(acceptedFiles)
          console.log(typeof acceptedFiles)
        }}
        onFileReject={console.error}
        classes="w-full"
      >
        {#snippet iconInterface()}<IconDropzone class="size-8" />{/snippet}
        {#snippet iconFile()}<IconFile class="size-4" />{/snippet}
        {#snippet iconFileRemove()}<IconRemove class="size-4" />{/snippet}
      </FileUpload>
      <label for="deadline" class="font-semibold">Deadline:</label>
      <input type="datetime-local" name="deadline" id="deadline" bind:value={task.deadline} class="w-full border-2 border-neutral-600 rounded-md py-2" required>
      <label for="priority" class="block">Priority</label>
      <select name="priority" id="priority" bind:value={task.priority} required class="bg-black-900 rounded-md w-full py-2 rounde-md border-2 border-neutral-600">
        <option selected value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>
      <label for="status" class="block">Status</label>
      <select name="status" id="status" bind:value={task.status} required class="bg-black-900 rounded-md w-full py-2 rounde-md border-2 border-neutral-600">
        <option selected value="PENDING">Pending</option>
        <option value="INPROGRESS">In Progress</option>
        <option value="COMPLETED">Finish</option>
      </select>
      <button type="submit" class="w-full bg-orange-700 py-2 rounded-md font-bold mt-2">Submit</button>
    </form>
  </div>
</div> 