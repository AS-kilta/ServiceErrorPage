import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';

export default defineConfig({
	plugins: [
		svelte(),
		viteSingleFile()
	],
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib')
		}
	}
});
