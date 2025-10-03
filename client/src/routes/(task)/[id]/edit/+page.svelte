<script>
  import { FileUpload } from '@skeletonlabs/skeleton-svelte';
  // Icons
  import IconDropzone from '@lucide/svelte/icons/image-plus';
  import IconFile from '@lucide/svelte/icons/paperclip';
  import IconRemove from '@lucide/svelte/icons/circle-x';
  import IconX from '@lucide/svelte/icons/x';

  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { alertError, alertSuccess } from "$lib/alert";
  import { taskDetail, updatedTask } from "$lib/api/TaskApi";
  import { error } from "@sveltejs/kit";
  import { onMount } from "svelte";
  import { fly } from 'svelte/transition';

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
  let imgEdit = $state([])

  function deleteImg(e, img) {
    e.preventDefault()
    task.taskImg = task.taskImg.filter((item) => item !== img)
  }

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
        task.title = responseBody.data.title
        task.description = responseBody.data.description
        task.taskImg = responseBody.data.taskImg
        task.deadline = formatDateTimeLocal(responseBody.data.deadline)
        task.priority = responseBody.data.priority
        task.status = responseBody.data.status
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
      formData.append('oldImg', task.taskImg)
      imgEdit.forEach((item, index) => {
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
            imgEdit = acceptedFiles
            console.info(imgEdit)
            console.log(acceptedFiles)
          }}
          onFileReject={console.error}
          classes="w-full"
        >
          {#snippet iconInterface()}<IconDropzone class="size-8" />{/snippet}
          {#snippet iconFile()}<IconFile class="size-4" />{/snippet}
          {#snippet iconFileRemove()}<IconRemove class="size-4" />{/snippet}
        </FileUpload>
        <div class="flex gap-4 mt-4">
          {#each task.taskImg.filter(img => img.trim() !== "") as img}
          {console.log(`ini${typeof img}`)}
            <div out:fly={{ y:20 }} class="flex flex-col items-center w-1/2">
              <div class="bg-neutral-900 w-full h-10 flex justify-between items-center px-2">
                {img}
                <IconX onclick={(e) => deleteImg(e, img)} class="cursor-pointer"/>
              </div>
              <img src="http://localhost:3000/{img}" alt="Task Img" class="w-full h-40 object-cover">
            </div>
          {/each}
        </div>
      </div>
      <button type="submit" class="w-full bg-orange-700 py-3 rounded-md font-bold mt-2">Submit</button>
    </form>
</div>