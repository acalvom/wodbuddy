import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from '@/features/auth/ui/pages/login.page.tsx';
import { SignupPage } from '@/features/auth/ui/pages/signup.page.tsx';
import { RequireAuth } from '@/router/routes/require-auth.tsx';

export function AppRouter() {
	const router = createBrowserRouter([
		{
			path: '/login',
			element: <LoginPage />
		},
		{
			path: '/signup',
			element: <SignupPage />
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
