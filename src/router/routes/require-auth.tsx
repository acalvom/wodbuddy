import { Loader2Icon } from 'lucide-react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/features/auth/ui/hooks/use-auth.hook.tsx';

export function RequireAuth() {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) return <Loader2Icon className="animate-spin" />;
	if (!isAuthenticated) return <Navigate to="/login" replace />;

	return <Outlet />;
}
