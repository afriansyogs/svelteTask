<script lang="ts">
  import { goto } from "$app/navigation";
  import { alertError, alertSuccess } from "$lib/alert";
  import { userLogin } from "$lib/api/AuthApi";
  import type { Login } from "$lib/types/type";
  // icon 
  import IconEye from '@lucide/svelte/icons/eye';
  import IconEyeOff from '@lucide/svelte/icons/eye-off';


  let user = $state(<Login>{
    email: '',
    password: ''
  })
  let showPassword = $state<boolean>(false)
  $inspect(showPassword)

  async function handleSubmit(e : Event) {
    e.preventDefault();
    if(!user.email || !user.password) return alertError("fields required");

    const loginUser = await userLogin(user);
    const response = await loginUser.json()

    if (loginUser.status === 200) {
      alertSuccess(response.message)
      localStorage.setItem('token', response.token)
      goto('/')
    } else {
      alertError(response.error)
    }
  }
</script>

<div class="w-full lg:w-[30%] bg-neutral-900 rounded-lg shadow-lg p-8">
  <h2 class="text-3xl font-extrabold text-center text-orange-600 mb-6">Login</h2>
  <form onsubmit={handleSubmit} class="space-y-5">
    <div>
      <label for="email" class="block text-sm font-medium text-white">Email</label>
        <input type="email" id="email" name="email" bind:value={user.email} placeholder="Masukkan email..."
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" required>
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-white">Password</label>
      <div class="flex items-center mt-1 pe-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-orange-500 focus-within:border-orange-500">
        <input type={showPassword ? 'text' : 'password'} id="password" name="password" bind:value={user.password} placeholder="Masukkan password..."
          class="mt-1  w-full px-4 py-2 outline-none bg-transparent" required>
        <button type="button" onclick={() => showPassword = !showPassword} class="">
          {#if showPassword}
            <IconEye />
          {:else}
            <IconEyeOff />
          {/if}
        </button>
      </div>
    </div>
    <button type="submit" class="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-200">
      Login
    </button>
    <p class="mt-6 text-center text-sm text-gray-600">
      Belum punya akun?
      <a href="/register" class="text-orange-600 hover:underline">Sign Up!</a>
    </p>
  </form>
</div>