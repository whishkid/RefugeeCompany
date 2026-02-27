<script lang="ts">
	let searchQuery = $state('');
	let showNewForm = $state(false);

	const clients = [
		{ id: 1, name: 'Amira Khalil', origin: 'Syrië', status: 'Actief', project: 'Restart', startDate: '2025-09-15', email: 'amira.k@email.com' },
		{ id: 2, name: 'Mohammed Said', origin: 'Eritrea', status: 'Actief', project: 'Prestart', startDate: '2025-11-01', email: 'mohammed.s@email.com' },
		{ id: 3, name: 'Fatima Al-Hassan', origin: 'Irak', status: 'Nieuw', project: '-', startDate: '2026-02-20', email: 'fatima.ah@email.com' },
		{ id: 4, name: 'Omar Bello', origin: 'Nigeria', status: 'Geplaatst', project: 'Restart', startDate: '2025-06-10', email: 'omar.b@email.com' },
		{ id: 5, name: 'Yara Mousavi', origin: 'Iran', status: 'Actief', project: 'Community Café', startDate: '2025-10-05', email: 'yara.m@email.com' },
		{ id: 6, name: 'Hassan Ahmed', origin: 'Somalië', status: 'Actief', project: 'Prestart', startDate: '2026-01-15', email: 'hassan.a@email.com' },
		{ id: 7, name: 'Layla Haddad', origin: 'Libanon', status: 'Uitgestroomd', project: 'Restart', startDate: '2025-03-01', email: 'layla.h@email.com' },
		{ id: 8, name: 'Ibrahim Diallo', origin: 'Guinee', status: 'Actief', project: 'Restart', startDate: '2025-12-01', email: 'ibrahim.d@email.com' }
	];

	let filtered = $derived(
		clients.filter(c =>
			c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			c.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
			c.project.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	let selectedClient = $state<typeof clients[0] | null>(null);
</script>

<div class="p-8">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Deelnemers</h1>
			<p class="text-gray-500">{clients.length} deelnemers geregistreerd</p>
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

	<!-- Search -->
	<div class="mb-4">
		<input
			type="search"
			bind:value={searchQuery}
			placeholder="Zoek op naam, herkomst of project..."
			class="w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
		/>
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
						{#each filtered as client (client.id)}
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
			</div>
		</div>

		{#if selectedClient}
			<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
				<h2 class="text-lg font-semibold text-gray-900">{selectedClient.name}</h2>
				<p class="text-sm text-gray-500">{selectedClient.email}</p>
				<div class="mt-4 space-y-3">
					<div>
						<p class="text-xs font-medium text-gray-500">Herkomst</p>
						<p class="text-sm text-gray-900">{selectedClient.origin}</p>
					</div>
					<div>
						<p class="text-xs font-medium text-gray-500">Project</p>
						<p class="text-sm text-gray-900">{selectedClient.project}</p>
					</div>
					<div>
						<p class="text-xs font-medium text-gray-500">Status</p>
						<p class="text-sm text-gray-900">{selectedClient.status}</p>
					</div>
				</div>
				<div class="mt-6 space-y-2">
					<a href="/demo/questionnaires/fill" class="block rounded-lg bg-purple-50 px-4 py-2 text-center text-sm font-medium text-purple-700 transition hover:bg-purple-100">
						📋 Vragenlijst Invullen
					</a>
					<a href="/demo/placements" class="block rounded-lg bg-green-50 px-4 py-2 text-center text-sm font-medium text-green-700 transition hover:bg-green-100">
						✅ Plaatsing Registreren
					</a>
					<button class="w-full rounded-lg bg-blue-50 px-4 py-2 text-center text-sm font-medium text-blue-700 transition hover:bg-blue-100">
						📄 Certificaat Genereren
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>
