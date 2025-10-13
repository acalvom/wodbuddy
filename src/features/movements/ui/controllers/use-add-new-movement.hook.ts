import { useQueryClient } from '@tanstack/react-query';
import { useMutationWrapper } from '@/common/ui/react-query/mutation-wrapper/use-mutation-wrapper.tsx';
import { MovementQueryKeys } from '@/common/ui/react-query/query-keys/query-keys.ts';
import type { NewMovement } from '@/features/movements/domain/entities/new-movement.ts';
import { MovementLocator } from '@/features/movements/ui/di/movement.locator.ts';

export function useAddNewMovement() {
	const queryClient = useQueryClient();

	return useMutationWrapper(
		(newMovement: NewMovement) => {
			const addNewMovementCommand = MovementLocator.addNewMovement();
			return addNewMovementCommand.execute(newMovement);
		},
		{
			onSuccess: async () => await queryClient.invalidateQueries({ queryKey: MovementQueryKeys.all() }),
			onError: async (error: Error) => console.error(error.message)
		}
	);
}
