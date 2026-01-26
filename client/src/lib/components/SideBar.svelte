<script lang="ts">
	// import { sidebarItems } from './../data/data.js';
  import { Navigation } from '@skeletonlabs/skeleton-svelte';
  import SwitchMode from './SwitchMode.svelte';
  // Icons
  import IconMenu from '@lucide/svelte/icons/menu';
  import IconSettings from '@lucide/svelte/icons/settings';
  import IconlistChecks from '@lucide/svelte/icons/list-checks';
  import IconCircleUserRound from '@lucide/svelte/icons/circle-user-round';
  import IconLogOut from '@lucide/svelte/icons/log-out';
  import { goto } from '$app/navigation';

  let isExpansed = $state<boolean>(true);
  let theme = $state<boolean>(false)
  $inspect(theme)

  function toggleExpanded() {
    isExpansed = !isExpansed;
  }
  
  function toggleTheme() {
    theme = !theme;
  }

  async function handleLogOut() {
    const logout = await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include'
    })
    if(logout.status === 200) goto('/login')
  }

  $effect(() => {
    localStorage.setItem('theme', theme ? "light" : "dark");
  });

</script>

<Navigation.Rail expanded={isExpansed}>
  {#snippet header()}
    <Navigation.Tile labelExpanded="Menu" onclick={toggleExpanded} title="Toggle Menu Width"><IconMenu /></Navigation.Tile>
    <button type="button" onclick={toggleTheme}>
      <SwitchMode/>
    </button>
  {/snippet}
  {#snippet tiles()}
    <Navigation.Tile labelExpanded="Task" href="/">
      <IconlistChecks />
    </Navigation.Tile>
    <Navigation.Tile labelExpanded="Profile" href="/user">
      <IconCircleUserRound />
    </Navigation.Tile>
    <!-- {#each sidebarItems as item (item.name)}
      <Navigation.Tile labelExpanded={item.label} href={item.href}>
        <svelte:component this={item.icon} />
      </Navigation.Tile>
    {/each} -->
  {/snippet}
  {#snippet footer()}
    <Navigation.Tile labelExpanded="Logout" title="Logout" onclick={handleLogOut}><IconLogOut /></Navigation.Tile>
  {/snippet}
</Navigation.Rail>