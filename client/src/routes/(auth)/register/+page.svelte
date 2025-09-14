<script>
  import { goto } from "$app/navigation";
  import { alertError, alertSuccess } from "$lib/alert";
  import { userRegister } from "$lib/api/AuthApi";

  let newUser = $state({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

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

  <div class="w-full lg:w-[30%] bg-gray-900 rounded-lg shadow-lg p-8">
    <h2 class="text-3xl font-bold text-center text-blue-600 mb-6">Buat Akun</h2>
    <form onsubmit={handleSubmit} class="space-y-5">
      <div>
        <label for="username" class="block text-sm font-medium text-white">Username</label>
        <input type="text" id="username" name="username" bind:value={newUser.username} placeholder="Masukkan username..."
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-white">Email</label>
        <input type="email" id="email" name="email" bind:value={newUser.email} placeholder="Masukkan email..."
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required>
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-white">Password</label>
        <input type="password" id="password" name="password" bind:value={newUser.password} placeholder="Masukkan password..."
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required>
      </div>
      <div>
        <label for="passwordConfirm" class="block text-sm font-medium text-white">Konfirmasi Password</label>
        <input type="password" id="passwordConfirm" name="passwordConfirm" bind:value={newUser.passwordConfirm} placeholder="Ulangi password..."
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required>
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
        Daftar
      </button>
    </form>
    <p class="mt-6 text-center text-sm text-gray-600">
      Sudah punya akun?
      <a href="/login" class="text-blue-600 hover:underline">Login!</a>
    </p>
  </div>