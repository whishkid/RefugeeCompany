<script lang="ts">
	let timeRange = $state('6m');

	const overallStats = [
		{ label: 'Totaal Deelnemers', value: '247', sub: 'sinds start' },
		{ label: 'Succesvolle Plaatsingen', value: '183', sub: '74% plaatsingspercentage' },
		{ label: 'Gem. Verbetering', value: '+34%', sub: 'intake → uitstroom' },
		{ label: 'Actieve Projecten', value: '5', sub: '3 locaties' }
	];

	const categories = [
		{ name: 'Zelfvertrouwen', intake: 2.1, outtake: 3.8, improvement: '+81%' },
		{ name: 'Nederlands Taalvaardigheid', intake: 1.8, outtake: 3.2, improvement: '+78%' },
		{ name: 'Sollicitatievaardigheden', intake: 1.5, outtake: 3.6, improvement: '+140%' },
		{ name: 'Werkervaring', intake: 1.9, outtake: 4.1, improvement: '+116%' },
		{ name: 'Netwerk in Nederland', intake: 1.4, outtake: 3.0, improvement: '+114%' },
		{ name: 'Digitale Vaardigheden', intake: 2.3, outtake: 3.5, improvement: '+52%' },
		{ name: 'Kennis Arbeidsmarkt', intake: 1.6, outtake: 3.4, improvement: '+113%' },
		{ name: 'Tevredenheid', intake: 2.5, outtake: 4.2, improvement: '+68%' },
	];

	const monthlyData = [
		{ month: 'Sep', intake: 15, outtake: 8, placements: 5 },
		{ month: 'Okt', intake: 22, outtake: 12, placements: 9 },
		{ month: 'Nov', intake: 18, outtake: 14, placements: 11 },
		{ month: 'Dec', intake: 12, outtake: 10, placements: 8 },
		{ month: 'Jan', intake: 25, outtake: 16, placements: 12 },
		{ month: 'Feb', intake: 20, outtake: 18, placements: 14 },
	];

	const topPerformers = [
		{ name: 'Amira Khalil', improvement: '+52%', project: 'Restart' },
		{ name: 'Omar Bello', improvement: '+48%', project: 'Restart' },
		{ name: 'Yara Mousavi', improvement: '+45%', project: 'Community Café' },
		{ name: 'Hassan Ahmed', improvement: '+42%', project: 'Prestart' },
		{ name: 'Layla Haddad', improvement: '+40%', project: 'Restart' },
	];
</script>

