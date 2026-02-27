<script lang="ts">
	let currentQuestion = $state(0);
	let answers = $state<Record<number, string | number>>({});
	let isRTL = $state(false);
	let selectedLanguage = $state('nl');
	let submitted = $state(false);

	const questions = [
		{
			id: 1,
			text: { nl: 'Hoe zelfverzekerd voel je je over het vinden van werk?', en: 'How confident do you feel about finding work?', ar: 'ما مدى ثقتك في العثور على عمل؟' },
			type: 'scale',
			timing: 'both'
		},
		{
			id: 2,
			text: { nl: 'Hoe goed spreek je Nederlands?', en: 'How well do you speak Dutch?', ar: 'ما مدى إجادتك للغة الهولندية؟' },
			type: 'multiple_choice',
			options: {
				nl: ['Beginner', 'Basis', 'Gemiddeld', 'Goed', 'Vloeiend'],
				en: ['Beginner', 'Basic', 'Intermediate', 'Good', 'Fluent'],
				ar: ['مبتدئ', 'أساسي', 'متوسط', 'جيد', 'طلاقة']
			},
			timing: 'both'
		},
		{
			id: 3,
			text: { nl: 'Hoeveel sollicitaties heb je gedaan in de afgelopen maand?', en: 'How many job applications have you made in the last month?', ar: 'كم طلب عمل قدمت في الشهر الماضي؟' },
			type: 'multiple_choice',
			options: {
				nl: ['0', '1-3', '4-6', '7-10', 'Meer dan 10'],
				en: ['0', '1-3', '4-6', '7-10', 'More than 10'],
				ar: ['0', '1-3', '4-6', '7-10', 'أكثر من 10']
			},
			timing: 'both'
		},
		{
			id: 4,
			text: { nl: 'Hoe tevreden ben je met je huidige situatie?', en: 'How satisfied are you with your current situation?', ar: 'ما مدى رضاك عن وضعك الحالي؟' },
			type: 'scale',
			timing: 'both'
		},
		{
			id: 5,
			text: { nl: 'Wat zijn je belangrijkste doelen voor de komende 3 maanden?', en: 'What are your main goals for the next 3 months?', ar: 'ما هي أهدافك الرئيسية للأشهر الثلاثة القادمة؟' },
			type: 'open',
			timing: 'intake'
		},
		{
			id: 6,
			text: { nl: 'Wat heb je het meest geleerd tijdens dit traject?', en: 'What have you learned the most during this program?', ar: 'ما الذي تعلمته أكثر خلال هذا البرنامج؟' },
			type: 'open',
			timing: 'outtake'
		}
	];

	function getText(q: typeof questions[0]) {
		return (q.text as Record<string, string>)[selectedLanguage] ?? q.text.nl;
	}

	function getOptions(q: typeof questions[0]) {
		if ('options' in q && q.options) {
			return (q.options as Record<string, string[]>)[selectedLanguage] ?? q.options.nl;
		}
		return [];
	}

	const progress = $derived(Math.round(((currentQuestion + 1) / questions.length) * 100));
</script>

