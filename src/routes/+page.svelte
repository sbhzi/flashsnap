<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="px-4 py-6 sm:px-0">
	{#if $page.data.user}
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900 mb-4">Welcome back, {$page.data.user.username}!</h1>
			<p class="text-gray-600">Create and manage your flashcards using GitHub Discussions.</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<div class="bg-white rounded-lg shadow p-6">
				<h2 class="text-xl font-semibold text-gray-900 mb-4">Create New Flashcard Group</h2>
				<p class="text-gray-600 mb-4">Start a new discussion in one of your repositories to create a flashcard group.</p>
				<a 
					href="/flashcards/new" 
					class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
				>
					Create Group
				</a>
			</div>

			<div class="bg-white rounded-lg shadow p-6">
				<h2 class="text-xl font-semibold text-gray-900 mb-4">Browse Groups</h2>
				<p class="text-gray-600 mb-4">View and study your existing flashcard groups.</p>
				<a 
					href="/flashcards" 
					class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
				>
					Browse Groups
				</a>
			</div>

			<div class="bg-white rounded-lg shadow p-6">
				<h2 class="text-xl font-semibold text-gray-900 mb-4">Study Mode</h2>
				<p class="text-gray-600 mb-4">Practice with your flashcards in an interactive study session.</p>
				<a 
					href="/study" 
					class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
				>
					Start Studying
				</a>
			</div>
		</div>

		<div class="mt-12 bg-white rounded-lg shadow p-6">
			<h2 class="text-xl font-semibold text-gray-900 mb-4">How it works</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="text-center">
					<div class="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
						<span class="text-blue-600 font-bold">1</span>
					</div>
					<h3 class="font-semibold text-gray-900 mb-2">Create Discussion</h3>
					<p class="text-gray-600 text-sm">Start a new discussion in your GitHub repository to create a flashcard group.</p>
				</div>
				<div class="text-center">
					<div class="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
						<span class="text-green-600 font-bold">2</span>
					</div>
					<h3 class="font-semibold text-gray-900 mb-2">Add Cards</h3>
					<p class="text-gray-600 text-sm">Each comment in the discussion becomes a flashcard with question and answer.</p>
				</div>
				<div class="text-center">
					<div class="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
						<span class="text-purple-600 font-bold">3</span>
					</div>
					<h3 class="font-semibold text-gray-900 mb-2">Study</h3>
					<p class="text-gray-600 text-sm">Practice with your flashcards and track your progress over time.</p>
				</div>
			</div>
		</div>
	{:else}
		<div class="text-center py-12">
			<h1 class="text-4xl font-bold text-gray-900 mb-4">FlashSnap</h1>
			<p class="text-xl text-gray-600 mb-8">Create and study flashcards using GitHub Discussions</p>
			<a 
				href="/auth/github" 
				class="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-lg rounded-lg hover:bg-gray-800 transition-colors"
			>
				Get Started with GitHub
			</a>
		</div>

		<div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="text-center">
				<div class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-gray-900 mb-2">GitHub Integration</h3>
				<p class="text-gray-600">Use GitHub Discussions to create and manage your flashcard groups collaboratively.</p>
			</div>
			<div class="text-center">
				<div class="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Smart Study</h3>
				<p class="text-gray-600">Interactive flashcard system with progress tracking and spaced repetition.</p>
			</div>
			<div class="text-center">
				<div class="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Collaborative</h3>
				<p class="text-gray-600">Share and collaborate on flashcard sets with your team or study group.</p>
			</div>
		</div>
	{/if}
</div>
