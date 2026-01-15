<script>
  import IconSquarePen from '@lucide/svelte/icons/square-pen';
  import IconEye from '@lucide/svelte/icons/eye';
  import IconTrash2 from '@lucide/svelte/icons/trash-2';

  let {id, onDelete} = $props();
</script>

<div class="flex justify-end space-x-3 my-4 pb-4 pe-2">
  <a href="/{id}" class="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition shadow">
    <IconEye />
  </a>
  <a href="/{id}/edit" class="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700 transition shadow">
    <IconSquarePen />
  </a>
  <button onclick={(e) => onDelete(e, id)} class="px-4 py-2 rounded-md bg-red-700 text-white hover:bg-red-800 transition shadow">
    <IconTrash2 />
  </button>
</div>