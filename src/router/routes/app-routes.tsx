import { AppLayout } from '@/app/layouts/app.layout';
import { LoginPage } from '@/features/auth/ui/pages/login.page';
import { SignupPage } from '@/features/auth/ui/pages/signup.page';
import { AddMovementPage } from '@/features/movements/ui/pages/add-movement/add-movement.page.tsx';
import { MovementsPage } from '@/features/movements/ui/pages/movements/movements.page.tsx';
import { ViewMovementPage } from '@/features/movements/ui/pages/view-movement/view-movement.page.tsx';
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
					{ index: true, element: <MovementsPage /> },
					{ path: 'add-movement', element: <AddMovementPage /> },
					{ path: 'movements/:id', element: <ViewMovementPage /> }
				]
			},
			{ path: '*', element: <h2>Not Found</h2> }
		]
	}
];
