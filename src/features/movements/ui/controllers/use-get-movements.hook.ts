import { useQuery } from '@tanstack/react-query';
import { MovementQueryKeys } from '@/common/ui/react-query/query-keys/query-keys.ts';
import { MovementLocator } from '@/features/movements/ui/di/movement.locator.ts';

export const useGetMovements = () => {
	return useQuery({
		queryKey: MovementQueryKeys.all(),
		queryFn: async () => {
			const getMovementsQuery = MovementLocator.getMovements();
			return getMovementsQuery.execute();
		}
	});
};