<div class="p-8">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Impact Dashboard</h1>
			<p class="text-gray-500">Meetbare impact van A Beautiful Mess programma's</p>
		</div>
		<div class="flex items-center gap-3">
			<select bind:value={timeRange} class="rounded-md border border-gray-300 px-3 py-1.5 text-sm">
				<option value="3m">Laatste 3 maanden</option>
				<option value="6m">Laatste 6 maanden</option>
				<option value="1y">Laatste jaar</option>
				<option value="all">Alles</option>
			</select>
			<button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow">📊 Exporteer Rapport</button>
		</div>
	</div>

	<!-- Overview Stats -->
	<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each overallStats as stat}
			<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
				<p class="text-sm font-medium text-gray-500">{stat.label}</p>
				<p class="mt-1 text-3xl font-bold text-gray-900">{stat.value}</p>
				<p class="text-xs text-gray-400">{stat.sub}</p>
			</div>
		{/each}
	</div>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		<!-- Improvement by Category -->
		<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Verbetering per Categorie</h2>
			<p class="mb-4 text-xs text-gray-500">Gemiddelde score (1-5) intake vs. uitstroom</p>
			<div class="space-y-3">
				{#each categories as cat}
					<div>
						<div class="flex items-center justify-between text-sm">
							<span class="text-gray-700">{cat.name}</span>
							<span class="font-medium text-green-600">{cat.improvement}</span>
						</div>
						<div class="mt-1 flex items-center gap-2">
							<div class="h-2 flex-1 rounded-full bg-gray-100 overflow-hidden">
								<div class="relative h-full">
									<div class="absolute h-full rounded-full bg-red-300 opacity-60" style="width: {(cat.intake / 5) * 100}%"></div>
									<div class="absolute h-full rounded-full bg-green-500" style="width: {(cat.outtake / 5) * 100}%"></div>
								</div>
							</div>
							<span class="w-16 text-right text-xs text-gray-500">{cat.intake} → {cat.outtake}</span>
						</div>
					</div>
				{/each}
			</div>
			<div class="mt-4 flex gap-4 text-xs text-gray-500">
				<span class="flex items-center gap-1"><span class="inline-block h-2 w-4 rounded bg-red-300 opacity-60"></span> Intake</span>
				<span class="flex items-center gap-1"><span class="inline-block h-2 w-4 rounded bg-green-500"></span> Uitstroom</span>
			</div>
		</div>

		<!-- Monthly Overview (simplified bar chart) -->
		<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Maandelijks Overzicht</h2>
			<div class="flex items-end gap-3 h-48">
				{#each monthlyData as month}
					<div class="flex-1 flex flex-col items-center gap-1">
						<div class="w-full flex gap-0.5 justify-center items-end" style="height: 140px">
							<div class="w-3 rounded-t bg-blue-400" style="height: {(month.intake / 25) * 140}px" title="Intake: {month.intake}"></div>
							<div class="w-3 rounded-t bg-purple-400" style="height: {(month.outtake / 25) * 140}px" title="Uitstroom: {month.outtake}"></div>
							<div class="w-3 rounded-t bg-green-500" style="height: {(month.placements / 25) * 140}px" title="Plaatsingen: {month.placements}"></div>
						</div>
						<span class="text-xs text-gray-500">{month.month}</span>
					</div>
				{/each}
			</div>
			<div class="mt-4 flex gap-4 text-xs text-gray-500">
				<span class="flex items-center gap-1"><span class="inline-block h-2 w-4 rounded bg-blue-400"></span> Intake</span>
				<span class="flex items-center gap-1"><span class="inline-block h-2 w-4 rounded bg-purple-400"></span> Uitstroom</span>
				<span class="flex items-center gap-1"><span class="inline-block h-2 w-4 rounded bg-green-500"></span> Plaatsingen</span>
			</div>
		</div>

		<!-- Top Performers -->
		<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Meeste Groei</h2>
			<div class="space-y-3">
				{#each topPerformers as person, i}
					<div class="flex items-center gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">{i + 1}</span>
						<div class="flex-1">
							<p class="text-sm font-medium text-gray-900">{person.name}</p>
							<p class="text-xs text-gray-500">{person.project}</p>
						</div>
						<span class="text-lg font-bold text-green-600">{person.improvement}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Project Comparison -->
		<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">Impact per Project</h2>
			<div class="space-y-4">
				<div class="rounded-lg bg-blue-50 p-4">
					<div class="flex items-center justify-between">
						<h3 class="font-medium text-blue-900">Restart</h3>
						<span class="text-lg font-bold text-blue-700">+38%</span>
					</div>
					<p class="text-sm text-blue-600">40 deelnemers • 28 plaatsingen (70%)</p>
				</div>
				<div class="rounded-lg bg-green-50 p-4">
					<div class="flex items-center justify-between">
						<h3 class="font-medium text-green-900">Prestart</h3>
						<span class="text-lg font-bold text-green-700">+29%</span>
					</div>
					<p class="text-sm text-green-600">36 deelnemers • doorstroom naar Restart</p>
				</div>
				<div class="rounded-lg bg-purple-50 p-4">
					<div class="flex items-center justify-between">
						<h3 class="font-medium text-purple-900">Community Café</h3>
						<span class="text-lg font-bold text-purple-700">+25%</span>
					</div>
					<p class="text-sm text-purple-600">35 deelnemers • doorlopend programma</p>
				</div>
			</div>
		</div>
	</div>
</div>
