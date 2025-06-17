import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { github, lucia } from '$lib/server/auth.js';
import { dbGet, dbRun } from '$lib/server/db.js';

import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const storedState = cookies.get('github_oauth_state') ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		const existingUser = await dbGet('SELECT * FROM user WHERE github_id = ?', [githubUser.id]);

		if (existingUser) {
			// Update access token
			await dbRun('UPDATE user SET access_token = ? WHERE id = ?', [tokens.accessToken, existingUser.id]);
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '/',
				...sessionCookie.attributes
			});
		} else {
			// Create new user
			const userId = generateId(15);
			await dbRun(
				'INSERT INTO user (id, github_id, username, avatar_url, access_token) VALUES (?, ?, ?, ?, ?)',
				[userId, githubUser.id, githubUser.login, githubUser.avatar_url, tokens.accessToken]
			);
			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '/',
				...sessionCookie.attributes
			});
		}

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		if (e instanceof OAuth2RequestError && e.message === 'bad_verification_code') {
			// Invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
};

interface GitHubUser {
	id: number;
	login: string;
	avatar_url: string;
} 