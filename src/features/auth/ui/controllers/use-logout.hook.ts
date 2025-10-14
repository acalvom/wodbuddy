import { useQueryClient } from '@tanstack/react-query';
import { useMutationWrapper } from '@/common/ui/react-query/mutation-wrapper/use-mutation-wrapper';
import { AuthQueryKeys } from '@/common/ui/react-query/query-keys/query-keys';
import { AuthLocator } from '@/features/auth/ui/di/auth.locator';

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
