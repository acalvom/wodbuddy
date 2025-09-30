import path from 'node:path';
import { biomePlugin } from '@pbr1111/vite-plugin-biome';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
	plugins: [react(), tailwindcss(), biomePlugin()],
	resolve: {
		alias: { '@': path.resolve(__dirname, './src') }
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './vitest.setup.ts',
		exclude: [...configDefaults.exclude]
	}
});
