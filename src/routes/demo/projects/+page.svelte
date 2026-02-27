<script lang="ts">
	let selectedProject = $state<typeof projects[0] | null>(null);

	const projects = [
		{ id: 1, name: 'Prestart Amsterdam', type: 'Prestart', location: 'Community Café Amsterdam', participants: 24, duration: '3 maanden', status: 'Actief', desc: 'Oriëntatieprogramma voor nieuwkomers. Kennismaking met de arbeidsmarkt, taalondersteuning en culturele integratie.' },
		{ id: 2, name: 'Restart Utrecht', type: 'Restart', location: 'Community Café Utrecht', participants: 18, duration: '6 maanden', status: 'Actief', desc: 'Intensief werktraject met persoonlijke begeleiding, stage en coaching richting betaald werk.' },
		{ id: 3, name: 'Restart Amsterdam', type: 'Restart', location: 'Community Café Amsterdam', participants: 22, duration: '6 maanden', status: 'Actief', desc: 'Intensief werktraject met persoonlijke begeleiding, stage en coaching richting betaald werk.' },
		{ id: 4, name: 'Community Café Arnhem', type: 'Community Café', location: 'Arnhem Centrum', participants: 35, duration: 'Doorlopend', status: 'Actief', desc: 'Open werkplek en ontmoetingsplek. Deelnemers draaien mee in het café en doen werkervaring op.' },
		{ id: 5, name: 'Prestart Arnhem', type: 'Prestart', location: 'Community Café Arnhem', participants: 12, duration: '3 maanden', status: 'Gepland', desc: 'Nieuw programma start maart 2026.' },
	];
</script>

<div class="p-8">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Projecten</h1>
			<p class="text-gray-500">{projects.length} projecten • {projects.filter(p => p.status === 'Actief').length} actief</p>
		</div>
		<button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700">
			+ Nieuw Project
		</button>
	</div>

	<div class="grid grid-cols-1 gap-6 {selectedProject ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}">
		<div class="{selectedProject ? 'lg:col-span-2' : ''} space-y-4">
			{#each projects as project (project.id)}
				<div
					class="rounded-xl bg-white p-6 shadow-sm border border-gray-100 cursor-pointer transition hover:shadow-md {selectedProject?.id === project.id ? 'ring-2 ring-blue-500' : ''}"
					onclick={() => selectedProject = selectedProject?.id === project.id ? null : project}
				>
					<div class="flex items-center justify-between">
						<div>
							<div class="flex items-center gap-3">
								<h3 class="text-lg font-semibold text-gray-900">{project.name}</h3>
								<span class="rounded-full px-2 py-0.5 text-xs font-medium {project.status === 'Actief' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">{project.status}</span>
							</div>
							<p class="text-sm text-gray-500">{project.type} • {project.location} • {project.duration}</p>
						</div>
						<div class="text-center">
							<p class="text-2xl font-bold text-gray-900">{project.participants}</p>
							<p class="text-xs text-gray-500">deelnemers</p>
						</div>
					</div>
				</div>
			{/each}
		</div>

		{#if selectedProject}
			<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
				<h2 class="text-lg font-semibold text-gray-900">{selectedProject.name}</h2>
				<span class="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">{selectedProject.type}</span>
				<p class="mt-3 text-sm text-gray-600">{selectedProject.desc}</p>
				<div class="mt-4 space-y-2 text-sm">
					<p><span class="font-medium text-gray-700">Locatie:</span> {selectedProject.location}</p>
					<p><span class="font-medium text-gray-700">Duur:</span> {selectedProject.duration}</p>
					<p><span class="font-medium text-gray-700">Deelnemers:</span> {selectedProject.participants}</p>
				</div>
				<div class="mt-6 space-y-2">
					<a href="/demo/questionnaires" class="block rounded-lg bg-purple-50 px-4 py-2 text-center text-sm font-medium text-purple-700 hover:bg-purple-100">
						📋 Vragenlijsten Beheren
					</a>
					<a href="/demo/clients" class="block rounded-lg bg-blue-50 px-4 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-100">
						👥 Deelnemers Bekijken
					</a>
					<button class="w-full rounded-lg bg-green-50 px-4 py-2 text-center text-sm font-medium text-green-700 hover:bg-green-100">
						📄 Certificaten Genereren
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>
