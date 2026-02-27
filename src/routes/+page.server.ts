import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { task } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
	let dbConnected = false;
	let drizzleWorking = false;
	let tableCount = 0;
	let tasks: { id: number; title: string; priority: number }[] = [];

	try {
		// Test Drizzle + Neon connection by querying tasks
		tasks = await db.select().from(task).limit(10);
		drizzleWorking = true;
		dbConnected = true;

		// Count tables in the database
		const result = await db.execute(
			`SELECT count(*) as count FROM information_schema.tables WHERE table_schema = 'public'`
		);
		tableCount = Number(result.rows?.[0]?.count ?? 0);
	} catch (e) {
		console.error('DB check failed:', e);
	}

	// If no tasks, insert a sample one
	if (drizzleWorking && tasks.length === 0) {
		try {
			await db.insert(task).values({
				title: 'Hello from A Beautiful Mess!',
				priority: 1
			});
			tasks = await db.select().from(task).limit(10);
		} catch (e) {
			console.error('Insert sample task failed:', e);
		}
	}

	return {
		dbConnected,
		drizzleWorking,
		tableCount,
		tasks
	};
};
