<script lang="ts">
	const placements = [
		{ id: 1, client: 'Amira Khalil', org: 'Restaurant De Plantage', role: 'Assistent-Kok', date: '2026-02-15', status: 'Actief', fromVacancy: true },
		{ id: 2, client: 'Omar Bello', org: 'Hotel Casa 400', role: 'Receptiemedewerker', date: '2026-01-20', status: 'Actief', fromVacancy: true },
		{ id: 3, client: 'Layla Haddad', org: 'GreenCatering BV', role: 'Keukenhulp', date: '2025-11-10', status: 'Afgerond', fromVacancy: false },
		{ id: 4, client: 'Hassan Ahmed', org: 'Bakers United', role: 'Broodbakker Assistent', date: '2026-02-01', status: 'Actief', fromVacancy: true },
		{ id: 5, client: 'Yara Mousavi', org: 'Café de Koffiebar', role: 'Barista', date: '2026-01-08', status: 'Actief', fromVacancy: false },
		{ id: 6, client: 'Ibrahim Diallo', org: 'Restaurant De Plantage', role: 'Runner/Serveerder', date: '2025-12-15', status: 'Actief', fromVacancy: true },
	];

	let showNewPlacement = $state(false);
</script>

<div class="p-8">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Plaatsingen</h1>
			<p class="text-gray-500">{placements.filter(p => p.status === 'Actief').length} actieve plaatsingen</p>
		</div>
		<button
			onclick={() => showNewPlacement = !showNewPlacement}
			class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700"
		>
			+ Nieuwe Plaatsing
		</button>
	</div>

	{#if showNewPlacement}
		<div class="mb-6 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Nieuwe Plaatsing Registreren</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<label class="block text-sm font-medium text-gray-700">Deelnemer</label>
					<select class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
						<option>Amira Khalil</option>
						<option>Mohammed Said</option>
						<option>Fatima Al-Hassan</option>
						<option>Hassan Ahmed</option>
					</select>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Organisatie</label>
					<select class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
						<option>Restaurant De Plantage</option>
						<option>Hotel Casa 400</option>
						<option>GreenCatering BV</option>
						<option>Bakers United</option>
						<option>Café de Koffiebar</option>
					</select>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Functie</label>
					<input type="text" placeholder="Functienaam" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Startdatum</label>
					<input type="date" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Gekoppeld aan vacature?</label>
					<select class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
						<option>Ja — Assistent-Kok @ De Plantage</option>
						<option>Ja — Barista @ Café de Koffiebar</option>
						<option>Nee — zonder vacature</option>
					</select>
				</div>
			</div>
			<div class="mt-4 flex gap-3">
				<button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">Plaatsing Registreren</button>
				<button onclick={() => showNewPlacement = false} class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Annuleren</button>
			</div>
		</div>
	{/if}

	<div class="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
		<table class="w-full">
			<thead>
				<tr class="border-b border-gray-100 bg-gray-50">
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Deelnemer</th>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Organisatie</th>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Functie</th>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Datum</th>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Via Vacature</th>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Acties</th>
				</tr>
			</thead>
			<tbody>
				{#each placements as p (p.id)}
					<tr class="border-b border-gray-50 hover:bg-gray-50">
						<td class="px-4 py-3 text-sm font-medium text-gray-900">{p.client}</td>
						<td class="px-4 py-3 text-sm text-gray-600">{p.org}</td>
						<td class="px-4 py-3 text-sm text-gray-600">{p.role}</td>
						<td class="px-4 py-3 text-sm text-gray-600">{p.date}</td>
						<td class="px-4 py-3 text-sm">{p.fromVacancy ? '✅' : '—'}</td>
						<td class="px-4 py-3">
							<span class="rounded-full px-2 py-0.5 text-xs font-medium {p.status === 'Actief' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">{p.status}</span>
						</td>
						<td class="px-4 py-3">
							<div class="flex gap-2">
								<button class="text-xs text-blue-600 hover:underline">📄 Certificaat</button>
								<button class="text-xs text-purple-600 hover:underline">✍️ Ondertekenen</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
