<script lang="ts">
	let showBuilder = $state(false);
	let editingId = $state<number | null>(null);
	let builderName = $state('');
	let builderProject = $state('Restart Amsterdam');
	let builderLanguages = $state<Record<string, boolean>>({ NL: true, EN: true, AR: false, FA: false, TI: false, FR: false });
	let newQuestionType = $state('multiple_choice');
	let newQuestionTiming = $state('both');
	let newQuestionText = $state('');
	let questions = $state([
		{ id: 1, text: 'Hoe zelfverzekerd voel je je over het vinden van werk?', type: 'scale', timing: 'both' },
		{ id: 2, text: 'Hoe goed spreek je Nederlands?', type: 'multiple_choice', timing: 'both' },
		{ id: 3, text: 'Wat zijn je grootste uitdagingen op dit moment?', type: 'open', timing: 'intake' },
	]);
	let savedMessage = $state('');

	// Editable questionnaire data — each has its own questions
	let questionnaires = $state([
		{
			id: 1, name: 'Restart Intake/Uitstroom', project: 'Restart Amsterdam',
			languages: ['NL', 'EN', 'AR', 'FA'], responses: 42,
			questions: [
				{ id: 1, text: 'Hoe zelfverzekerd voel je je over het vinden van werk?', type: 'scale', timing: 'both' },
				{ id: 2, text: 'Hoe goed spreek je Nederlands?', type: 'multiple_choice', timing: 'both' },
				{ id: 3, text: 'Wat zijn je grootste uitdagingen op dit moment?', type: 'open', timing: 'intake' },
				{ id: 4, text: 'Hoe voel je je op sociaal vlak?', type: 'scale', timing: 'both' },
				{ id: 5, text: 'Welke vaardigheden wil je ontwikkelen?', type: 'open', timing: 'intake' },
			]
		},
		{
			id: 2, name: 'Prestart Intake/Uitstroom', project: 'Prestart Amsterdam',
			languages: ['NL', 'EN', 'AR'], responses: 28,
			questions: [
				{ id: 1, text: 'Hoe lang woon je in Nederland?', type: 'multiple_choice', timing: 'intake' },
				{ id: 2, text: 'Hoe beoordeel je je eigen taalvaardigheid?', type: 'scale', timing: 'both' },
				{ id: 3, text: 'Wat is je werkervaring?', type: 'open', timing: 'intake' },
			]
		},
		{
			id: 3, name: 'Workshop Feedback', project: 'Algemeen',
			languages: ['NL', 'EN'], responses: 156,
			questions: [
				{ id: 1, text: 'Hoe nuttig vond je de workshop?', type: 'scale', timing: 'both' },
				{ id: 2, text: 'Wat heb je het meest geleerd?', type: 'open', timing: 'both' },
			]
		},
		{
			id: 4, name: 'Community Café Evaluatie', project: 'Community Café',
			languages: ['NL', 'EN', 'AR', 'TI'], responses: 63,
			questions: [
				{ id: 1, text: 'Hoe welkom voel je je bij het café?', type: 'scale', timing: 'both' },
				{ id: 2, text: 'Wat zou je willen verbeteren?', type: 'open', timing: 'both' },
			]
		},
	]);

	function openNewBuilder() {
		editingId = null;
		builderName = '';
		builderProject = 'Restart Amsterdam';
		builderLanguages = { NL: true, EN: true, AR: false, FA: false, TI: false, FR: false };
		questions = [
			{ id: 1, text: 'Hoe zelfverzekerd voel je je over het vinden van werk?', type: 'scale', timing: 'both' },
			{ id: 2, text: 'Hoe goed spreek je Nederlands?', type: 'multiple_choice', timing: 'both' },
			{ id: 3, text: 'Wat zijn je grootste uitdagingen op dit moment?', type: 'open', timing: 'intake' },
		];
		showBuilder = true;
	}

	function openEditBuilder(q: typeof questionnaires[0]) {
		editingId = q.id;
		builderName = q.name;
		builderProject = q.project;
		const langMap: Record<string, boolean> = { NL: false, EN: false, AR: false, FA: false, TI: false, FR: false };
		q.languages.forEach(l => langMap[l] = true);
		builderLanguages = langMap;
		questions = q.questions.map(qq => ({ ...qq }));
		showBuilder = true;
	}

	function saveBuilder() {
		if (editingId !== null) {
			const idx = questionnaires.findIndex(q => q.id === editingId);
			if (idx !== -1) {
				questionnaires[idx] = {
					...questionnaires[idx],
					name: builderName || questionnaires[idx].name,
					project: builderProject,
					languages: Object.entries(builderLanguages).filter(([, v]) => v).map(([k]) => k),
					questions: questions.map(q => ({ ...q })),
				};
			}
			savedMessage = `"${questionnaires[idx].name}" is bijgewerkt!`;
		} else {
			questionnaires = [...questionnaires, {
				id: Date.now(),
				name: builderName || 'Nieuwe Vragenlijst',
				project: builderProject,
				languages: Object.entries(builderLanguages).filter(([, v]) => v).map(([k]) => k),
				responses: 0,
				questions: questions.map(q => ({ ...q })),
			}];
			savedMessage = `"${builderName || 'Nieuwe Vragenlijst'}" is aangemaakt!`;
		}
		showBuilder = false;
		setTimeout(() => savedMessage = '', 3000);
	}

	function addQuestion() {
		questions = [...questions, {
			id: Date.now(),
			text: newQuestionText || 'Nieuwe vraag',
			type: newQuestionType,
			timing: newQuestionTiming
		}];
		newQuestionText = '';
	}
