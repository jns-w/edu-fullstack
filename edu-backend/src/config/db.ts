import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import dotenv from "dotenv";

dotenv.config()

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

export async function connectDB() {
	try {
		await pool.connect().then(async (client) => {
			console.log("connected to postgres", process.env.DATABASE_URL)
			await client.query("SELECT NOW()");
			client.release();
		})
	} catch (error) {
		console.error("Failed to connect to postgres", error)
		process.exit(1);
	}
}
