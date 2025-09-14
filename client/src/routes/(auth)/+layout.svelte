<script>
	import SwitchMode from './../../lib/components/SwitchMode.svelte';
  const {children} = $props();
</script>

<div class="min-h-screen flex items-center justify-center">
  {@render children?.()}
</div>