import { envSchema, Env } from "./models/Env";

const rawEnv = import.meta.env as Record<string, unknown>;

export const env: Env = envSchema.validateSync({
	BACKEND_URL: rawEnv.VITE_BACKEND_URL
});
