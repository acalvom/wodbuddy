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
 * Para testear componentes aislados (sin router).
 * Ejemplo:
 *   customComponentRender(<MovementsList />)
 */
export function customComponentRender(
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
 * Para testear con navegación real usando las rutas de la app.
 * Ejemplo:
 *   customRouterRender('/movements/123')
 */
export function customRouterRender(initialEntry: string = '/', queryClientConfig?: QueryClientConfig) {
	const client = createTestQueryClient(queryClientConfig);
	const router = createMemoryRouter(appRoutes, { initialEntries: [initialEntry] });

	return render(
		<QueryClientProvider client={client}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export function customRender(ui: ReactElement, initialEntry: string = '/') {
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

/*

const customRender = (ui: ReactElement, options?: RenderOptions) => {
	const client = createTestQueryClient();
	return render(ui, {
		wrapper: ({ children }) => (
			<MemoryRouter initialEntries={['/']}>
				<QueryClientProvider client={client}>{children}</QueryClientProvider>
			</MemoryRouter>
		),
		...options
	});
};
const createTestQueryClient = (config?: QueryClientConfig) => {
	return new QueryClient({
		defaultOptions: { queries: { retry: false, gcTime: 1 } },
		...config
	});
};

const renderWithQueryClient = (ui: ReactElement, client = createTestQueryClient(), options?: RenderOptions) => {
	return render(ui, {
		wrapper: ({ children }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>,
		...options
	});
};

export * from '@testing-library/react';

export { customRender as render, renderWithQueryClient };
*/
