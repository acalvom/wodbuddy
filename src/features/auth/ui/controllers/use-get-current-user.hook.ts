import { useQuery } from '@tanstack/react-query';
import { GET_CURRENT_USER_KEY } from '@/common/ui/react-query/query-keys/query-keys.ts';
import { AuthLocator } from '@/features/auth/ui/di/auth.locator.ts';

export function useGetCurrentUser() {
	return useQuery({
		queryKey: [GET_CURRENT_USER_KEY],
		queryFn: async () => {
			const getCurrentUserQuery = AuthLocator.getCurrentUserQuery();
			return getCurrentUserQuery.execute();
		}
	});
}
