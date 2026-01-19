<script lang="ts">
	import { token } from '$lib/state/token.svelte';
	import { fade } from 'svelte/transition';
  import { FileUpload } from '@skeletonlabs/skeleton-svelte';
  // Icons
  import IconDropzone from '@lucide/svelte/icons/image-plus';
  import IconFile from '@lucide/svelte/icons/paperclip';
  import IconRemove from '@lucide/svelte/icons/circle-x';
  import { submitTask } from '$lib/api/TaskApi';
  import { alertError, alertSuccess } from '@/lib/alert';
  import { error } from '@sveltejs/kit';
  import { goto } from '$app/navigation';
  import { updateUserData } from '$lib/api/UserApi';

  let { closeFormEdit, fetchUser, username, email, userImg } = $props()
  token.token = localStorage.getItem('token')

  async function handleUpdateUser(e : Event) {
    e.preventDefault();
    try {
      if(!username || !email)return alertError("Fields Required");
      let formData = new FormData();
      formData.append('username', username)
      formData.append('email', email)
      formData.append('userImg', userImg[0])

      const updateUser = await updateUserData(token.token!, formData)
      const response = await updateUser.json()
  
      if (updateUser.status === 200) {
        alertSuccess(response.message)
        closeFormEdit()
        await fetchUser()
        goto('/user')
      } else {
        if(error instanceof Error) alertError(error.message)
      }
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
</script>

<div class="w-full min-h-screen z-10 fixed inset-0 flex justify-center items-center bg-black/80">
  <div transition:fade class="w-50%">
    <h1 class="text-orange-500 text-xl font-bold text-center">Add ToDo</h1>
    <form action="" class="bg-neutral-900 border-2 border-orange-500 shadow-2xl rounded-md space-y-3 px-5 py-5">
      <div class="flex justify-end">
        <button onclick={() => closeFormEdit()} class="px-3 py-2 bg-orange-900 rounded-md">Close</button>
      </div>
      <label for="username" class="font-semibold">Username:</label>
      <input type="text" name="username" id="username" bind:value={username} class="w-full border-2 border-orange-900 rounded-md py-2" placeholder="Masukan Username..." required>
      <label for="email" class="font-semibold">Email:</label>
      <input type="text" name="email" id="email" bind:value={email} class="w-full border-2 border-orange-900 rounded-md py-2" placeholder="Masukan Email..." required>
      <label for="userImg" class="font-semibold">Profile Image</label>
      <FileUpload
        name="userImg"
        accept="image/*"
        maxFiles={3}
        subtext="Attach up to 3 files."
        onFileChange={({acceptedFiles}) => {
          userImg = acceptedFiles;
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
      <button type="submit" onclick={handleUpdateUser} class="w-full bg-orange-700 py-2 rounded-md font-bold mt-2">Submit</button>
    </form>
  </div>
</div>