<script lang="ts">
	let searchQuery = $state('');
	let statusFilter = $state('all');
	let projectFilter = $state('all');
	let showNewForm = $state(false);
	let currentPage = $state(1);
	const pageSize = 6;

	const clients = [
		{ id: 1, name: 'Amira Khalil', origin: 'Syrië', status: 'Actief', project: 'Restart', startDate: '2025-09-15', email: 'amira.k@email.com', phone: '+31 6 1234 5678', language: 'Arabisch' },
		{ id: 2, name: 'Mohammed Said', origin: 'Eritrea', status: 'Actief', project: 'Prestart', startDate: '2025-11-01', email: 'mohammed.s@email.com', phone: '+31 6 2345 6789', language: 'Tigrinya' },
		{ id: 3, name: 'Fatima Al-Hassan', origin: 'Irak', status: 'Nieuw', project: '-', startDate: '2026-02-20', email: 'fatima.ah@email.com', phone: '+31 6 3456 7890', language: 'Arabisch' },
		{ id: 4, name: 'Omar Bello', origin: 'Nigeria', status: 'Geplaatst', project: 'Restart', startDate: '2025-06-10', email: 'omar.b@email.com', phone: '+31 6 4567 8901', language: 'Engels' },
		{ id: 5, name: 'Yara Mousavi', origin: 'Iran', status: 'Actief', project: 'Community Café', startDate: '2025-10-05', email: 'yara.m@email.com', phone: '+31 6 5678 9012', language: 'Farsi' },
		{ id: 6, name: 'Hassan Ahmed', origin: 'Somalië', status: 'Actief', project: 'Prestart', startDate: '2026-01-15', email: 'hassan.a@email.com', phone: '+31 6 6789 0123', language: 'Arabisch' },
		{ id: 7, name: 'Layla Haddad', origin: 'Libanon', status: 'Uitgestroomd', project: 'Restart', startDate: '2025-03-01', email: 'layla.h@email.com', phone: '+31 6 7890 1234', language: 'Arabisch' },
		{ id: 8, name: 'Ibrahim Diallo', origin: 'Guinee', status: 'Actief', project: 'Restart', startDate: '2025-12-01', email: 'ibrahim.d@email.com', phone: '+31 6 8901 2345', language: 'Frans' },
		{ id: 9, name: 'Mariam Aliyev', origin: 'Afghanistan', status: 'Actief', project: 'Prestart', startDate: '2026-01-20', email: 'mariam.a@email.com', phone: '+31 6 9012 3456', language: 'Farsi' },
		{ id: 10, name: 'Dawit Tesfaye', origin: 'Eritrea', status: 'Actief', project: 'Community Café', startDate: '2025-11-10', email: 'dawit.t@email.com', phone: '+31 6 0123 4567', language: 'Tigrinya' },
		{ id: 11, name: 'Nadia Bakir', origin: 'Syrië', status: 'Geplaatst', project: 'Restart', startDate: '2025-05-20', email: 'nadia.b@email.com', phone: '+31 6 1122 3344', language: 'Arabisch' },
		{ id: 12, name: 'Samuel Mensah', origin: 'Ghana', status: 'Nieuw', project: '-', startDate: '2026-02-25', email: 'samuel.m@email.com', phone: '+31 6 2233 4455', language: 'Engels' },
		{ id: 13, name: 'Rima Abdel Rahman', origin: 'Palestina', status: 'Actief', project: 'Restart', startDate: '2025-08-12', email: 'rima.ar@email.com', phone: '+31 6 3344 5566', language: 'Arabisch' },
		{ id: 14, name: 'Ali Rezaei', origin: 'Iran', status: 'Uitgestroomd', project: 'Prestart', startDate: '2025-02-01', email: 'ali.r@email.com', phone: '+31 6 4455 6677', language: 'Farsi' },
	];

	let filtered = $derived(
		clients.filter(c => {
			const matchesSearch = searchQuery === '' ||
				c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				c.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
				c.project.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
			const matchesProject = projectFilter === 'all' || c.project === projectFilter;
			return matchesSearch && matchesStatus && matchesProject;
		})
	);

	let totalPages = $derived(Math.max(1, Math.ceil(filtered.length / pageSize)));
	let paged = $derived(filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize));

	// Reset page when filters change
	$effect(() => {
		searchQuery; statusFilter; projectFilter; // track these
		currentPage = 1;
	});

	let selectedClient = $state<typeof clients[0] | null>(null);
