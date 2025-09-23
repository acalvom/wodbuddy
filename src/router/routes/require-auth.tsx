import { Navigate, Outlet } from 'react-router';
import { useGetCurrentUser } from '@/features/auth/ui/controllers/use-get-current-user.hook.ts';

export function RequireAuth() {
	const { data: currentUser, isLoading } = useGetCurrentUser();

	if (isLoading) return <p>Loading...</p>;

	if (!currentUser) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}
