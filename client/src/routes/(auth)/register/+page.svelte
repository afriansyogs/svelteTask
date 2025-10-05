<script>
  import { goto } from "$app/navigation";
  import { alertError, alertSuccess } from "$lib/alert";
  import { userRegister } from "$lib/api/AuthApi";
  // icon 
  import IconEye from '@lucide/svelte/icons/eye';
  import IconEyeOff from '@lucide/svelte/icons/eye-off';

  let newUser = $state({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })
  let showPassword = $state(false)
  let showPasswordConfirm = $state(false)

  async function handleSubmit(e) {
    e.preventDefault();
    if (newUser.password !== newUser.passwordConfirm) {
      alertError("Password tidak sama")
      return
    }
    
    const response = await userRegister(newUser);
    const responseData = await response.json();
    console.log(responseData);

    if (response.status === 200) {
      await alertSuccess(responseData.message);
      goto('/login');
    } else {
      await alertError(responseData.error);
    }
  }
</script>

  <div class="w-full lg:w-[30%] bg-neutral-900 rounded-lg shadow-lg p-8">
    <h2 class="text-3xl font-extrabold text-center text-orange-600 mb-6">Buat Akun</h2>
    <form onsubmit={handleSubmit} class="space-y-5">
      <div>
        <label for="username" class="block text-sm font-medium text-white">Username</label>
        <input type="text" id="username" name="username" bind:value={newUser.username} placeholder="Masukkan username..."
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" required>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-white">Email</label>
        <input type="email" id="email" name="email" bind:value={newUser.email} placeholder="Masukkan email..."
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" required>
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-white">Password</label>
        <div class="flex items-center mt-1 pe-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-orange-500 focus-within:border-orange-500">
          <input type={showPassword ? 'text' : 'password'} id="password" name="password" bind:value={newUser.password} placeholder="Masukkan password..."
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
      <div>
        <label for="passwordConfirm" class="block text-sm font-medium text-white">Konfirmasi Password</label>
        <div class="flex items-center mt-1 pe-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-orange-500 focus-within:border-orange-500">
          <input type={showPasswordConfirm ? 'text' : 'password'} id="password" name="password" bind:value={newUser.passwordConfirm} placeholder="Ulangi password..."
            class="mt-1  w-full px-4 py-2 outline-none bg-transparent" required>
          <button type="button" onclick={() => showPasswordConfirm = !showPasswordConfirm} class="">
            {#if showPasswordConfirm}
              <IconEye />
            {:else}
              <IconEyeOff />
            {/if}
          </button>
        </div>
      </div>
      <button type="submit" class="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-200">
        Daftar
      </button>
    </form>
    <p class="mt-6 text-center text-sm text-gray-600">
      Sudah punya akun?
      <a href="/login" class="text-orange-600 hover:underline">Login!</a>
    </p>
  </div>