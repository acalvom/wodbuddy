import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthQueryKeys } from '@/common/ui/react-query/query-keys/query-keys';
import type { AuthUserRequest } from '@/features/auth/domain/interfaces/auth-user-request';
import { useGetAuthUser } from '@/features/auth/ui/controllers/use-get-auth-user.hook';
import { useLogin } from '@/features/auth/ui/controllers/use-login.hook';
import { useLogout } from '@/features/auth/ui/controllers/use-logout.hook';
import { AuthLocator } from '@/features/auth/ui/di/auth.locator';

export function useAuth() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const sessionService = AuthLocator.sessionService();

	const { data: user, isLoading: isAuthLoading, isFetching: isAuthFetching } = useGetAuthUser();
	const { mutateAsync: logout, isPending: isLogoutPending } = useLogout();
	const { mutateAsync: login, isPending: isLoginPending, error } = useLogin();

	const onLogout = async () => {
		await logout();
		navigate('/login');
	};

	const onLogin = async (loginRequest: AuthUserRequest) => {
		await login(loginRequest);
		navigate('/movements');
	};

	useEffect(() => {
		let unsubscribe: (() => void) | null = null;

		sessionService.subscribeToAuthChanges(async () => {
			await queryClient.invalidateQueries({ queryKey: AuthQueryKeys.user() });
		}).then((unsubscribeFn) => {
			unsubscribe = unsubscribeFn;
		});

		// Cleanup function para evitar memory leaks
		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [sessionService, queryClient]);

	return {
		user,
		isAuthenticated: !!user,
		isLoading: isAuthLoading || isAuthFetching || isLogoutPending || isLoginPending,
		onLogin,
		onLogout,
		error
	};
}
