<script lang="ts">
	let showNewForm = $state(false);

	const organizations = [
		{ id: 1, name: 'Restaurant De Plantage', type: 'Horeca', city: 'Amsterdam', contacts: 2, vacancies: 3, placements: 12 },
		{ id: 2, name: 'Hotel Casa 400', type: 'Horeca', city: 'Amsterdam', contacts: 1, vacancies: 1, placements: 8 },
		{ id: 3, name: 'Bakers United', type: 'Bakkerij', city: 'Utrecht', contacts: 1, vacancies: 2, placements: 5 },
		{ id: 4, name: 'GreenCatering BV', type: 'Catering', city: 'Amsterdam', contacts: 3, vacancies: 4, placements: 15 },
		{ id: 5, name: 'Café de Koffiebar', type: 'Horeca', city: 'Arnhem', contacts: 1, vacancies: 1, placements: 3 },
		{ id: 6, name: 'Fresh Food Co.', type: 'Voedsel', city: 'Utrecht', contacts: 2, vacancies: 2, placements: 7 },
	];
</script>

<div class="p-8">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Organisaties</h1>
			<p class="text-gray-500">{organizations.length} partnerbedrijven</p>
		</div>
		<button
			onclick={() => showNewForm = !showNewForm}
			class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700"
		>
			+ Nieuwe Organisatie
		</button>
	</div>

	{#if showNewForm}
		<div class="mb-6 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Nieuwe Organisatie Toevoegen</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<label class="block text-sm font-medium text-gray-700">Bedrijfsnaam</label>
					<input type="text" placeholder="Naam" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Type</label>
					<select class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
						<option>Horeca</option>
						<option>Catering</option>
						<option>Bakkerij</option>
						<option>Voedsel</option>
						<option>Anders</option>
					</select>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Stad</label>
					<input type="text" placeholder="Stad" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Contactpersoon</label>
					<input type="text" placeholder="Naam contactpersoon" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
				</div>
			</div>
			<div class="mt-4 flex gap-3">
				<button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">Toevoegen</button>
				<button onclick={() => showNewForm = false} class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Annuleren</button>
			</div>
		</div>
	{/if}

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each organizations as org (org.id)}
			<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100 transition hover:shadow-md">
				<h3 class="text-lg font-semibold text-gray-900">{org.name}</h3>
				<p class="text-sm text-gray-500">{org.type} • {org.city}</p>
				<div class="mt-4 grid grid-cols-3 gap-2 text-center">
					<div class="rounded-lg bg-gray-50 p-2">
						<p class="text-lg font-bold text-gray-900">{org.contacts}</p>
						<p class="text-xs text-gray-500">Contacten</p>
					</div>
					<div class="rounded-lg bg-blue-50 p-2">
						<p class="text-lg font-bold text-blue-700">{org.vacancies}</p>
						<p class="text-xs text-blue-600">Vacatures</p>
					</div>
					<div class="rounded-lg bg-green-50 p-2">
						<p class="text-lg font-bold text-green-700">{org.placements}</p>
						<p class="text-xs text-green-600">Plaatsingen</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
