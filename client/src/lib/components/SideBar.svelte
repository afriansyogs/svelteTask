<script>
	// import { sidebarItems } from './../data/data.js';
  import { Navigation } from '@skeletonlabs/skeleton-svelte';
  import SwitchMode from './SwitchMode.svelte';
  // Icons
  import IconMenu from '@lucide/svelte/icons/menu';
  import IconSettings from '@lucide/svelte/icons/settings';
  import IconlistChecks from '@lucide/svelte/icons/list-checks';
  import IconCircleUserRound from '@lucide/svelte/icons/circle-user-round';
  import IconLogOut from '@lucide/svelte/icons/log-out';

  let isExpansed = $state(true);

  function toggleExpanded() {
    isExpansed = !isExpansed;
  }
</script>

<Navigation.Rail expanded={isExpansed}>
  {#snippet header()}
    <Navigation.Tile labelExpanded="Menu" onclick={toggleExpanded} title="Toggle Menu Width"><IconMenu /></Navigation.Tile>
    <!-- <SwitchMode/> -->
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
    <Navigation.Tile labelExpanded="Logout" href="/settings" title="Logout"><IconLogOut /></Navigation.Tile>
  {/snippet}
</Navigation.Rail>