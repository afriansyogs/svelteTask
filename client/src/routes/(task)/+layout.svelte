<script>
  import SideBar from '$lib/components/SideBar.svelte';

	let { children } = $props();
</script>

<div class="card border-surface-100-900 grid min-h-[100dvh] w-full grid-cols-[auto_1fr] border-[1px]">
	<div class="sticky top-0 overflow-y-auto h-[100dvh]">
		<SideBar />
	</div>
	<div class="overflow-y-auto">
		{@render children?.()}
	</div>
</div>