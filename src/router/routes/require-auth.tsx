import { Navigate, Outlet } from 'react-router-dom';
import { Loading } from '@/common/ui/custom-components/loading/loading.tsx';
import { useAuth } from '@/features/auth/ui/hooks/use-auth.hook.tsx';

export function RequireAuth() {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) return <Loading />;
	if (!isAuthenticated) return <Navigate to="/login" replace />;

	return <Outlet />;
}
