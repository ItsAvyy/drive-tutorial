import { createPool, type Pool } from "mysql2/promise";

import { env } from "~/env";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/singlestore";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

export const conn = globalForDb.conn ?? createPool(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

conn.addListener("error", (err) => {
  console.error("Database connection error:", err);
});

export const db = drizzle(conn, { schema });
