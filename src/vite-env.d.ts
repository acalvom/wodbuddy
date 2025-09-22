/// <reference types="vite/client" />

// biome-ignore lint/correctness/noUnusedVariables: used internally by VITE
interface ImportMetaEnv {
	readonly VITE_SUPABASE_URL: string;
	readonly VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY: string;
}
