import { useQuery } from '@tanstack/react-query';
import { MarkQueryKeys } from '@/common/ui/react-query/query-keys/query-keys';
import { MarkLocator } from '../di/mark.locator';

export const useGetMarksByMovement = (movementId: number) => {
	return useQuery({
		queryKey: MarkQueryKeys.byMovementId(movementId),
		queryFn: async () => {
			const getMarksByMovementQuery = MarkLocator.getMarksByMovementQuery();
			return getMarksByMovementQuery.execute(movementId);
		},
		enabled: Boolean(movementId)
	});
};
