<script lang="ts">
	let showNewUser = $state(false);

	const users = [
		{ id: 1, name: 'Merel Macedo', email: 'merel@abeautifulmess.nl', role: 'Beheerder', status: 'Actief', lastLogin: '2026-02-27' },
		{ id: 2, name: 'Bastiaan Oelrich', email: 'bastiaan@humancontent.nl', role: 'Beheerder', status: 'Actief', lastLogin: '2026-02-27' },
		{ id: 3, name: 'Sara de Vries', email: 'sara@abeautifulmess.nl', role: 'Begeleider', status: 'Actief', lastLogin: '2026-02-26' },
		{ id: 4, name: 'Tom Bakker', email: 'tom@abeautifulmess.nl', role: 'Begeleider', status: 'Actief', lastLogin: '2026-02-25' },
		{ id: 5, name: 'Lisa van Dijk', email: 'lisa@abeautifulmess.nl', role: 'Rapportage', status: 'Actief', lastLogin: '2026-02-20' },
		{ id: 6, name: 'Ahmed Hassan', email: 'ahmed@abeautifulmess.nl', role: 'Begeleider', status: 'Inactief', lastLogin: '2026-01-15' },
	];

	const roles = [
		{ name: 'Beheerder', desc: 'Volledige toegang tot alle functionaliteiten', count: 2 },
		{ name: 'Begeleider', desc: 'Deelnemers beheren, vragenlijsten invullen, plaatsingen registreren', count: 3 },
		{ name: 'Rapportage', desc: 'Alleen-lezen toegang tot dashboard en rapporten', count: 1 },
	];
</script>

<div class="p-8">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Gebruikersbeheer</h1>
			<p class="text-gray-500">{users.length} gebruikers • {users.filter(u => u.status === 'Actief').length} actief</p>
		</div>
		<button
			onclick={() => showNewUser = !showNewUser}
			class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700"
		>
			+ Nieuwe Gebruiker
		</button>
	</div>

	{#if showNewUser}
		<div class="mb-6 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Gebruiker Uitnodigen</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div>
					<label class="block text-sm font-medium text-gray-700">Naam</label>
					<input type="text" placeholder="Volledige naam" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">E-mail</label>
					<input type="email" placeholder="email@abeautifulmess.nl" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Rol</label>
					<select class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
						<option>Beheerder</option>
						<option>Begeleider</option>
						<option>Rapportage</option>
					</select>
				</div>
			</div>
			<div class="mt-4 flex gap-3">
				<button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">Uitnodiging Versturen</button>
				<button onclick={() => showNewUser = false} class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Annuleren</button>
			</div>
		</div>
	{/if}

	<!-- Roles Overview -->
	<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
		{#each roles as role}
			<div class="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
				<div class="flex items-center justify-between">
					<h3 class="font-semibold text-gray-900">{role.name}</h3>
					<span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{role.count}</span>
				</div>
				<p class="mt-1 text-xs text-gray-500">{role.desc}</p>
			</div>
		{/each}
	</div>

	<!-- Users Table -->
	<div class="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
		<table class="w-full">
			<thead>
				<tr class="border-b border-gray-100 bg-gray-50">
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Naam</th>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">E-mail</th>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Rol</th>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Laatste Login</th>
					<th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Acties</th>
				</tr>
			</thead>
			<tbody>
				{#each users as user (user.id)}
					<tr class="border-b border-gray-50 hover:bg-gray-50">
						<td class="px-4 py-3 text-sm font-medium text-gray-900">{user.name}</td>
						<td class="px-4 py-3 text-sm text-gray-600">{user.email}</td>
						<td class="px-4 py-3">
							<span class="rounded-full px-2 py-0.5 text-xs font-medium
								{user.role === 'Beheerder' ? 'bg-red-100 text-red-800' :
								user.role === 'Begeleider' ? 'bg-blue-100 text-blue-800' :
								'bg-gray-100 text-gray-800'}
							">{user.role}</span>
						</td>
						<td class="px-4 py-3">
							<span class="rounded-full px-2 py-0.5 text-xs font-medium {user.status === 'Actief' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">{user.status}</span>
						</td>
						<td class="px-4 py-3 text-sm text-gray-600">{user.lastLogin}</td>
						<td class="px-4 py-3">
							<button class="text-xs text-blue-600 hover:underline">Bewerken</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
