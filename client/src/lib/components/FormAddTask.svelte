<script>
  import { FileUpload } from '@skeletonlabs/skeleton-svelte';
  // Icons
  import IconDropzone from '@lucide/svelte/icons/image-plus';
  import IconFile from '@lucide/svelte/icons/paperclip';
  import IconRemove from '@lucide/svelte/icons/circle-x';
  import { submitTask } from '$lib/api/TaskApi';
  import { alertError, alertSuccess } from '$lib/alert';
  import { error } from '@sveltejs/kit';

  let { closeForm, fetchTask } = $props()

  let token = localStorage.getItem('token')
  let newTask = $state({
    title: '',
    description: '',
    deadline: '',
    priority: 'MEDIUM',
    status: 'PENDING',
  })
  let taskImg = $state([])

  async function handleSubmitNewTask(e) {
    e.preventDefault();
    try {
      if(!newTask.title || newTask.description || !newTask.deadline || !newTask.priority || !newTask.status)return alertError("Fields Required");
      const formData = new FormData();
      formData.append('title', newTask.title)
      formData.append('description', newTask.description)
      formData.append('deadline', newTask.deadline)
      formData.append('priority', newTask.priority)
      formData.append('status', newTask.status)
      taskImg.forEach((item, index) => {
        formData.append('taskImg', item)
      })
  
      const addTask = await submitTask(token, formData)
      const response = await addTask.json()
  
      if (addTask.status === 200) {
        alertSuccess(response.message)
        closeForm()
        await fetchTask()
      } else {
        alertError(error.message)
      }
      console.log(response)

    } catch (error) {
      
    }
  }
</script>

<div class="w-full min-h-screen z-10 fixed inset-0 flex justify-center items-center bg-black/80">
  <div class="w-50%">
    <h1 class="text-orange-500 text-xl font-bold text-center">Add ToDo</h1>
    <form action="" class="bg-neutral-900 border-2 border-orange-500 shadow-2xl rounded-md space-y-3 px-5 py-5">
      <div class="flex justify-end">
        <button onclick={() => closeForm()} class="px-3 py-2 bg-orange-900 rounded-md">Close</button>
      </div>
      <label for="title" class="font-semibold">Title:</label>
      <input type="text" name="title" id="title" bind:value={newTask.title} class="w-full border-2 border-orange-900 rounded-md py-2" placeholder="Masukan Title..." required>
      <label for="description" class="font-semibold">Description:</label>
      <input type="text" name="description" id="description" bind:value={newTask.description} class="w-full border-2 border-orange-900 rounded-md py-2" placeholder="Masukan Description..." required>
      <label for="taskImg" class="font-semibold">Task Image</label>
      <FileUpload
        name="taskImg"
        accept="image/*"
        maxFiles={3}
        subtext="Attach up to 3 files."
        onFileChange={({acceptedFiles}) => {
          taskImg = acceptedFiles;
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
      <input type="datetime-local" name="deadline" id="deadline" bind:value={newTask.deadline} class="w-full border-2 border-orange-900 rounded-md py-2" required>
      <label for="priority" class="block">Priority</label>
      <select name="priority" id="priority" bind:value={newTask.priority} required class="bg-black-900 rounded-md w-full py-2 rounde-md border-2 border-orange-900">
        <option selected value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>
      <label for="status" class="block">Status</label>
      <select name="status" id="status" bind:value={newTask.status} required class="bg-black-900 rounded-md w-full py-2 rounde-md border-2 border-orange-900">
        <option selected value="PENDING">Pending</option>
        <option value="INPROGRESS">In Progress</option>
        <option value="COMPLETED">Finish</option>
      </select>
      <button type="submit" onclick={handleSubmitNewTask} class="w-full bg-orange-700 py-2 rounded-md font-bold mt-2">Submit</button>
    </form>
  </div>
</div>