<script>
  import IconSquarePen from '@lucide/svelte/icons/square-pen';
  import IconEye from '@lucide/svelte/icons/eye';
  
  let { dataTask } = $props()
  console.log(`nih data nih ${dataTask}`)
</script>

<div class="w-[95%] mx-auto mt-10 rounded-lg">
  <div class="flex flex-col md:flex-row gap-6 items-start">
    <!-- Pending -->
    <div class="flex-1 bg-[#2a2a2a] p-5 rounded-lg shadow-md border-l-4 border-red-500">
      <h2 class="text-xl font-bold text-red-400 mb-4">⏳ Pending</h2>
        {#each dataTask.filter(task => task.status === 'PENDING') as task (task.id)}
          <div class="bg-[#333] p-4 rounded-lg shadow mb-4 hover:bg-[#444] transition-all duration-300">
            {#if task.taskImg}
              <img src={`http://localhost:3000/${task.taskImg[0]}`} alt={task.title} class="w-full max-h-48 rounded-md object-cover">
            {/if}
            <h3 class="font-semibold text-lg text-white">{task.title || 'Tanpa Judul'}</h3>
            <p class="text-sm text-gray-300">{task.description}</p>
            <p class="text-xs text-gray-500 mt-2">{task.deadline}</p>
            <span class={`text-xs px-2 py-1 rounded inline-block text-white mt-2 ${
                task.priority === 'LOW'
                  ? 'bg-cyan-700'
                  : task.priority === 'MEDIUM'
                  ? 'bg-amber-600'
                  : 'bg-red-700'
              }`}
            >
              {task.priority}
            </span>
            <div class="flex justify-end space-x-3 mt-4">
              <button class="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition shadow">
                <IconEye />
              </button>
              <button class="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-600 transition shadow">
                <IconSquarePen />
              </button>
            </div>
          </div>
        {/each}
    </div>
    <!-- In Progress -->
    <div class="flex-1 bg-[#2a2a2a] p-5 rounded-lg shadow-md border-l-4 border-yellow-500">
      <h2 class="text-xl font-bold text-yellow-400 mb-4">🚧 In Progress</h2>
        {#each dataTask.filter(task => task.status === 'INPROGRESS') as task (task.id)}
          <div class="bg-[#333] p-4 rounded-lg shadow mb-4 hover:bg-[#444] transition-all duration-300">
            {#if task.taskImg}
              <img src={`http://localhost:3000/${task.taskImg[0]}`} alt={task.title} class="w-full max-h-48 rounded-md object-cover">
            {/if}
            <h3 class="font-semibold text-lg text-white">{task.title}</h3>
            <p class="text-sm text-gray-300">{task.description}</p>
            <p class="text-xs text-gray-500 mt-2">{task.deadline}</p>
            <span class={`text-xs px-2 py-1 rounded inline-block text-white mt-2 ${
                task.priority === 'LOW'
                  ? 'bg-cyan-700'
                  : task.priority === 'MEDIUM'
                  ? 'bg-amber-600'
                  : 'bg-red-700'
              }`}
            >
              {task.priority}
            </span>
            <div class="flex justify-end space-x-3 mt-4">
              <button class="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition shadow">
                <IconEye />
              </button>
              <button class="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-600 transition shadow">
                <IconSquarePen />
              </button>
            </div>
          </div>
        {/each}
    </div>
    <!-- Completed -->
    <div class="flex-1 bg-[#2a2a2a] p-5 rounded-lg shadow-md border-l-4 border-green-500">
      <h2 class="text-xl font-bold text-green-400 mb-4">✅ Completed</h2>
        {#each dataTask.filter(task => task.status === 'COMPLETED') as task (task.id)}
          <div class="bg-[#333] p-4 rounded-lg shadow mb-4 hover:bg-[#444] transition-all duration-300">
            {#if task.taskImg}
              <img src={`http://localhost:3000/${task.taskImg[0]}`} alt={task.title} class="w-full max-h-48 rounded-md object-cover">
            {/if}
            <h3 class="font-semibold text-lg text-white">{task.title}</h3>
            <p class="text-sm text-gray-300">{task.description}</p>
            <p class="text-xs text-gray-500 mt-2">{task.deadline}</p>
            <span class={`text-xs px-2 py-1 rounded inline-block text-white mt-2 ${
                task.priority === 'LOW'
                  ? 'bg-cyan-700'
                  : task.priority === 'MEDIUM'
                  ? 'bg-amber-600'
                  : 'bg-red-700'
              }`}
            >
              {task.priority}
            </span>
            <div class="flex justify-end space-x-3 mt-4">
              <button class="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition shadow">
                <IconEye />
              </button>
              <button class="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-600 transition shadow">
                <IconSquarePen />
              </button>
            </div>
          </div>
        {/each}
    </div>
  </div>
</div>

