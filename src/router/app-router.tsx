import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { appRoutes } from '@/router/routes/app-routes.tsx';

export function AppRouter() {
	const router = createBrowserRouter(appRoutes);

	return <RouterProvider router={router} />;
}
