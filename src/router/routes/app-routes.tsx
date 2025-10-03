import { AppLayout } from '@/app/layouts/app.layout';
import { HomePage } from '@/app/pages/home.page';
import { LoginPage } from '@/features/auth/ui/pages/login.page';
import { SignupPage } from '@/features/auth/ui/pages/signup.page';
import { RequireAuth } from '@/router/routes/require-auth';

export const appRoutes = [
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{ path: 'login', element: <LoginPage /> },
			{ path: 'signup', element: <SignupPage /> },
			{
				element: <RequireAuth />,
				children: [
					{ index: true, element: <HomePage /> },
					{ path: 'movements/:id', element: <div>Movement detail</div> } // temporal
				]
			},
			{ path: '*', element: <h2>Not Found</h2> }
		]
	}
];
