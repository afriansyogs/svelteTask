import IconMenu from '@lucide/svelte/icons/menu';
import IconFolder from '@lucide/svelte/icons/folder';
import IconImage from '@lucide/svelte/icons/image';
import IconMusic from '@lucide/svelte/icons/music';
import IconVideo from '@lucide/svelte/icons/video';
import IconGames from '@lucide/svelte/icons/gamepad';
import IconSettings from '@lucide/svelte/icons/settings';

export const sidebarItems = [
  { name: 'folder', label: 'Browse Files', href: '#/files', icon: IconFolder },
  { name: 'image', label: 'Browse Images', href: '#/images', icon: IconImage },
  { name: 'music', label: 'Browse Music', href: '#/music', icon: IconMusic },
  { name: 'vidio', label: 'Browse Videos', href: '#/videos', icon: IconVideo },
  { name: 'games', label: 'Browse Games', href: '/games', icon: IconGames },
  { name: 'settings', label: 'Settings', href: '/settings', icon: IconSettings }
];
