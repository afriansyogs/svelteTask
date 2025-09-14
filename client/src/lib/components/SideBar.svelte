<script>
	// import { sidebarItems } from './../data/data.js';
  import { Navigation } from '@skeletonlabs/skeleton-svelte';
  import SwitchMode from './SwitchMode.svelte';
  // Icons
  import IconMenu from '@lucide/svelte/icons/menu';
  import IconFolder from '@lucide/svelte/icons/folder';
  import IconImage from '@lucide/svelte/icons/image';
  import IconMusic from '@lucide/svelte/icons/music';
  import IconVideo from '@lucide/svelte/icons/video';
  import IconGames from '@lucide/svelte/icons/gamepad';
  import IconSettings from '@lucide/svelte/icons/settings';

  let isExpansed = $state(true);

  function toggleExpanded() {
    isExpansed = !isExpansed;
  }
</script>

<Navigation.Rail expanded={isExpansed}>
  {#snippet header()}
    <Navigation.Tile labelExpanded="Menu" onclick={toggleExpanded} title="Toggle Menu Width"><IconMenu /></Navigation.Tile>
    <SwitchMode/>
  {/snippet}
  {#snippet tiles()}
    <Navigation.Tile labelExpanded="Browse Files" href="#/files">
      <IconFolder />
    </Navigation.Tile>
    <Navigation.Tile labelExpanded="Browse Images" href="#/images">
      <IconImage />
    </Navigation.Tile>
    <Navigation.Tile labelExpanded="Browse Music" href="#/music">
      <IconMusic />
    </Navigation.Tile>
    <Navigation.Tile labelExpanded="Browse Videos" href="#/videos">
      <IconVideo />
    </Navigation.Tile>
    <Navigation.Tile labelExpanded="Browse Games" href="/games">
      <IconGames />
    </Navigation.Tile>
    <!-- {#each sidebarItems as item (item.name)}
      <Navigation.Tile labelExpanded={item.label} href={item.href}>
        <svelte:component this={item.icon} />
      </Navigation.Tile>
    {/each} -->
  {/snippet}
  {#snippet footer()}
    <Navigation.Tile labelExpanded="Settings" href="/settings" title="Settings"><IconSettings /></Navigation.Tile>
  {/snippet}
</Navigation.Rail>