<div class="p-8" dir={isRTL ? 'rtl' : 'ltr'}>
	<div class="mx-auto max-w-2xl">
		<div class="mb-6 flex items-center justify-between">
			<div>
				<h1 class="text-2xl font-bold text-gray-900">{isRTL ? 'استبيان' : 'Vragenlijst Invullen'}</h1>
				<p class="text-gray-500">Restart Amsterdam — Intake</p>
			</div>
			<div class="flex items-center gap-3">
				<select
					bind:value={selectedLanguage}
					onchange={() => isRTL = selectedLanguage === 'ar'}
					class="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
				>
					<option value="nl">🇳🇱 Nederlands</option>
					<option value="en">🇬🇧 English</option>
					<option value="ar">🇸🇦 العربية</option>
				</select>
			</div>
		</div>

		{#if !submitted}
			<!-- Progress bar -->
			<div class="mb-6">
				<div class="flex items-center justify-between text-sm text-gray-500 mb-1">
					<span>{isRTL ? `سؤال ${currentQuestion + 1} من ${questions.length}` : `Vraag ${currentQuestion + 1} van ${questions.length}`}</span>
					<span>{progress}%</span>
				</div>
				<div class="h-2 w-full rounded-full bg-gray-200">
					<div class="h-2 rounded-full bg-blue-600 transition-all" style="width: {progress}%"></div>
				</div>
			</div>

			<!-- Question Card -->
			{@const q = questions[currentQuestion]}
			<div class="rounded-xl bg-white p-8 shadow-sm border border-gray-100">
				<h2 class="mb-6 text-xl font-semibold text-gray-900">{getText(q)}</h2>

				{#if q.type === 'scale'}
					<div class="flex justify-between gap-2">
						{#each [1, 2, 3, 4, 5] as n}
							<button
								onclick={() => answers[q.id] = n}
								class="flex h-16 w-16 flex-col items-center justify-center rounded-xl border-2 transition
									{answers[q.id] === n ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300 text-gray-500'}
								"
							>
								<span class="text-xl font-bold">{n}</span>
								<span class="text-xs">{n === 1 ? (isRTL ? 'ضعيف' : 'Laag') : n === 5 ? (isRTL ? 'ممتاز' : 'Hoog') : ''}</span>
							</button>
						{/each}
					</div>
				{:else if q.type === 'multiple_choice'}
					<div class="space-y-3">
						{#each getOptions(q) as option, i}
							<button
								onclick={() => answers[q.id] = i}
								class="w-full rounded-lg border-2 px-4 py-3 text-left transition
									{answers[q.id] === i ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300'}
								"
							>
								{option}
							</button>
						{/each}
					</div>
				{:else}
					<textarea
						placeholder={isRTL ? 'اكتب إجابتك هنا...' : 'Typ je antwoord hier...'}
						class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
						rows="4"
						oninput={(e) => answers[q.id] = (e.target as HTMLTextAreaElement).value}
					></textarea>
				{/if}

				<div class="mt-8 flex justify-between">
					<button
						onclick={() => currentQuestion = Math.max(0, currentQuestion - 1)}
						disabled={currentQuestion === 0}
						class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
					>
						{isRTL ? 'السابق' : '← Vorige'}
					</button>
					{#if currentQuestion < questions.length - 1}
						<button
							onclick={() => currentQuestion = Math.min(questions.length - 1, currentQuestion + 1)}
							class="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
						>
							{isRTL ? 'التالي' : 'Volgende →'}
						</button>
					{:else}
						<button
							onclick={() => submitted = true}
							class="rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-green-700"
						>
							{isRTL ? 'إرسال' : 'Versturen ✓'}
						</button>
					{/if}
				</div>
			</div>
		{:else}
			<!-- Success -->
			<div class="rounded-xl bg-white p-12 shadow-sm border border-gray-100 text-center">
				<div class="text-6xl mb-4">✅</div>
				<h2 class="text-2xl font-bold text-gray-900 mb-2">
					{isRTL ? 'شكرا لك!' : 'Bedankt!'}
				</h2>
				<p class="text-gray-500 mb-6">
					{isRTL ? 'تم إرسال إجاباتك بنجاح' : 'Je antwoorden zijn succesvol verzonden'}
				</p>
				<div class="flex justify-center gap-3">
					<button
						onclick={() => { submitted = false; currentQuestion = 0; answers = {}; }}
						class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
					>
						{isRTL ? 'أعد الملء' : 'Opnieuw Invullen'}
					</button>
					<a href="/demo/questionnaires" class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
						{isRTL ? 'العودة' : 'Terug naar Vragenlijsten'}
					</a>
				</div>
			</div>
		{/if}
	</div>
</div>
