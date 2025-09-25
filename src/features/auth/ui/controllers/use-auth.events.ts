import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { GET_CURRENT_USER_KEY } from '@/common/ui/react-query/query-keys/query-keys.ts';
import { AuthLocator } from '@/features/auth/ui/di/auth.locator.ts';

export const useAuthEvents = () => {
	const queryClient = useQueryClient();
	const sessionService = AuthLocator.sessionService();

	useEffect(() => {
		const unsubscribe = sessionService.subscribeToAuthChanges(async () => {
			await queryClient.invalidateQueries({ queryKey: [GET_CURRENT_USER_KEY] });
			return unsubscribe;
		});
	}, [sessionService, queryClient]);
};
