import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AUTH_USER_KEY } from '@/common/ui/react-query/query-keys/query-keys.ts';
import type { AuthUserRequest } from '@/features/auth/domain/interfaces/auth-user-request.ts';
import { useGetAuthUser } from '@/features/auth/ui/controllers/use-get-auth-user.hook.ts';
import { useLogin } from '@/features/auth/ui/controllers/use-login.hook.ts';
import { useLogout } from '@/features/auth/ui/controllers/use-logout.hook.ts';
import { AuthLocator } from '@/features/auth/ui/di/auth.locator.ts';

export function useAuth() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const sessionService = AuthLocator.sessionService();

	const { data: user, isLoading: isAuthLoading } = useGetAuthUser();
	const { mutateAsync: logout, isPending: isLogoutPending } = useLogout();
	const { mutateAsync: login, isPending: isLoginPending, error } = useLogin();

	const onLogout = async () => {
		await logout();
		navigate('/login');
	};

	const onLogin = async (loginRequest: AuthUserRequest) => {
		await login(loginRequest);
		navigate('/home');
	};

	useEffect(() => {
		const unsubscribe = sessionService.subscribeToAuthChanges(async () => {
			await queryClient.invalidateQueries({ queryKey: [AUTH_USER_KEY] });
			return unsubscribe;
		});
	}, [sessionService, queryClient]);

	return {
		user,
		isAuthenticated: !!user,
		isLoading: isAuthLoading || isLogoutPending || isLoginPending,
		onLogin,
		onLogout,
		error
	};
}
