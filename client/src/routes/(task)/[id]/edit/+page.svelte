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
      if (response.status === 200) {
        task.title = responseBody.task.title
        task.description = responseBody.task.description
        task.taskImg = responseBody.task.taskImg
        task.deadline = formatDateTimeLocal(responseBody.task.deadline)
        task.priority = responseBody.task.priority
        task.status = responseBody.task.status
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

<div class="w-[95%] mx-auto">
  <h1 class="text-4xl font-bold text-center mt-10">Edit Task</h1>
    <form onsubmit={handleUpdate} class="space-y-5">
      <div>
        <label for="title" class="text-base">Title:</label>
        <input type="text" name="title" id="title" bind:value={task.title} class="w-full bg-neutral-900 rounded-md py-2 ps-2" placeholder={task.title} required>
      </div>
      <div>
        <label class="label">
          <span class="label-text text-base">Description</span>
          <textarea class="textarea bg-neutral-900" rows="4" bind:value={task.description} placeholder={task.description} required></textarea>
        </label>
      </div>
      <div>
        <label for="deadline" class="text-base">Deadline:</label>
        <input type="datetime-local" name="deadline" id="deadline" bind:value={task.deadline} class="bg-neutral-900 w-full rounded-md py-2 ps-1" required>
      </div>
      <div class="flex space-x-5 items-center">
        <label for="priority" class="text-base">Priority</label>
      <select name="priority" id="priority" bind:value={task.priority} required class="bg-neutral-900 rounded-md w-full py-2 rounde-md">
        <option selected value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>
      <label for="status" class="text-base">Status</label>
      <select name="status" id="status" bind:value={task.status} required class="bg-neutral-900 rounded-md w-full py-2 rounde-md">
        <option selected value="PENDING">Pending</option>
        <option value="INPROGRESS">In Progress</option>
        <option value="COMPLETED">Finish</option>
      </select>
      </div>
      <div>
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
      </div>
      <button type="submit" class="w-full bg-orange-700 py-3 rounded-md font-bold mt-2">Submit</button>
    </form>
</div>