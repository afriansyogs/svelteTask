<script lang="ts">
	import FormEditUserData from './../../../lib/components/FormEditUserData.svelte';
  import { getUserData } from "$lib/api/UserApi";
  import { onMount } from "svelte";
  import { Avatar } from "@skeletonlabs/skeleton-svelte/composed";
  import IconLogOut from '@lucide/svelte/icons/log-out';
  import IconUserRoundPen from '@lucide/svelte/icons/user-round-pen';
  import { goto } from '$app/navigation';
  import { token } from '$lib/state/token.svelte';
  import type { User } from '$lib/types/type';
  import { alertError } from '@/lib/alert';

  // let token = localStorage.getItem("token");
  token.token = localStorage.getItem("token");
  let userData = $state<User>();
  let errorMessage = $state<string>("");
  let formEdit = $state<boolean>(false)

  function handleFormEdit() {
    formEdit = !formEdit
  }

  async function fetchUser() {
    try {
      const fetchUserData = await getUserData(token.token!);
      if (fetchUserData.status === 401) {
        await goto('/login')
        return
      }
      
      const response = await fetchUserData.json();
      userData = response.data;
    } catch (error) {
      if(error instanceof Error){ 
      await alertError(error.message)
      errorMessage = error.message;
        return
      }
    }
  }

  onMount(async () => {
    await fetchUser();
  });
</script>
<div class="w-95% mx-auto">
  <h1 class="text-4xl font-bold text-center mt-10">Profile</h1>
  <Avatar class="w-48 h-48 border-2 border-orange-600 rounded-full mt-12 mx-auto">
    {#if userData?.userImg}
      <Avatar.Image src={`http://localhost:3000/${userData.userImg}`} class="w-full h-full object-cover"/>
    {:else}
      <Avatar.Fallback class="text-xl font-bold bg-neutral-700 text-white">SK</Avatar.Fallback>
    {/if}
  </Avatar>
  <div class="mt-14 w-[30%] mx-auto space-y-5">
    <div class="">
      <h1 class="font-bold text-lg">Username:</h1>
      <h1 class="bg-neutral-900 rounded-md py-2 ps-2">{userData?.username}</h1>
    </div>
    <div class="">
      <h1 class="font-bold text-lg">Email:</h1>
      <h1 class="bg-neutral-900 rounded-md py-2 ps-2">{userData?.email}</h1>
    </div>
    <div class="flex justify-end mt-12">
      <button onclick={handleFormEdit} class="bg-orange-600 hover:bg-orange-700 px-4 py-3 rounded-md">
        <IconUserRoundPen />
      </button>
    </div>
  </div>
</div>
{#if formEdit}
  <FormEditUserData closeFormEdit={handleFormEdit} fetchUser={fetchUser} {...userData}/>
{/if}
