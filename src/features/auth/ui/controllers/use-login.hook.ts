import { useQueryClient } from '@tanstack/react-query';
import { useMutationWrapper } from '@/common/ui/react-query/mutation-wrapper/use-mutation-wrapper';
import { AuthQueryKeys } from '@/common/ui/react-query/query-keys/query-keys';
import type { AuthUserRequest } from '@/features/auth/domain/interfaces/auth-user-request';
import { AuthLocator } from '@/features/auth/ui/di/auth.locator';

export function useLogin() {
	const queryClient = useQueryClient();

	return useMutationWrapper(
		(authUserRequest: AuthUserRequest) => {
			const loginCommand = AuthLocator.loginCommand();
			return loginCommand.execute(authUserRequest);
		},
		{
			onSuccess: async () => await queryClient.invalidateQueries({ queryKey: AuthQueryKeys.login() }),
			onError: async (error: Error) => console.error(error.message)
		}
	);
}
