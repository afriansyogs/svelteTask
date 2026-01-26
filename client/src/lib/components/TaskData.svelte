<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { token } from '$lib/state/token.svelte';
	import ButtonAction from './ButtonAction.svelte';
	import { fly } from 'svelte/transition';
  import IconSquarePen from '@lucide/svelte/icons/square-pen';
  import IconEye from '@lucide/svelte/icons/eye';
  import IconTrash2 from '@lucide/svelte/icons/trash-2';
  import { formatDateTimeLocal } from '$lib/utils/FormatDateTime';
  import { draggable, droppable } from '@thisux/sveltednd';
  import { alertError, alertSuccess } from '@/lib/alert';
  import { updatedStatus } from '$lib/api/TaskApi';
  import { flip } from 'svelte/animate';
  import type { DropEvent } from '../types/type';
  
  let { dataTask, handleDelete, fetchTask } = $props()

  // token.token = localStorage.getItem('token')

  async function handleDrop({sourceContainer, targetContainer, draggedItem} : DropEvent ) {
    console.log(`drag task ${draggedItem}`)
    console.log(`sc task ${sourceContainer}`)
    console.log(`trgt task ${targetContainer}`)
    try {
      if (sourceContainer != targetContainer) {
        const newStatus = await updatedStatus(draggedItem.id, targetContainer)
        const response = await newStatus.json()

        if (newStatus.status == 200) {
          await alertSuccess(response.message)
          await fetchTask()
        } else {
          await alertError(response.error)
        }
      }
    } catch (error) {
      if(error instanceof Error) return await alertError(error.message)
    }
  }

  console.log(`nih data nih ${dataTask}`)
</script>

<div class="w-[95%] mx-auto mt-3 md:mt-8 rounded-lg">
  <div transition:fly={{ y:20 }} class="flex flex-col md:flex-row gap-6 items-start">
    <!-- Pending -->
    <div class="flex-1 bg-[#2a2a2a] p-5 rounded-lg shadow-md border-l-4 border-red-500">
      <h2 class="text-xl font-bold text-red-400 mb-4">⏳ Pending</h2>
      <div use:droppable={{ container:"PENDING", callbacks: {onDrop: handleDrop} }} class="min-h-60">
        {#each dataTask.filter(task => task.status === 'PENDING') as task (task.id)}
          <div animate:flip={{ duration:300 }} class="bg-[#333] rounded-lg hover:bg-[#444] transition-all duration-300">
            <div use:draggable={{ container:"PENDING", dragData: task }} class="p-4 mb-4">
              {#if task.taskImg && task.taskImg.filter(img => img.trim() !== "").length > 0}
                <img src="http://localhost:3000/{task.taskImg[0]}" alt={task.title} class="w-full max-h-48 rounded-md object-cover">
              {/if}
              <h3 class="font-semibold text-lg text-white">{task.title || 'Tanpa Judul'}</h3>
              <p class="text-sm text-gray-300">{task.description}</p>
              <p class="text-xs text-gray-500 mt-2">{formatDateTimeLocal(task.deadline)}</p>
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
            </div>
            <ButtonAction id={task.id} onDelete={handleDelete}/>
          </div>
        {/each}
      </div>
    </div>

    <!-- In Progress -->
    <div class="flex-1 bg-[#2a2a2a] p-5 rounded-lg shadow-md border-l-4 border-yellow-500">
      <h2 class="text-xl font-bold text-yellow-400 mb-4">🚧 In Progress</h2>
      <div use:droppable={{ container:"INPROGRESS", callbacks: {onDrop: handleDrop} }} class="min-h-60">
        {#each dataTask.filter(task => task.status === 'INPROGRESS') as task (task.id)}
          <div animate:flip={{ duration:300 }} class="bg-[#333] rounded-lg hover:bg-[#444] transition-all duration-300">
            <div use:draggable={{ container:"INPROGRESS", dragData: task }} class=" p-4 mb-4">
              {#if task.taskImg && task.taskImg.filter(img => img.trim() !== "").length > 0}
                <img src={`http://localhost:3000/${task.taskImg[0]}`} alt={task.title} class="w-full max-h-48 rounded-md object-cover">
              {/if}
              <h3 class="font-semibold text-lg text-white">{task.title}</h3>
              <p class="text-sm text-gray-300">{task.description}</p>
              <p class="text-xs text-gray-500 mt-2">{formatDateTimeLocal(task.deadline)}</p>
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
            </div>
            <ButtonAction id={task.id} onDelete={handleDelete}/>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Completed -->
    <div class="flex-1 bg-[#2a2a2a] p-5 rounded-lg shadow-md border-l-4 border-green-500">
      <h2 class="text-xl font-bold text-green-400 mb-4">✅ Completed</h2>
      <div use:droppable={{ container:"COMPLETED", callbacks: {onDrop: handleDrop} }} class="min-h-60">
        {#each dataTask.filter(task => task.status === 'COMPLETED') as task (task.id)}
          <div animate:flip={{ duration:300 }} class="bg-[#333] rounded-lg hover:bg-[#444] transition-all duration-300">
            <div use:draggable={{ container:"COMPLETED", dragData: task }} class="p-4">
              {#if task.taskImg && task.taskImg.filter(img => img.trim() !== "").length > 0}
                <img src={`http://localhost:3000/${task.taskImg[0]}`} alt={task.title} class="w-full max-h-48 rounded-md object-cover">
              {/if}
              <h3 class="font-semibold text-lg text-white">{task.title}</h3>
              <p class="text-sm text-gray-300">{task.description}</p>
              <p class="text-xs text-gray-500 mt-2">{formatDateTimeLocal(task.deadline)}</p>
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
            </div>
            <ButtonAction id={task.id} onDelete={handleDelete}/>
          </div>  
        {/each}
      </div>
    </div>
  </div>
</div>

