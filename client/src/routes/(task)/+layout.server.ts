import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, fetch, url }) => {
	if (url.pathname === '/favicon.ico') return {};
	
	const token = cookies.get('token');

	if(!token) throw redirect(302, '/login');

  try {
    const userReq = await fetch('http://backend:3000/profile/getUsername', {
      method: 'GET',
      headers: { cookie: `token=${token}` }
    });

    const taskReq = fetch('http://backend:3000/', {
      method: 'GET',
      headers: { cookie: `token=${token}` }
    });

    const [userRes, taskRes] = await Promise.all([userReq, taskReq]);

    if (!userRes.ok || !taskRes.ok) {
      if (userRes.status === 401 || taskRes.status === 401) {
        throw redirect(302, '/login');
      }
    }

    const userData = await userRes.json();
    const taskData = await taskRes.json();

    return {
      user: userData,
      tasks: taskData
    };
  } catch (err) {
    console.error('Fetch backend failed:', err);
    throw redirect(302, '/login');
  }
}) satisfies LayoutServerLoad;