</script>

<div class="p-8">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Deelnemers</h1>
			<p class="text-gray-500">{filtered.length} van {clients.length} deelnemers</p>
		</div>
		<button
			onclick={() => showNewForm = !showNewForm}
			class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700"
		>
			+ Nieuwe Deelnemer
		</button>
	</div>

	{#if showNewForm}
		<div class="mb-6 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Nieuwe Deelnemer Registreren</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<label class="block text-sm font-medium text-gray-700">Volledige Naam</label>
					<input type="text" placeholder="Naam" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">E-mail</label>
					<input type="email" placeholder="email@example.com" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Land van Herkomst</label>
					<input type="text" placeholder="Land" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Project</label>
					<select class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
						<option>Prestart</option>
						<option>Restart</option>
						<option>Community Café</option>
					</select>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Telefoon</label>
					<input type="tel" placeholder="+31 6..." class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Taal</label>
					<select class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
						<option>Nederlands</option>
						<option>Engels</option>
						<option>Arabisch</option>
						<option>Farsi</option>
						<option>Tigrinya</option>
						<option>Frans</option>
					</select>
				</div>
			</div>
			<div class="mt-4 flex gap-3">
				<button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">Registreren</button>
				<button onclick={() => showNewForm = false} class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Annuleren</button>
			</div>
		</div>
	{/if}

	<!-- Search & Filters -->
	<div class="mb-4 flex flex-wrap items-center gap-3">
		<input
			type="search"
			bind:value={searchQuery}
			placeholder="Zoek op naam, herkomst of project..."
			class="w-full max-w-xs rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
		/>
		<select bind:value={statusFilter} class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
			<option value="all">Alle statussen</option>
			<option value="Actief">Actief</option>
			<option value="Nieuw">Nieuw</option>
			<option value="Geplaatst">Geplaatst</option>
			<option value="Uitgestroomd">Uitgestroomd</option>
		</select>
		<select bind:value={projectFilter} class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
			<option value="all">Alle projecten</option>
			<option value="Restart">Restart</option>
			<option value="Prestart">Prestart</option>
			<option value="Community Café">Community Café</option>
		</select>
		{#if statusFilter !== 'all' || projectFilter !== 'all' || searchQuery !== ''}
			<button onclick={() => { searchQuery = ''; statusFilter = 'all'; projectFilter = 'all'; }} class="text-sm text-blue-600 hover:underline">Filters wissen</button>
		{/if}
	</div>

	<!-- Table / Client Detail -->
	<div class="grid grid-cols-1 gap-6 {selectedClient ? 'lg:grid-cols-3' : ''}">
		<div class="{selectedClient ? 'lg:col-span-2' : ''}">
			<div class="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
				<table class="w-full">
					<thead>
						<tr class="border-b border-gray-100 bg-gray-50">
							<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Naam</th>
							<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Herkomst</th>
							<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
							<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Project</th>
							<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Startdatum</th>
						</tr>
					</thead>
					<tbody>
						{#each paged as client (client.id)}
							<tr
								class="border-b border-gray-50 cursor-pointer transition hover:bg-blue-50 {selectedClient?.id === client.id ? 'bg-blue-50' : ''}"
								onclick={() => selectedClient = selectedClient?.id === client.id ? null : client}
							>
								<td class="px-4 py-3 text-sm font-medium text-gray-900">{client.name}</td>
								<td class="px-4 py-3 text-sm text-gray-600">{client.origin}</td>
								<td class="px-4 py-3">
									<span class="rounded-full px-2 py-0.5 text-xs font-medium
										{client.status === 'Actief' ? 'bg-green-100 text-green-800' :
										client.status === 'Nieuw' ? 'bg-blue-100 text-blue-800' :
										client.status === 'Geplaatst' ? 'bg-purple-100 text-purple-800' :
										'bg-gray-100 text-gray-800'}
									">{client.status}</span>
								</td>
								<td class="px-4 py-3 text-sm text-gray-600">{client.project}</td>
								<td class="px-4 py-3 text-sm text-gray-600">{client.startDate}</td>
							</tr>
						{/each}
					</tbody>
				</table>

				<!-- Pagination -->
				{#if totalPages > 1}
					<div class="flex items-center justify-between border-t border-gray-100 px-4 py-3">
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
		</div>

		{#if selectedClient}
			<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
				<div class="flex items-center gap-3 mb-4">
					<div class="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
						{selectedClient.name.split(' ').map((n: string) => n[0]).join('')}
					</div>
					<div>
						<h2 class="text-lg font-semibold text-gray-900">{selectedClient.name}</h2>
						<p class="text-sm text-gray-500">{selectedClient.email}</p>
					</div>
				</div>
				<div class="space-y-3">
					<div class="grid grid-cols-2 gap-3">
						<div>
							<p class="text-xs font-medium text-gray-500">Herkomst</p>
							<p class="text-sm text-gray-900">{selectedClient.origin}</p>
						</div>
						<div>
							<p class="text-xs font-medium text-gray-500">Taal</p>
							<p class="text-sm text-gray-900">{selectedClient.language}</p>
						</div>
						<div>
							<p class="text-xs font-medium text-gray-500">Project</p>
							<p class="text-sm text-gray-900">{selectedClient.project}</p>
						</div>
						<div>
							<p class="text-xs font-medium text-gray-500">Status</p>
							<span class="inline-block rounded-full px-2 py-0.5 text-xs font-medium
								{selectedClient.status === 'Actief' ? 'bg-green-100 text-green-800' :
								selectedClient.status === 'Nieuw' ? 'bg-blue-100 text-blue-800' :
								selectedClient.status === 'Geplaatst' ? 'bg-purple-100 text-purple-800' :
								'bg-gray-100 text-gray-800'}
							">{selectedClient.status}</span>
						</div>
					</div>
					<div>
						<p class="text-xs font-medium text-gray-500">Telefoon</p>
						<p class="text-sm text-gray-900">{selectedClient.phone}</p>
					</div>
					<div>
						<p class="text-xs font-medium text-gray-500">Startdatum</p>
						<p class="text-sm text-gray-900">{selectedClient.startDate}</p>
					</div>
				</div>
				<div class="mt-6 space-y-2">
					<a href="/demo/clients/{selectedClient.id}" class="block rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700">
						👤 Volledig Profiel Bekijken
					</a>
					<a href="/demo/questionnaires/fill" class="block rounded-lg bg-purple-50 px-4 py-2 text-center text-sm font-medium text-purple-700 transition hover:bg-purple-100">
						📋 Vragenlijst Invullen
					</a>
					<a href="/demo/placements" class="block rounded-lg bg-green-50 px-4 py-2 text-center text-sm font-medium text-green-700 transition hover:bg-green-100">
						✅ Plaatsing Registreren
					</a>
					<a href="/demo/clients/{selectedClient.id}/certificate" class="block rounded-lg bg-amber-50 px-4 py-2 text-center text-sm font-medium text-amber-700 transition hover:bg-amber-100">
						🏆 Certificaat Bekijken
					</a>
				</div>
			</div>
		{/if}
	</div>
</div>
