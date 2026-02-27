<script lang="ts">
	const vacancies = [
		{ id: 1, title: 'Assistent-Kok', org: 'Restaurant De Plantage', city: 'Amsterdam', hours: '32 uur/week', status: 'Open', applicants: 4 },
		{ id: 2, title: 'Barista', org: 'Café de Koffiebar', city: 'Arnhem', hours: '24 uur/week', status: 'Open', applicants: 2 },
		{ id: 3, title: 'Keukenhulp', org: 'GreenCatering BV', city: 'Amsterdam', hours: '40 uur/week', status: 'Vervuld', applicants: 6 },
		{ id: 4, title: 'Broodbakker Assistent', org: 'Bakers United', city: 'Utrecht', hours: '36 uur/week', status: 'Open', applicants: 1 },
		{ id: 5, title: 'Receptiemedewerker', org: 'Hotel Casa 400', city: 'Amsterdam', hours: '32 uur/week', status: 'Open', applicants: 3 },
		{ id: 6, title: 'Runner/Serveerder', org: 'Restaurant De Plantage', city: 'Amsterdam', hours: '24 uur/week', status: 'Open', applicants: 5 },
	];
</script>

<div class="p-8">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Vacatures</h1>
			<p class="text-gray-500">{vacancies.filter(v => v.status === 'Open').length} open vacatures</p>
		</div>
		<button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700">
			+ Nieuwe Vacature
		</button>
	</div>

	<div class="space-y-4">
		{#each vacancies as vacancy (vacancy.id)}
			<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex items-center justify-between">
				<div>
					<div class="flex items-center gap-3">
						<h3 class="text-lg font-semibold text-gray-900">{vacancy.title}</h3>
						<span class="rounded-full px-2 py-0.5 text-xs font-medium {vacancy.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">{vacancy.status}</span>
					</div>
					<p class="text-sm text-gray-500">{vacancy.org} • {vacancy.city} • {vacancy.hours}</p>
				</div>
				<div class="flex items-center gap-4">
					<div class="text-center">
						<p class="text-lg font-bold text-gray-900">{vacancy.applicants}</p>
						<p class="text-xs text-gray-500">kandidaten</p>
					</div>
					{#if vacancy.status === 'Open'}
						<button class="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100">
							Match Deelnemer
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
