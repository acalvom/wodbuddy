import { useQuery } from '@tanstack/react-query';
import type { Id } from '@/common/domain/interfaces/id';
import { MarkQueryKeys } from '@/common/ui/react-query/query-keys/query-keys';
import { MarkLocator } from '../di/mark.locator';

export const useGetCurrentRM = (movementId: Id) => {
	return useQuery({
		queryKey: MarkQueryKeys.currentRmByMovementId(movementId),
		queryFn: async () => {
			const getCurrentRMQuery = MarkLocator.getCurrentRMQuery();
			return getCurrentRMQuery.execute(movementId);
		},
		enabled: Boolean(movementId)
	});
};
