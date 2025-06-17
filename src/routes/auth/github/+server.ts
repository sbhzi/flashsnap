import { redirect } from '@sveltejs/kit';
import { generateState } from 'arctic';
import { github } from '$lib/server/auth.js';

import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const state = generateState();
	const url = github.createAuthorizationURL(state, ['user:email', 'repo']);

	cookies.set('github_oauth_state', state, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	redirect(302, url.toString());
}; 