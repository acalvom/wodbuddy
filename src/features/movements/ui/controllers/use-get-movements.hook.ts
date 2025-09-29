import { useQuery } from '@tanstack/react-query';
import { MOVEMENTS_KEY } from '@/common/ui/react-query/query-keys/query-keys.ts';
import { MovementLocator } from '@/features/movements/ui/di/movement.locator.ts';

export const useGetMovements = () => {
	return useQuery({
		queryKey: [MOVEMENTS_KEY],
		queryFn: async () => {
			const getMovementsQuery = MovementLocator.getMovements();
			return getMovementsQuery.execute();
		}
	});
};
