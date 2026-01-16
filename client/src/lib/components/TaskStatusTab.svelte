<script lang="ts">
  import type { StatusStyle } from "../types/type";

  let status = $state<string>("PENDING");

  const statusStyle : StatusStyle = {
    PENDING: 'text-red-500 border-red-300',
    INPROGRESS: 'text-yellow-500 border-yellow-300',
    COMPLETED: 'text-green-500 border-green-300'
  };
</script>

<select bind:value={status} name="" id="" class={`rounded-md border-2 px-3 py-1 font-medium transition ${statusStyle[status]}`}>
  <option value="PENDING" class="text-red-500">PENDING</option>
  <option value="INPROGRESS" class="text-yellow-500">INPROGRESS</option>
  <option value="COMPLETED" class="text-green-500">COMPLETED</option>
</select>