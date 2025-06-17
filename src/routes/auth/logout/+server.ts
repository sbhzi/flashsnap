import { lucia } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, cookies }) => {
	if (!locals.session) {
		redirect(302, '/');
	}

	await lucia.invalidateSession(locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '/',
		...sessionCookie.attributes
	});

	redirect(302, '/');
}; 