<script>
  import { getUserData } from "$lib/api/UserApi";
  import { onMount } from "svelte";
  import { Avatar } from "@skeletonlabs/skeleton-svelte/composed";
  import IconUserRoundPen from '@lucide/svelte/icons/user-round-pen';
  import IconLogOut from '@lucide/svelte/icons/log-out';

  let token = localStorage.getItem("token");
  let userData = $state();
  let errorMessage = $state("");

  async function fetchUser() {
    try {
      const fetchUserData = await getUserData(token);
      const response = await fetchUserData.json();
      userData = response.userData;
    } catch (error) {
      console.log(error.message);
      errorMessage = error;
    }
  }

  onMount(async () => {
    await fetchUser();
  });
</script>
<div class="min-h-[100dvh] w-full flex items-center justify-center">
  <div class="w-2/4 mx-4 sm:mx-auto bg-black/45 pb-10 shadow-xl rounded-2xl overflow-hidden text-white">
    <div class="h-32 bg-gradient-to-r from-orange-600 to-yellow-500"></div>
    <div class="relative flex justify-center -mt-10">
      <Avatar class="w-24 h-24 border-4 border-black rounded-full">
        {#if userData?.userImg}
          <Avatar.Image src={`http://localhost:3000/${userData.userImg}`} class="w-24 h-24 rounded-full object-cover"/>
        {:else}
          <Avatar.Fallback class="text-xl font-bold bg-neutral-700 text-white">SK</Avatar.Fallback>
        {/if}
      </Avatar>
    </div>
    <div class="px-6 pt-2 pb-8 text-center space-y-4">
        <p class="text-2xl font-semibold">{userData?.username}</p>
        <p class="text-md text-gray-400">{userData?.email}</p>
    </div>
    <div class="mx-2 border-t-2 border-gray-400">
      <div class="flex justify-end space-x-3 mt-5">
        <button class="px-3 py-2 rounded-md bg-orange-600 flex">
          <IconUserRoundPen />
          Edit
        </button>
      </div>
    </div>
  </div>
</div>
