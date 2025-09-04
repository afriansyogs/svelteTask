<script>
	import favicon from '$lib/assets/favicon.svg';
  import SideBar from '$lib/components/SideBar.svelte';

	let { children } = $props();
</script>

<div class="card border-surface-100-900 grid min-h-[100dvh] w-full grid-cols-[auto_1fr] border-[1px]">
	<SideBar />
	{@render children?.()}
</div>

