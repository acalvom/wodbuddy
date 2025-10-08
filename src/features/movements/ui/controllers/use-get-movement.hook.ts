import { useQuery } from '@tanstack/react-query';
import type { Id } from '@/common/domain/interfaces/id.ts';
import { MOVEMENT_KEY } from '@/common/ui/react-query/query-keys/query-keys.ts';
import { MovementLocator } from '@/features/movements/ui/di/movement.locator.ts';

const getMovementKey = (id: Id) => [MOVEMENT_KEY, id];

export const useGetMovement = (id: Id) => {
	return useQuery({
		enabled: Boolean(id),
		queryKey: getMovementKey(id),
		queryFn: async () => {
			const getMovementByIdQuery = MovementLocator.getMovementById();
			return getMovementByIdQuery.execute(id);
		}
	});
};
