import { useQuery } from '@tanstack/react-query';
import { AuthQueryKeys } from '@/common/ui/react-query/query-keys/query-keys.ts';
import { AuthLocator } from '@/features/auth/ui/di/auth.locator.ts';

export function useGetAuthUser() {
	return useQuery({
		queryKey: AuthQueryKeys.user(),
		queryFn: async () => {
			const getCurrentUserQuery = AuthLocator.getAuthUserQuery();
			return getCurrentUserQuery.execute();
		},
		staleTime: Infinity
	});
}
