<script lang="ts">
	const stats = [
		{ label: 'Actieve Deelnemers', value: '247', change: '+12 deze maand', up: true },
		{ label: 'Organisaties', value: '58', change: '+3 deze maand', up: true },
		{ label: 'Plaatsingen', value: '183', change: '+8 deze maand', up: true },
		{ label: 'Gemiddelde Verbetering', value: '34%', change: 'intake → uitstroom', up: true }
	];

	const recentActivity = [
		{ type: 'placement', text: 'Amira K. geplaatst bij Restaurant De Plantage', time: '2 uur geleden' },
		{ type: 'questionnaire', text: 'Uitstroom vragenlijst ingevuld door Mohammed S.', time: '3 uur geleden' },
		{ type: 'event', text: 'Workshop "CV Schrijven" — 18 deelnemers', time: 'Gisteren' },
		{ type: 'client', text: 'Nieuwe deelnemer: Fatima A. aangemeld voor Prestart', time: 'Gisteren' },
		{ type: 'placement', text: 'Omar B. geplaatst bij Hotel Casa 400', time: '2 dagen geleden' }
	];
</script>

<div class="p-8">
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
		<p class="text-gray-500">Welkom terug, Merel. Hier is je overzicht.</p>
	</div>

	<!-- Stats Grid -->
	<div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each stats as stat}
			<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
				<p class="text-sm font-medium text-gray-500">{stat.label}</p>
				<p class="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
				<p class="mt-1 text-sm text-green-600">↑ {stat.change}</p>
			</div>
		{/each}
	</div>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		<!-- Recent Activity -->
		<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Recente Activiteit</h2>
			<div class="space-y-4">
				{#each recentActivity as item}
					<div class="flex items-start gap-3">
						<div class="mt-0.5 h-2 w-2 rounded-full {item.type === 'placement' ? 'bg-green-500' : item.type === 'questionnaire' ? 'bg-purple-500' : item.type === 'event' ? 'bg-blue-500' : 'bg-orange-500'}"></div>
						<div>
							<p class="text-sm text-gray-700">{item.text}</p>
							<p class="text-xs text-gray-400">{item.time}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Quick Actions -->
		<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Snelle Acties</h2>
			<div class="grid grid-cols-2 gap-3">
				<a href="/demo/clients" class="rounded-lg bg-blue-50 p-4 text-center transition hover:bg-blue-100">
					<p class="text-2xl">👤</p>
					<p class="mt-1 text-sm font-medium text-blue-700">Nieuwe Deelnemer</p>
				</a>
				<a href="/demo/questionnaires" class="rounded-lg bg-purple-50 p-4 text-center transition hover:bg-purple-100">
					<p class="text-2xl">📋</p>
					<p class="mt-1 text-sm font-medium text-purple-700">Vragenlijst Maken</p>
				</a>
				<a href="/demo/activities" class="rounded-lg bg-green-50 p-4 text-center transition hover:bg-green-100">
					<p class="text-2xl">📅</p>
					<p class="mt-1 text-sm font-medium text-green-700">Activiteit Plannen</p>
				</a>
				<a href="/demo/impact" class="rounded-lg bg-orange-50 p-4 text-center transition hover:bg-orange-100">
					<p class="text-2xl">📊</p>
					<p class="mt-1 text-sm font-medium text-orange-700">Impact Bekijken</p>
				</a>
			</div>
		</div>
	</div>

	<!-- Banner -->
	<div class="mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
		<p class="text-sm font-medium text-blue-100">Dit is een interactieve demo</p>
		<h3 class="mt-1 text-xl font-bold">Klik door de navigatie om alle functionaliteiten te verkennen</h3>
		<p class="mt-2 text-sm text-blue-200">Dashboard • Deelnemers • Organisaties • Vragenlijsten • Impact Dashboard</p>
	</div>
</div>
