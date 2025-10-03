import { QueryClient, type QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';
import { type RenderOptions, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { createMemoryRouter, MemoryRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import { appRoutes } from '@/router/routes/app-routes.tsx';

const createTestQueryClient = (config?: QueryClientConfig) => {
	return new QueryClient({
		defaultOptions: { queries: { retry: false, gcTime: 1 } },
		...config
	});
};

/**
 * Renders a component in isolation with only QueryClient provider (no routing).
 * Use for components that don't need navigation (buttons, loading, pure UI components).
 * Example: renderComponent(<Button />)
 */
export function renderComponent(
	ui: ReactElement,
	{ queryClientConfig, ...options }: RenderOptions & { queryClientConfig?: QueryClientConfig } = {}
) {
	const client = createTestQueryClient(queryClientConfig);
	return render(ui, {
		wrapper: ({ children }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>,
		...options
	});
}

/**
 * Renders the full app with real routing using appRoutes.
 * Use for integration tests that need navigation and real route matching.
 * Example: renderAppWithRoutes('/movements/123')
 */
export function renderAppWithRoutes(initialEntry: string = '/', queryClientConfig?: QueryClientConfig) {
	const client = createTestQueryClient(queryClientConfig);
	const router = createMemoryRouter(appRoutes, { initialEntries: [initialEntry] });

	return render(
		<QueryClientProvider client={client}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

/**
 * Renders a component with basic routing context (no real routes).
 * Use when you need routing context but don't need the full app routes.
 * Example: renderWithRouting(<HomePage />, '/home')
 */
export function renderWithRouting(ui: ReactElement, initialEntry: string = '/') {
	const client = createTestQueryClient();

	return render(
		<QueryClientProvider client={client}>
			<MemoryRouter initialEntries={[initialEntry]}>
				<Routes>
					<Route path="*" element={ui} />
				</Routes>
			</MemoryRouter>
		</QueryClientProvider>
	);
}

// Re-export all testing-library functions for convenience
export * from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';
