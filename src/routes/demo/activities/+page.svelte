<script lang="ts">
	const activities = [
		{ id: 1, name: 'Workshop CV Schrijven', type: 'Workshop', date: '2026-03-05', location: 'Community Café Amsterdam', participants: 18, project: 'Restart Amsterdam' },
		{ id: 2, name: 'Bedrijfsbezoek GreenCatering', type: 'Bedrijfsbezoek', date: '2026-03-08', location: 'GreenCatering BV', participants: 12, project: 'Prestart Amsterdam' },
		{ id: 3, name: 'Kookworkshop Mediterraan', type: 'Workshop', date: '2026-03-12', location: 'Community Café Utrecht', participants: 15, project: 'Restart Utrecht' },
		{ id: 4, name: 'Sollicitatietraining', type: 'Training', date: '2026-03-15', location: 'Community Café Amsterdam', participants: 20, project: 'Restart Amsterdam' },
		{ id: 5, name: 'Barista Basis Certificaat', type: 'Certificering', date: '2026-03-18', location: 'Café de Koffiebar', participants: 8, project: 'Community Café Arnhem' },
		{ id: 6, name: 'Netwerk Event "Meet & Eat"', type: 'Evenement', date: '2026-03-22', location: 'Community Café Amsterdam', participants: 45, project: '-' },
	];

	const typeColors: Record<string, string> = {
		'Workshop': 'bg-blue-100 text-blue-800',
		'Bedrijfsbezoek': 'bg-green-100 text-green-800',
		'Training': 'bg-purple-100 text-purple-800',
		'Certificering': 'bg-orange-100 text-orange-800',
		'Evenement': 'bg-pink-100 text-pink-800',
	};
</script>

<div class="p-8">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Activiteiten & Workshops</h1>
			<p class="text-gray-500">{activities.length} geplande activiteiten</p>
		</div>
		<button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700">
			+ Nieuwe Activiteit
		</button>
	</div>

	<div class="space-y-4">
		{#each activities as activity (activity.id)}
			<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
				<div class="flex items-start justify-between">
					<div>
						<div class="flex items-center gap-3">
							<h3 class="text-lg font-semibold text-gray-900">{activity.name}</h3>
							<span class="rounded-full px-2 py-0.5 text-xs font-medium {typeColors[activity.type] ?? 'bg-gray-100 text-gray-800'}">{activity.type}</span>
						</div>
						<p class="mt-1 text-sm text-gray-500">
							📅 {activity.date} • 📍 {activity.location}
						</p>
						{#if activity.project !== '-'}
							<p class="mt-1 text-xs text-gray-400">Project: {activity.project}</p>
						{/if}
					</div>
					<div class="flex items-center gap-4">
						<div class="text-center">
							<p class="text-lg font-bold text-gray-900">{activity.participants}</p>
							<p class="text-xs text-gray-500">deelnemers</p>
						</div>
						<div class="flex gap-2">
							<button class="rounded-lg bg-purple-50 px-3 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100">📋 Vragenlijst</button>
							<button class="rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-100">📄 Certificaat</button>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
