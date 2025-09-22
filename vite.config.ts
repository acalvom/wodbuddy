import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import {biomePlugin} from '@pbr1111/vite-plugin-biome';
import {defineConfig} from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss(), biomePlugin()]
});
