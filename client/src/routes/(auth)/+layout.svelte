<script>
	import SwitchMode from './../../lib/components/SwitchMode.svelte';
  const {children} = $props();
</script>

<div class="">
  <h1>halo</h1>
  <SwitchMode />
  {@render children?.()}
</div>