</script>

<div class="p-8">
	<!-- Save notification -->
	{#if savedMessage}
		<div class="fixed top-4 right-4 z-50 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-lg animate-pulse">
			✓ {savedMessage}
		</div>
	{/if}

	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Vragenlijsten</h1>
			<p class="text-gray-500">Intake & uitstroom vragenlijsten beheren</p>
		</div>
		<button
			onclick={openNewBuilder}
			class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-blue-700"
		>
			+ Nieuwe Vragenlijst
		</button>
	</div>

	<!-- Questionnaire Builder -->
	{#if showBuilder}
		<div class="mb-8 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
			<h2 class="mb-4 text-lg font-semibold text-gray-900">
			{editingId ? 'Vragenlijst Bewerken' : 'Vragenlijst Samenstellen'}
		</h2>

			<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
				<div>
					<label class="block text-sm font-medium text-gray-700">Naam</label>
					<input type="text" bind:value={builderName} placeholder="bijv. Restart Intake 2026" class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Project</label>
					<select bind:value={builderProject} class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
						<option>Restart Amsterdam</option>
						<option>Restart Utrecht</option>
						<option>Prestart Amsterdam</option>
						<option>Community Café</option>
						<option>Algemeen</option>
					</select>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700">Talen</label>
					<div class="mt-1 flex flex-wrap gap-2">
						{#each ['NL', 'EN', 'AR', 'FA', 'TI', 'FR'] as lang}
							<label class="flex items-center gap-1 text-sm"><input type="checkbox" bind:checked={builderLanguages[lang]} class="rounded" /> {lang}</label>
						{/each}
					</div>
				</div>
			</div>

			<!-- Questions -->
			<h3 class="mb-3 font-medium text-gray-700">Vragen</h3>
			<div class="space-y-3 mb-4">
				{#each questions as q, i (q.id)}
					<div class="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
						<span class="text-sm font-medium text-gray-400">{i + 1}.</span>
						<span class="flex-1 text-sm text-gray-800">{q.text}</span>
						<span class="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">{q.type}</span>
						<span class="rounded-full px-2 py-0.5 text-xs {q.timing === 'both' ? 'bg-green-100 text-green-800' : q.timing === 'intake' ? 'bg-orange-100 text-orange-800' : 'bg-purple-100 text-purple-800'}">
							{q.timing === 'both' ? 'Intake + Uitstroom' : q.timing === 'intake' ? 'Alleen Intake' : 'Alleen Uitstroom'}
						</span>
						<button onclick={() => questions = questions.filter(qq => qq.id !== q.id)} class="text-red-400 hover:text-red-600">✕</button>
					</div>
				{/each}
			</div>

			<!-- Add question form -->
			<div class="rounded-lg border-2 border-dashed border-gray-200 p-4">
				<p class="mb-2 text-sm font-medium text-gray-700">Nieuwe vraag toevoegen</p>
				<div class="flex gap-3">
					<input type="text" bind:value={newQuestionText} placeholder="Typ je vraag..." class="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm" />
					<select bind:value={newQuestionType} class="rounded-md border border-gray-300 px-3 py-2 text-sm">
						<option value="multiple_choice">Meerkeuze</option>
						<option value="scale">Schaal (1-5)</option>
						<option value="open">Open vraag</option>
					</select>
					<select bind:value={newQuestionTiming} class="rounded-md border border-gray-300 px-3 py-2 text-sm">
						<option value="both">Intake + Uitstroom</option>
						<option value="intake">Alleen Intake</option>
						<option value="outtake">Alleen Uitstroom</option>
					</select>
					<button
						onclick={addQuestion}
						class="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white"
					>
						Toevoegen
					</button>
				</div>
				<div class="mt-3 flex items-center gap-2">
					<button class="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100">
						🤖 AI Vertaling Genereren
					</button>
					<span class="text-xs text-gray-400">Vertaal automatisch naar geselecteerde talen inclusief RTL</span>
				</div>
			</div>

			<div class="mt-4 flex gap-3">
				<button onclick={saveBuilder} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">{editingId ? 'Wijzigingen Opslaan' : 'Opslaan'}</button>
				<button onclick={() => showBuilder = false} class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">Annuleren</button>
			</div>
		</div>
	{/if}

	<!-- Existing Questionnaires -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each questionnaires as q (q.id)}
			<div class="rounded-xl bg-white p-6 shadow-sm border border-gray-100 transition hover:shadow-md">
				<div class="flex items-start justify-between">
					<div>
						<h3 class="text-lg font-semibold text-gray-900">{q.name}</h3>
						<p class="text-sm text-gray-500">{q.project} • {q.questions.length} vragen</p>
					</div>
					<div class="flex gap-1">
						{#each q.languages as lang}
							<span class="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600">{lang}</span>
						{/each}
					</div>
				</div>
				<div class="mt-4 flex items-center justify-between">
					<span class="text-sm text-gray-500">{q.responses} ingevulde vragenlijsten</span>
					<div class="flex gap-2">
						<a href="/demo/questionnaires/fill" class="rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-100">Invullen</a>
						<button onclick={() => openEditBuilder(q)} class="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100">Bewerken</button>
						<button class="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100">Resultaten</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
