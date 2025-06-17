<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<nav class="bg-white shadow-sm border-b">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex items-center">
					<a href="/" class="text-xl font-bold text-gray-900">FlashSnap</a>
				</div>
				<div class="flex items-center space-x-4">
					{#if $page.data.user}
						<img src={$page.data.user.avatarUrl} alt="Avatar" class="w-8 h-8 rounded-full" />
						<span class="text-gray-700">@{$page.data.user.username}</span>
						<form method="POST" action="/auth/logout" class="inline">
							<button type="submit" class="text-red-600 hover:text-red-800">Logout</button>
						</form>
					{:else}
						<a
							href="/auth/github"
							class="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
						>
							Login with GitHub
						</a>
					{/if}
				</div>
			</div>
		</div>
	</nav>

	<main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
		{@render children()}
	</main>
</div>
