import { useQueryClient } from '@tanstack/react-query';
import { useMutationWrapper } from '@/common/ui/react-query/mutation-wrapper/use-mutation-wrapper.tsx';
import { AuthQueryKeys } from '@/common/ui/react-query/query-keys/query-keys.ts';
import { AuthLocator } from '@/features/auth/ui/di/auth.locator.ts';

export function useLogout() {
	const queryClient = useQueryClient();

	return useMutationWrapper(
		() => {
			const logoutCommand = AuthLocator.logoutCommand();
			return logoutCommand.execute();
		},
		{
			onSuccess: async () => await queryClient.invalidateQueries({ queryKey: AuthQueryKeys.logout() }),
			onError: async (error: Error) => console.error(error.message)
		}
	);
}
