<script lang="ts">
	import { page } from '$app/state';

	const clientId = $derived(Number(page.params.id));

	// Rich client data with history
	const allClients: Record<number, {
		id: number; name: string; origin: string; status: string; project: string;
		startDate: string; email: string; phone: string; language: string;
		address: string; dateOfBirth: string; bsn: string; coach: string;
		bio: string;
		events: { date: string; title: string; type: string }[];
		certificates: { id: number; title: string; date: string; project: string }[];
		questionnaires: { name: string; date: string; score: number | null }[];
		placements: { org: string; role: string; date: string; status: string }[];
		notes: { date: string; author: string; text: string }[];
	}> = {
		1: {
			id: 1, name: 'Amira Khalil', origin: 'Syrië', status: 'Actief', project: 'Restart',
			startDate: '2025-09-15', email: 'amira.k@email.com', phone: '+31 6 1234 5678',
			language: 'Arabisch', address: 'Kinkerstraat 45, Amsterdam', dateOfBirth: '1992-04-12',
			bsn: '•••••4821', coach: 'Merel Macedo',
			bio: 'Amira is een gemotiveerde deelnemer met een achtergrond in de administratie. Ze is in september 2024 naar Nederland gekomen en wil graag in de horeca werken.',
			events: [
				{ date: '2025-09-15', title: 'Intake Gesprek', type: 'intake' },
				{ date: '2025-09-22', title: 'Workshop: CV Schrijven', type: 'workshop' },
				{ date: '2025-10-06', title: 'Workshop: Solliciteren in NL', type: 'workshop' },
				{ date: '2025-10-20', title: 'Bedrijfsbezoek Restaurant De Plantage', type: 'excursion' },
				{ date: '2025-11-03', title: 'Workshop: Nederlandse Werkcultuur', type: 'workshop' },
				{ date: '2025-11-17', title: 'Snuffelstage: Restaurant De Plantage', type: 'placement' },
				{ date: '2025-12-01', title: 'Tussentijdse Evaluatie', type: 'evaluation' },
				{ date: '2026-01-12', title: 'Workshop: Financieel Beheer', type: 'workshop' },
				{ date: '2026-02-15', title: 'Plaatsing: Assistent-Kok', type: 'placement' },
			],
			certificates: [
				{ id: 1, title: 'Restart Programma Certificaat', date: '2026-02-15', project: 'Restart Amsterdam' },
				{ id: 2, title: 'Voedselveiligheid Basis', date: '2025-11-20', project: 'Restart Amsterdam' },
				{ id: 3, title: 'EHBO op de Werkplek', date: '2026-01-25', project: 'Restart Amsterdam' },
			],
			questionnaires: [
				{ name: 'Restart Intake', date: '2025-09-15', score: 2.1 },
				{ name: 'Restart Tussentijds', date: '2025-12-01', score: 3.4 },
				{ name: 'Restart Uitstroom', date: '2026-02-15', score: 4.2 },
			],
			placements: [
				{ org: 'Restaurant De Plantage', role: 'Snuffelstage', date: '2025-11-17', status: 'Afgerond' },
				{ org: 'Restaurant De Plantage', role: 'Assistent-Kok', date: '2026-02-15', status: 'Actief' },
			],
			notes: [
				{ date: '2026-02-15', author: 'Merel Macedo', text: 'Amira is officieel geplaatst bij Restaurant De Plantage als assistent-kok. Werkgever is zeer tevreden.' },
				{ date: '2025-12-01', author: 'Merel Macedo', text: 'Tussentijdse evaluatie: grote vooruitgang in taalvaardigheid en zelfvertrouwen. Advies: doorgaan met huidige traject.' },
				{ date: '2025-09-15', author: 'Merel Macedo', text: 'Intake afgerond. Amira is zeer gemotiveerd, heeft ervaring in administratie maar wil graag in de keuken werken.' },
			]
		},
		4: {
			id: 4, name: 'Omar Bello', origin: 'Nigeria', status: 'Geplaatst', project: 'Restart',
			startDate: '2025-06-10', email: 'omar.b@email.com', phone: '+31 6 4567 8901',
			language: 'Engels', address: 'Overtoom 112, Amsterdam', dateOfBirth: '1988-11-28',
			bsn: '•••••7392', coach: 'Jasper van Dijk',
			bio: 'Omar heeft een achtergrond in hospitality management in Nigeria. Spreekt vloeiend Engels en leert snel Nederlands.',
			events: [
				{ date: '2025-06-10', title: 'Intake Gesprek', type: 'intake' },
				{ date: '2025-06-24', title: 'Workshop: CV Schrijven', type: 'workshop' },
				{ date: '2025-07-15', title: 'Bedrijfsbezoek Hotel Casa 400', type: 'excursion' },
				{ date: '2025-08-01', title: 'Snuffelstage: Hotel Casa 400', type: 'placement' },
				{ date: '2026-01-20', title: 'Plaatsing: Receptiemedewerker', type: 'placement' },
			],
			certificates: [
				{ id: 1, title: 'Restart Programma Certificaat', date: '2026-01-20', project: 'Restart Amsterdam' },
			],
			questionnaires: [
				{ name: 'Restart Intake', date: '2025-06-10', score: 3.0 },
				{ name: 'Restart Uitstroom', date: '2026-01-20', score: 4.5 },
			],
			placements: [
				{ org: 'Hotel Casa 400', role: 'Receptiemedewerker', date: '2026-01-20', status: 'Actief' },
			],
			notes: [
				{ date: '2026-01-20', author: 'Jasper van Dijk', text: 'Omar is succesvol geplaatst als receptiemedewerker. Zijn Engelse taalvaardigheid is een groot pluspunt.' },
			]
		},
	};

	// Fallback for IDs without rich data
	const basicClients: Record<number, { name: string; origin: string; status: string; project: string; startDate: string; email: string; phone: string; language: string }> = {
		2: { name: 'Mohammed Said', origin: 'Eritrea', status: 'Actief', project: 'Prestart', startDate: '2025-11-01', email: 'mohammed.s@email.com', phone: '+31 6 2345 6789', language: 'Tigrinya' },
		3: { name: 'Fatima Al-Hassan', origin: 'Irak', status: 'Nieuw', project: '-', startDate: '2026-02-20', email: 'fatima.ah@email.com', phone: '+31 6 3456 7890', language: 'Arabisch' },
		5: { name: 'Yara Mousavi', origin: 'Iran', status: 'Actief', project: 'Community Café', startDate: '2025-10-05', email: 'yara.m@email.com', phone: '+31 6 5678 9012', language: 'Farsi' },
		6: { name: 'Hassan Ahmed', origin: 'Somalië', status: 'Actief', project: 'Prestart', startDate: '2026-01-15', email: 'hassan.a@email.com', phone: '+31 6 6789 0123', language: 'Arabisch' },
		7: { name: 'Layla Haddad', origin: 'Libanon', status: 'Uitgestroomd', project: 'Restart', startDate: '2025-03-01', email: 'layla.h@email.com', phone: '+31 6 7890 1234', language: 'Arabisch' },
		8: { name: 'Ibrahim Diallo', origin: 'Guinee', status: 'Actief', project: 'Restart', startDate: '2025-12-01', email: 'ibrahim.d@email.com', phone: '+31 6 8901 2345', language: 'Frans' },
	};

	const client = $derived(allClients[clientId]);
	const basicClient = $derived(basicClients[clientId]);
	const hasFullProfile = $derived(!!client);

	let activeTab = $state<'timeline' | 'certificates' | 'questionnaires' | 'placements' | 'notes'>('timeline');

	function eventIcon(type: string) {
		switch (type) {
			case 'intake': return '📋';
			case 'workshop': return '🎓';
			case 'excursion': return '🏢';
			case 'placement': return '✅';
			case 'evaluation': return '📊';
			default: return '📌';
		}
	}

	function eventColor(type: string) {
		switch (type) {
			case 'intake': return 'bg-blue-100 text-blue-800';
			case 'workshop': return 'bg-purple-100 text-purple-800';
			case 'excursion': return 'bg-amber-100 text-amber-800';
			case 'placement': return 'bg-green-100 text-green-800';
			case 'evaluation': return 'bg-orange-100 text-orange-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	}
</script>

<div class="p-8">
	<!-- Back button -->
	<a href="/demo/clients" class="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition">
		<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
		Terug naar deelnemers
	</a>

	{#if client}
		<!-- Header -->
		<div class="mb-8 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
			<div class="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
				<div class="flex items-center gap-4">
					<div class="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xl font-bold shadow-lg">
						{client.name.split(' ').map((n: string) => n[0]).join('')}
					</div>
					<div>
						<h1 class="text-2xl font-bold text-gray-900">{client.name}</h1>
						<p class="text-gray-500">{client.origin} • {client.language}</p>
						<span class="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium
							{client.status === 'Actief' ? 'bg-green-100 text-green-800' :
							client.status === 'Geplaatst' ? 'bg-purple-100 text-purple-800' :
							client.status === 'Nieuw' ? 'bg-blue-100 text-blue-800' :
							'bg-gray-100 text-gray-800'}
						">{client.status}</span>
					</div>
				</div>
				<div class="flex gap-3">
					<a href="/demo/clients/{client.id}/certificate" class="rounded-lg bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-100 transition">
						🏆 Certificaat
					</a>
					<a href="/demo/questionnaires/fill" class="rounded-lg bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100 transition">
						📋 Vragenlijst
					</a>
				</div>
			</div>
			<p class="mt-4 text-sm text-gray-600 leading-relaxed">{client.bio}</p>
		</div>

		<!-- Info cards -->
		<div class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
			<div class="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
				<p class="text-xs font-medium text-gray-500">E-mail</p>
				<p class="mt-1 text-sm font-medium text-gray-900">{client.email}</p>
			</div>
			<div class="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
				<p class="text-xs font-medium text-gray-500">Telefoon</p>
				<p class="mt-1 text-sm font-medium text-gray-900">{client.phone}</p>
			</div>
			<div class="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
				<p class="text-xs font-medium text-gray-500">Begeleider</p>
				<p class="mt-1 text-sm font-medium text-gray-900">{client.coach}</p>
			</div>
			<div class="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
				<p class="text-xs font-medium text-gray-500">Project</p>
				<p class="mt-1 text-sm font-medium text-gray-900">{client.project}</p>
			</div>
			<div class="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
				<p class="text-xs font-medium text-gray-500">Startdatum</p>
				<p class="mt-1 text-sm font-medium text-gray-900">{client.startDate}</p>
			</div>
			<div class="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
				<p class="text-xs font-medium text-gray-500">Geboortedatum</p>
				<p class="mt-1 text-sm font-medium text-gray-900">{client.dateOfBirth}</p>
			</div>
			<div class="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
				<p class="text-xs font-medium text-gray-500">Adres</p>
				<p class="mt-1 text-sm font-medium text-gray-900">{client.address}</p>
			</div>
			<div class="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
				<p class="text-xs font-medium text-gray-500">BSN</p>
				<p class="mt-1 text-sm font-medium text-gray-900">{client.bsn}</p>
			</div>
		</div>

		<!-- Progress summary -->
		<div class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
			<div class="rounded-xl bg-blue-50 p-4 text-center">
				<p class="text-2xl font-bold text-blue-700">{client.events.length}</p>
				<p class="text-xs text-blue-600">Activiteiten</p>
			</div>
			<div class="rounded-xl bg-amber-50 p-4 text-center">
				<p class="text-2xl font-bold text-amber-700">{client.certificates.length}</p>
				<p class="text-xs text-amber-600">Certificaten</p>
			</div>
			<div class="rounded-xl bg-purple-50 p-4 text-center">
				<p class="text-2xl font-bold text-purple-700">{client.questionnaires.length}</p>
				<p class="text-xs text-purple-600">Vragenlijsten</p>
			</div>
			<div class="rounded-xl bg-green-50 p-4 text-center">
				<p class="text-2xl font-bold text-green-700">{client.placements.length}</p>
				<p class="text-xs text-green-600">Plaatsingen</p>
			</div>
		</div>

		<!-- Tabs -->
		<div class="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1">
			{#each [
				{ key: 'timeline', label: '📅 Tijdlijn' },
				{ key: 'certificates', label: '🏆 Certificaten' },
				{ key: 'questionnaires', label: '📊 Vragenlijsten' },
				{ key: 'placements', label: '✅ Plaatsingen' },
				{ key: 'notes', label: '📝 Notities' },
			] as tab}
				<button
					onclick={() => activeTab = tab.key as typeof activeTab}
					class="flex-1 rounded-md px-4 py-2 text-sm font-medium transition {activeTab === tab.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}"
				>
					{tab.label}
				</button>
			{/each}
		</div>

		<!-- Tab content -->
		<div class="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
			{#if activeTab === 'timeline'}
				<div class="p-6">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">Activiteiten & Gebeurtenissen</h2>
					<div class="relative">
						<div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
						<div class="space-y-6">
							{#each client.events.toReversed() as event}
								<div class="relative flex gap-4 pl-10">
									<div class="absolute left-2 top-1 h-5 w-5 rounded-full bg-white border-2 border-blue-400 flex items-center justify-center text-xs">
										{eventIcon(event.type)}
									</div>
									<div class="flex-1">
										<div class="flex items-center gap-3">
											<span class="text-sm font-medium text-gray-900">{event.title}</span>
											<span class="rounded-full px-2 py-0.5 text-xs font-medium {eventColor(event.type)}">
												{event.type === 'intake' ? 'Intake' : event.type === 'workshop' ? 'Workshop' : event.type === 'excursion' ? 'Bedrijfsbezoek' : event.type === 'placement' ? 'Plaatsing' : 'Evaluatie'}
											</span>
										</div>
										<p class="text-xs text-gray-500 mt-0.5">{event.date}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{:else if activeTab === 'certificates'}
				<div class="p-6">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">Certificaten</h2>
					<div class="space-y-3">
						{#each client.certificates as cert}
							<div class="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 transition">
								<div class="flex items-center gap-3">
									<div class="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center text-lg">🏆</div>
									<div>
										<p class="text-sm font-medium text-gray-900">{cert.title}</p>
										<p class="text-xs text-gray-500">{cert.project} • {cert.date}</p>
									</div>
								</div>
								<a href="/demo/clients/{client.id}/certificate" class="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100 transition">
									Bekijken / Print
								</a>
							</div>
						{/each}
					</div>
				</div>
			{:else if activeTab === 'questionnaires'}
				<div class="p-6">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">Ingevulde Vragenlijsten</h2>
					<div class="space-y-3">
						{#each client.questionnaires as q}
							<div class="flex items-center justify-between rounded-lg border border-gray-100 p-4">
								<div>
									<p class="text-sm font-medium text-gray-900">{q.name}</p>
									<p class="text-xs text-gray-500">{q.date}</p>
								</div>
								{#if q.score !== null}
									<div class="flex items-center gap-2">
										<div class="h-2 w-24 rounded-full bg-gray-200">
											<div class="h-2 rounded-full {q.score >= 4 ? 'bg-green-500' : q.score >= 3 ? 'bg-blue-500' : q.score >= 2 ? 'bg-amber-500' : 'bg-red-500'}" style="width: {(q.score / 5) * 100}%"></div>
										</div>
										<span class="text-sm font-bold {q.score >= 4 ? 'text-green-700' : q.score >= 3 ? 'text-blue-700' : q.score >= 2 ? 'text-amber-700' : 'text-red-700'}">{q.score.toFixed(1)}</span>
									</div>
								{/if}
							</div>
						{/each}
					</div>
					{#if client.questionnaires.length >= 2}
						<div class="mt-4 rounded-lg bg-green-50 p-4">
							<p class="text-sm font-medium text-green-800">
								📈 Vooruitgang: {(client.questionnaires[client.questionnaires.length - 1].score! - client.questionnaires[0].score!).toFixed(1)} punten verbetering
								van {client.questionnaires[0].score!.toFixed(1)} naar {client.questionnaires[client.questionnaires.length - 1].score!.toFixed(1)}
							</p>
						</div>
					{/if}
				</div>
			{:else if activeTab === 'placements'}
				<div class="p-6">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">Plaatsingen & Stages</h2>
					<div class="space-y-3">
						{#each client.placements as p}
							<div class="flex items-center justify-between rounded-lg border border-gray-100 p-4">
								<div class="flex items-center gap-3">
									<div class="h-10 w-10 rounded-lg {p.status === 'Actief' ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center text-lg">
										{p.status === 'Actief' ? '✅' : '📋'}
									</div>
									<div>
										<p class="text-sm font-medium text-gray-900">{p.role}</p>
										<p class="text-xs text-gray-500">{p.org} • {p.date}</p>
									</div>
								</div>
								<span class="rounded-full px-2 py-0.5 text-xs font-medium {p.status === 'Actief' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
									{p.status}
								</span>
							</div>
						{/each}
					</div>
				</div>
			{:else if activeTab === 'notes'}
				<div class="p-6">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">Begeleidingsnotities</h2>
					<div class="space-y-4">
						{#each client.notes as note}
							<div class="rounded-lg border border-gray-100 p-4">
								<div class="mb-2 flex items-center justify-between">
									<span class="text-sm font-medium text-gray-900">{note.author}</span>
									<span class="text-xs text-gray-500">{note.date}</span>
								</div>
								<p class="text-sm text-gray-600 leading-relaxed">{note.text}</p>
							</div>
						{/each}
					</div>
					<!-- Add note form -->
					<div class="mt-4 rounded-lg border-2 border-dashed border-gray-200 p-4">
						<textarea placeholder="Nieuwe notitie schrijven..." class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" rows="3"></textarea>
						<button class="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">Notitie Toevoegen</button>
					</div>
				</div>
			{/if}
		</div>

	{:else if basicClient}
		<!-- Basic profile for clients without full demo data -->
		<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100 mb-6">
			<div class="flex items-center gap-4">
				<div class="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xl font-bold shadow-lg">
					{basicClient.name.split(' ').map((n: string) => n[0]).join('')}
				</div>
				<div>
					<h1 class="text-2xl font-bold text-gray-900">{basicClient.name}</h1>
					<p class="text-gray-500">{basicClient.origin} • {basicClient.language}</p>
					<span class="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium
						{basicClient.status === 'Actief' ? 'bg-green-100 text-green-800' :
						basicClient.status === 'Geplaatst' ? 'bg-purple-100 text-purple-800' :
						basicClient.status === 'Nieuw' ? 'bg-blue-100 text-blue-800' :
						'bg-gray-100 text-gray-800'}
					">{basicClient.status}</span>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
			<div class="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
				<p class="text-xs font-medium text-gray-500">E-mail</p>
				<p class="mt-1 text-sm font-medium text-gray-900">{basicClient.email}</p>
			</div>
			<div class="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
				<p class="text-xs font-medium text-gray-500">Telefoon</p>
				<p class="mt-1 text-sm font-medium text-gray-900">{basicClient.phone}</p>
			</div>
			<div class="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
				<p class="text-xs font-medium text-gray-500">Project</p>
				<p class="mt-1 text-sm font-medium text-gray-900">{basicClient.project}</p>
			</div>
			<div class="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
				<p class="text-xs font-medium text-gray-500">Startdatum</p>
				<p class="mt-1 text-sm font-medium text-gray-900">{basicClient.startDate}</p>
			</div>
		</div>

		<div class="rounded-xl bg-blue-50 border border-blue-100 p-6 text-center">
			<p class="text-sm text-blue-700">Dit is een demo. Uitgebreid profiel beschikbaar voor <strong>Amira Khalil</strong> (ID 1) en <strong>Omar Bello</strong> (ID 4).</p>
			<div class="mt-3 flex justify-center gap-3">
				<a href="/demo/clients/1" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">Bekijk Amira's profiel</a>
				<a href="/demo/clients/4" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">Bekijk Omar's profiel</a>
			</div>
		</div>

	{:else}
		<div class="rounded-xl bg-white p-12 text-center shadow-sm border border-gray-100">
			<p class="text-lg text-gray-500">Deelnemer niet gevonden</p>
			<a href="/demo/clients" class="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
				Terug naar overzicht
			</a>
		</div>
	{/if}
</div>
