<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
	<div class="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
		<h1 class="mb-2 text-4xl font-bold text-gray-900">
			A Beautiful Mess
		</h1>
		<p class="mb-6 text-lg text-gray-500">Client Tracking System — Hello World</p>

		<div class="mb-6 rounded-lg bg-green-50 border border-green-200 p-4">
			<h2 class="mb-2 text-lg font-semibold text-green-800">Stack Status</h2>
			<ul class="space-y-1 text-sm">
				<li class="flex items-center gap-2">
					<span class="inline-block h-2 w-2 rounded-full {data.dbConnected ? 'bg-green-500' : 'bg-red-500'}"></span>
					<span class="font-medium">Neon (PostgreSQL):</span>
					{data.dbConnected ? 'Connected' : 'Not connected'}
				</li>
				<li class="flex items-center gap-2">
					<span class="inline-block h-2 w-2 rounded-full {data.drizzleWorking ? 'bg-green-500' : 'bg-red-500'}"></span>
					<span class="font-medium">Drizzle ORM:</span>
					{data.drizzleWorking ? `Working — ${data.tableCount} tables found` : 'Not working'}
				</li>
				<li class="flex items-center gap-2">
					<span class="inline-block h-2 w-2 rounded-full bg-green-500"></span>
					<span class="font-medium">Tailwind CSS:</span> Active (you're seeing styled content!)
				</li>
				<li class="flex items-center gap-2">
					<span class="inline-block h-2 w-2 rounded-full bg-green-500"></span>
					<span class="font-medium">SvelteKit:</span> Running on Vercel adapter
				</li>
				<li class="flex items-center gap-2">
					<span class="inline-block h-2 w-2 rounded-full bg-green-500"></span>
					<span class="font-medium">Better Auth:</span> Configured with email/password
				</li>
			</ul>
		</div>

		{#if data.tasks.length > 0}
			<div class="mb-6">
				<h2 class="mb-2 text-lg font-semibold text-gray-700">Sample Tasks from Neon DB</h2>
				<div class="space-y-2">
					{#each data.tasks as task (task.id)}
						<div class="flex items-center justify-between rounded-md bg-gray-50 px-4 py-2">
							<span>{task.title}</span>
							<span class="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">Priority: {task.priority}</span>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<div class="flex gap-4">
			<a
				href="/demo"
				class="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium shadow transition hover:bg-blue-700"
			>
				View Clickable Demo →
			</a>
			<a
				href="/demo/better-auth/login"
				class="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-medium transition hover:bg-gray-50"
			>
				Try Auth Demo
			</a>
		</div>
	</div>
</div>
