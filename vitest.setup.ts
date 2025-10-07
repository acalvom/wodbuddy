import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

if (!window.matchMedia) {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: (query: unknown) => ({
			matches: false,
			media: query,
			onchange: null
		})
	});
}

afterEach(() => {
	cleanup();
	vi.clearAllMocks();
});
