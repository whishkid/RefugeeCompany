<script lang="ts">
	import { page } from '$app/state';

	const clientId = $derived(Number(page.params.id));

	const clientData: Record<number, { name: string; project: string; date: string; coach: string }> = {
		1: { name: 'Amira Khalil', project: 'Restart Amsterdam', date: '15 februari 2026', coach: 'Merel Macedo' },
		2: { name: 'Mohammed Said', project: 'Prestart Amsterdam', date: '27 februari 2026', coach: 'Merel Macedo' },
		3: { name: 'Fatima Al-Hassan', project: 'Intake', date: '20 februari 2026', coach: 'Merel Macedo' },
		4: { name: 'Omar Bello', project: 'Restart Amsterdam', date: '20 januari 2026', coach: 'Jasper van Dijk' },
		5: { name: 'Yara Mousavi', project: 'Community Café', date: '5 februari 2026', coach: 'Merel Macedo' },
		6: { name: 'Hassan Ahmed', project: 'Prestart Amsterdam', date: '15 januari 2026', coach: 'Jasper van Dijk' },
		7: { name: 'Layla Haddad', project: 'Restart Amsterdam', date: '1 maart 2025', coach: 'Merel Macedo' },
		8: { name: 'Ibrahim Diallo', project: 'Restart Amsterdam', date: '1 december 2025', coach: 'Merel Macedo' },
	};

	const client = $derived(clientData[clientId] ?? { name: 'Deelnemer', project: 'Programma', date: '27 februari 2026', coach: 'Begeleider' });

	function printCertificate() {
		window.print();
	}
</script>

<svelte:head>
	<style>
		@media print {
			body { margin: 0; padding: 0; }
			.no-print { display: none !important; }
			.print-only { display: block !important; }
			.certificate-container { box-shadow: none !important; margin: 0 !important; border-radius: 0 !important; }
		}
	</style>
</svelte:head>

<!-- Controls (hidden on print) -->
<div class="no-print p-6 bg-gray-50">
	<div class="mx-auto max-w-4xl flex items-center justify-between">
		<a href="/demo/clients/{clientId}" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition">
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
			Terug naar profiel
		</a>
		<div class="flex gap-3">
			<button onclick={printCertificate} class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
				🖨️ Afdrukken / PDF Opslaan
			</button>
		</div>
	</div>
	<p class="mx-auto max-w-4xl mt-2 text-xs text-gray-400">Gebruik "Afdrukken" → "Opslaan als PDF" voor een PDF-bestand</p>
</div>

<!-- Certificate -->
<div class="mx-auto max-w-4xl p-6">
	<div class="certificate-container relative overflow-hidden rounded-2xl bg-white shadow-2xl" style="aspect-ratio: 1.414;">
		<!-- Decorative border -->
		<div class="absolute inset-3 rounded-xl border-2 border-blue-200"></div>
		<div class="absolute inset-5 rounded-lg border border-blue-100"></div>

		<!-- Corner decorations -->
		<div class="absolute top-6 left-6 h-12 w-12 border-t-4 border-l-4 border-blue-400 rounded-tl-lg"></div>
		<div class="absolute top-6 right-6 h-12 w-12 border-t-4 border-r-4 border-blue-400 rounded-tr-lg"></div>
		<div class="absolute bottom-6 left-6 h-12 w-12 border-b-4 border-l-4 border-blue-400 rounded-bl-lg"></div>
		<div class="absolute bottom-6 right-6 h-12 w-12 border-b-4 border-r-4 border-blue-400 rounded-br-lg"></div>

		<!-- Content -->
		<div class="relative flex h-full flex-col items-center justify-between px-16 py-14 text-center">
			<!-- Header -->
			<div>
				<div class="mb-2 flex items-center justify-center gap-3">
					<div class="h-0.5 w-16 bg-gradient-to-r from-transparent to-blue-400"></div>
					<svg class="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
					</svg>
					<div class="h-0.5 w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
				</div>
				<h2 class="text-sm font-medium uppercase tracking-[0.3em] text-blue-400">A Beautiful Mess</h2>
				<p class="text-xs text-gray-400 mt-0.5">Refugee Company Amsterdam</p>
			</div>

			<!-- Main title -->
			<div class="flex-1 flex flex-col items-center justify-center gap-6">
				<div>
					<h1 class="font-serif text-4xl font-light tracking-wide text-gray-800" style="font-family: Georgia, 'Times New Roman', serif;">
						Certificaat van Deelname
					</h1>
					<div class="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400"></div>
				</div>

				<p class="text-sm text-gray-500">Hierbij verklaren wij dat</p>

				<h2 class="font-serif text-3xl font-normal text-blue-700" style="font-family: Georgia, 'Times New Roman', serif;">
					{client.name}
				</h2>

				<div class="max-w-lg space-y-2">
					<p class="text-sm leading-relaxed text-gray-600">
						met succes het programma
					</p>
					<p class="text-xl font-semibold text-gray-800">{client.project}</p>
					<p class="text-sm leading-relaxed text-gray-600">
						heeft voltooid. Gedurende het programma heeft de deelnemer workshops gevolgd
						op het gebied van sollicitatievaardigheden, Nederlandse werkcultuur,
						financieel beheer en professionele ontwikkeling, inclusief een succesvolle werkstage.
					</p>
				</div>

				<p class="text-sm text-gray-500">Amsterdam, {client.date}</p>
			</div>

			<!-- Signatures -->
			<div class="flex w-full items-end justify-between px-8">
				<div class="text-center">
					<div class="mb-2 h-12 flex items-end justify-center">
						<span class="font-serif text-2xl italic text-gray-400" style="font-family: Georgia, 'Times New Roman', serif;">
							{client.coach}
						</span>
					</div>
					<div class="h-0.5 w-48 bg-gray-300"></div>
					<p class="mt-1 text-xs text-gray-500">{client.coach}</p>
					<p class="text-xs text-gray-400">Begeleider</p>
				</div>
				<div class="text-center">
					<div class="mb-2 h-12 flex items-end justify-center">
						<span class="font-serif text-2xl italic text-gray-400" style="font-family: Georgia, 'Times New Roman', serif;">
							Daphne Mulder
						</span>
					</div>
					<div class="h-0.5 w-48 bg-gray-300"></div>
					<p class="mt-1 text-xs text-gray-500">Daphne Mulder</p>
					<p class="text-xs text-gray-400">Programma Manager</p>
				</div>
			</div>

			<!-- Watermark / seal -->
			<div class="absolute bottom-20 right-20 h-24 w-24 rounded-full border-4 border-blue-100 flex items-center justify-center opacity-40">
				<div class="h-16 w-16 rounded-full border-2 border-blue-200 flex items-center justify-center">
					<div class="text-center">
						<p class="text-[10px] font-bold uppercase tracking-wider text-blue-400">Certified</p>
						<p class="text-[8px] text-blue-300">ABM / RC</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
