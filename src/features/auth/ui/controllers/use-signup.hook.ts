import { useQueryClient } from '@tanstack/react-query';
import { useMutationWrapper } from '@/common/ui/react-query/mutation-wrapper/use-mutation-wrapper.tsx';
import { SIGNUP_KEY } from '@/common/ui/react-query/query-keys/query-keys.ts';
import type { AuthUserRequest } from '@/features/auth/domain/interfaces/auth-user-request.ts';
import { AuthLocator } from '@/features/auth/ui/di/auth.locator.ts';

export function useSignup() {
	const queryClient = useQueryClient();

	return useMutationWrapper(
		(authUserRequest: AuthUserRequest) => {
			const loginCommand = AuthLocator.signupCommand();
			return loginCommand.execute(authUserRequest);
		},
		{
			onSuccess: async () => await queryClient.invalidateQueries({ queryKey: [SIGNUP_KEY] }),
			onError: async (error: Error) => console.error(error.message)
		}
	);
}
