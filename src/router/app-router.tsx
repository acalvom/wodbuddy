import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginForm } from '@/features/auth/ui/components/login-form.tsx';
import { RequireAuth } from '@/router/routes/require-auth.tsx';

export function AppRouter() {
	const router = createBrowserRouter([
		{
			path: '/login',
			element: <LoginForm />
		},
		{
			element: <RequireAuth />,
			children: [{ path: '/', element: <h2>Home - Protected</h2> }]
		},
		{
			path: '/*',
			element: <h2>Not Found</h2>
		}
	]);

	return <RouterProvider router={router} />;
}
