import { Octokit } from '@octokit/rest';

export class GitHubService {
	private octokit: Octokit;

	constructor(accessToken: string) {
		this.octokit = new Octokit({
			auth: accessToken,
		});
	}

	// Get user's repositories
	async getUserRepos() {
		const response = await this.octokit.repos.listForAuthenticatedUser({
			sort: 'updated',
			per_page: 100,
		});
		return response.data;
	}

	// Create a new discussion (flashcard group)
	async createDiscussion(owner: string, repo: string, title: string, body: string) {
		const response = await this.octokit.discussions.create({
			owner,
			repo,
			title,
			body,
			category_id: await this.getGeneralCategoryId(owner, repo),
		});
		return response.data;
	}

	// Get discussions from a repository
	async getDiscussions(owner: string, repo: string) {
		const response = await this.octokit.discussions.list({
			owner,
			repo,
		});
		return response.data;
	}

	// Get a specific discussion
	async getDiscussion(owner: string, repo: string, discussionNumber: number) {
		const response = await this.octokit.discussions.get({
			owner,
			repo,
			discussion_number: discussionNumber,
		});
		return response.data;
	}

	// Get comments from a discussion (flashcards)
	async getDiscussionComments(owner: string, repo: string, discussionNumber: number) {
		const response = await this.octokit.discussions.listComments({
			owner,
			repo,
			discussion_number: discussionNumber,
		});
		return response.data;
	}

	// Add a comment to a discussion (new flashcard)
	async addDiscussionComment(
		owner: string,
		repo: string,
		discussionNumber: number,
		body: string
	) {
		const response = await this.octokit.discussions.createComment({
			owner,
			repo,
			discussion_number: discussionNumber,
			body,
		});
		return response.data;
	}

	// Update a discussion comment (flashcard)
	async updateDiscussionComment(
		owner: string,
		repo: string,
		commentId: number,
		body: string
	) {
		const response = await this.octokit.discussions.updateComment({
			owner,
			repo,
			comment_id: commentId,
			body,
		});
		return response.data;
	}

	// Delete a discussion comment (flashcard)
	async deleteDiscussionComment(owner: string, repo: string, commentId: number) {
		await this.octokit.discussions.deleteComment({
			owner,
			repo,
			comment_id: commentId,
		});
	}

	// Get the general category ID for discussions
	private async getGeneralCategoryId(owner: string, repo: string): Promise<string> {
		const response = await this.octokit.discussions.listCategories({
			owner,
			repo,
		});
		
		// Find the general category or use the first available one
		const generalCategory = response.data.find(
			(category) => category.slug === 'general' || category.name.toLowerCase().includes('general')
		);
		
		return generalCategory?.id || response.data[0]?.id || '';
	}

	// Check if discussions are enabled for a repository
	async areDiscussionsEnabled(owner: string, repo: string): Promise<boolean> {
		try {
			await this.octokit.discussions.listCategories({
				owner,
				repo,
			});
			return true;
		} catch (error) {
			return false;
		}
	}
} 