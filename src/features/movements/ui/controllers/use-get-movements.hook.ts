import { useQuery } from '@tanstack/react-query';
import { MovementQueryKeys } from '@/common/ui/react-query/query-keys/query-keys';
import { MovementLocator } from '@/features/movements/ui/di/movement.locator';

export const useGetMovements = () => {
	return useQuery({
		queryKey: MovementQueryKeys.all(),
		queryFn: async () => {
			const getMovementsQuery = MovementLocator.getMovements();
			return getMovementsQuery.execute();
		}
	});
};
