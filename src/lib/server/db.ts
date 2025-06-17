import Database from 'sqlite3';

const db = new Database.Database('flashsnap.db');

// Wrapper functions for database operations
export function dbRun(sql: string, params: any[] = []): Promise<any> {
	return new Promise((resolve, reject) => {
		db.run(sql, params, function(err) {
			if (err) reject(err);
			else resolve(this);
		});
	});
}

export function dbGet(sql: string, params: any[] = []): Promise<any> {
	return new Promise((resolve, reject) => {
		db.get(sql, params, (err, row) => {
			if (err) reject(err);
			else resolve(row);
		});
	});
}

export function dbAll(sql: string, params: any[] = []): Promise<any[]> {
	return new Promise((resolve, reject) => {
		db.all(sql, params, (err, rows) => {
			if (err) reject(err);
			else resolve(rows);
		});
	});
}

// Initialize database tables
export async function initializeDatabase() {
	await dbRun(`
		CREATE TABLE IF NOT EXISTS user (
			id TEXT PRIMARY KEY,
			github_id INTEGER UNIQUE NOT NULL,
			username TEXT NOT NULL,
			avatar_url TEXT,
			access_token TEXT NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`);

	await dbRun(`
		CREATE TABLE IF NOT EXISTS session (
			id TEXT PRIMARY KEY,
			expires_at INTEGER NOT NULL,
			user_id TEXT NOT NULL,
			FOREIGN KEY (user_id) REFERENCES user(id)
		)
	`);

	await dbRun(`
		CREATE TABLE IF NOT EXISTS flashcard_group (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			repo_owner TEXT NOT NULL,
			repo_name TEXT NOT NULL,
			discussion_number INTEGER NOT NULL,
			title TEXT NOT NULL,
			description TEXT,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES user(id),
			UNIQUE(repo_owner, repo_name, discussion_number)
		)
	`);
}

export { db }; 