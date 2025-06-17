import { Lucia } from 'lucia';
import { BunSQLiteAdapter } from '@lucia-auth/adapter-sqlite';
import { GitHub } from 'arctic';
import { dev } from '$app/environment';
import { db } from './db.js';

const adapter = new BunSQLiteAdapter(db, {
	user: 'user',
	session: 'session'
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			githubId: attributes.github_id,
			username: attributes.username,
			avatarUrl: attributes.avatar_url
		};
	}
});

export const github = new GitHub(
	process.env.GITHUB_CLIENT_ID!,
	process.env.GITHUB_CLIENT_SECRET!,
	'http://localhost:5173/auth/github/callback'
);

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			github_id: number;
			username: string;
			avatar_url: string;
		};
	}
} 