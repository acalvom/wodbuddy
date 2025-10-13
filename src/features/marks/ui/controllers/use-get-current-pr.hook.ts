import { useQuery } from '@tanstack/react-query';
import type { Id } from '@/common/domain/interfaces/id';
import { MarkQueryKeys } from '@/common/ui/react-query/query-keys/query-keys';
import { MarkLocator } from '../di/mark.locator';

export const useGetCurrentPR = (movementId: Id) => {
	return useQuery({
		queryKey: MarkQueryKeys.currentPrByMovementId(movementId),
		queryFn: async () => {
			const getCurrentPRQuery = MarkLocator.getCurrentPRQuery();
			return getCurrentPRQuery.execute(movementId);
		},
		enabled: Boolean(movementId)
	});
};
