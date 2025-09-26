import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/features/auth/ui/hooks/use-auth.hook.tsx';

export function RequireAuth() {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) return <p>Loading...</p>;
	if (!isAuthenticated) return <Navigate to="/login" replace />;

	return <Outlet />;
}
