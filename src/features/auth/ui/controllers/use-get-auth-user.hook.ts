import { useQuery } from '@tanstack/react-query';
import { AUTH_USER_KEY } from '@/common/ui/react-query/query-keys/query-keys.ts';
import { AuthLocator } from '@/features/auth/ui/di/auth.locator.ts';

export function useGetAuthUser() {
	return useQuery({
		queryKey: [AUTH_USER_KEY],
		queryFn: async () => {
			const getCurrentUserQuery = AuthLocator.getAuthUserQuery();
			return getCurrentUserQuery.execute();
		},
		staleTime: Infinity
	});
}
