<script lang="ts">
	let showNewForm = $state(false);
	let searchQuery = $state('');
	let typeFilter = $state('all');
	let cityFilter = $state('all');
	let currentPage = $state(1);
	const pageSize = 6;

	const organizations = [
		{ id: 1, name: 'Restaurant De Plantage', type: 'Horeca', city: 'Amsterdam', contacts: 2, vacancies: 3, placements: 12 },
		{ id: 2, name: 'Hotel Casa 400', type: 'Horeca', city: 'Amsterdam', contacts: 1, vacancies: 1, placements: 8 },
		{ id: 3, name: 'Bakers United', type: 'Bakkerij', city: 'Utrecht', contacts: 1, vacancies: 2, placements: 5 },
		{ id: 4, name: 'GreenCatering BV', type: 'Catering', city: 'Amsterdam', contacts: 3, vacancies: 4, placements: 15 },
		{ id: 5, name: 'Café de Koffiebar', type: 'Horeca', city: 'Arnhem', contacts: 1, vacancies: 1, placements: 3 },
		{ id: 6, name: 'Fresh Food Co.', type: 'Voedsel', city: 'Utrecht', contacts: 2, vacancies: 2, placements: 7 },
		{ id: 7, name: 'De Italiaan', type: 'Horeca', city: 'Amsterdam', contacts: 1, vacancies: 2, placements: 9 },
		{ id: 8, name: 'Bakkerij Het Broodhuys', type: 'Bakkerij', city: 'Den Haag', contacts: 1, vacancies: 1, placements: 4 },
		{ id: 9, name: 'EventCatering Plus', type: 'Catering', city: 'Rotterdam', contacts: 2, vacancies: 3, placements: 6 },
		{ id: 10, name: 'Grand Hotel Krasnapolsky', type: 'Horeca', city: 'Amsterdam', contacts: 4, vacancies: 5, placements: 18 },
	];

	let filtered = $derived(
		organizations.filter(o => {
			const matchesSearch = searchQuery === '' ||
				o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				o.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
				o.city.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesType = typeFilter === 'all' || o.type === typeFilter;
			const matchesCity = cityFilter === 'all' || o.city === cityFilter;
			return matchesSearch && matchesType && matchesCity;
		})
	);

	let totalPages = $derived(Math.max(1, Math.ceil(filtered.length / pageSize)));
	let paged = $derived(filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize));

	$effect(() => {
		searchQuery; typeFilter; cityFilter;
		currentPage = 1;
	});

	const uniqueTypes = [...new Set(organizations.map(o => o.type))];
	const uniqueCities = [...new Set(organizations.map(o => o.city))].sort();
</script>

<div class="p-8">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Organisaties</h1>
			<p class="text-gray-500">{filtered.length} van {organizations.length} partnerbedrijven</p>
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

	<!-- Search & Filters -->
	<div class="mb-4 flex flex-wrap items-center gap-3">
		<input
			type="search"
			bind:value={searchQuery}
			placeholder="Zoek op naam, type of stad..."
			class="w-full max-w-xs rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
		/>
		<select bind:value={typeFilter} class="rounded-lg border border-gray-300 px-3 py-2 text-sm">
			<option value="all">Alle types</option>
			{#each uniqueTypes as t}
				<option value={t}>{t}</option>
			{/each}
		</select>
		<select bind:value={cityFilter} class="rounded-lg border border-gray-300 px-3 py-2 text-sm">
			<option value="all">Alle steden</option>
			{#each uniqueCities as c}
				<option value={c}>{c}</option>
			{/each}
		</select>
		{#if typeFilter !== 'all' || cityFilter !== 'all' || searchQuery !== ''}
			<button onclick={() => { searchQuery = ''; typeFilter = 'all'; cityFilter = 'all'; }} class="text-sm text-blue-600 hover:underline">Filters wissen</button>
		{/if}
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each paged as org (org.id)}
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

	<!-- Pagination -->
	{#if totalPages > 1}
		<div class="mt-6 flex items-center justify-between">
			<p class="text-sm text-gray-500">
				{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} van {filtered.length}
			</p>
			<div class="flex gap-1">
				<button
					onclick={() => currentPage = Math.max(1, currentPage - 1)}
					disabled={currentPage === 1}
					class="rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-40 hover:bg-gray-50"
				>‹ Vorige</button>
				{#each Array.from({ length: totalPages }, (_, i) => i + 1) as p}
					<button
						onclick={() => currentPage = p}
						class="rounded-md border px-3 py-1.5 text-sm {p === currentPage ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 hover:bg-gray-50'}"
					>{p}</button>
				{/each}
				<button
					onclick={() => currentPage = Math.min(totalPages, currentPage + 1)}
					disabled={currentPage === totalPages}
					class="rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-40 hover:bg-gray-50"
				>Volgende ›</button>
			</div>
		</div>
	{/if}
</div>
