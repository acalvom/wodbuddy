import { Navigate } from 'react-router-dom';
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
			{ index: true, element: <Navigate to="/movements" replace /> },
			{
				element: <RequireAuth />,
				children: [
					{
						path: 'movements',
						children: [
							{ index: true, element: <MovementsPage /> },
							{ path: 'add', element: <AddMovementPage /> },
							{ path: ':id', element: <ViewMovementPage /> },
							{ path: ':id/add', element: <div>Add Mark Page - TODO</div> }
						]
					}
				]
			},
			{ path: '*', element: <h2>Not Found</h2> }
		]
	}
];
