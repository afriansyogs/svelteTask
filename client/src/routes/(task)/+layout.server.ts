import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, fetch, url }) => {
	if (url.pathname === '/favicon.ico') return {};
	
	const token = cookies.get('token');

	if(!token) throw redirect(302, '/login');
	
	let res;
  try {
    res = await fetch('http://backend:3000/profile/getUsername', {
      method: 'GET',
      headers: { cookie: `token=${token}` }
    });
  } catch (err) {
    console.error('Fetch backend failed:', err);
    throw redirect(302, '/login');
  }

  if (!res.ok) throw redirect(302, '/login');

	const user = await res.json()

	return {user};
}) satisfies LayoutServerLoad;