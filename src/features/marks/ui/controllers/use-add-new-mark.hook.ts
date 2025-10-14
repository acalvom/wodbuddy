import { useQueryClient } from '@tanstack/react-query';
import type { Id } from '@/common/domain/interfaces/id';
import { useMutationWrapper } from '@/common/ui/react-query/mutation-wrapper/use-mutation-wrapper';
import { MarkQueryKeys } from '@/common/ui/react-query/query-keys/query-keys';
import type { NewMark } from '../../domain/entities/new-mark';
import { MarkLocator } from '../di/mark.locator';

export const useAddNewMark = (movementId: Id) => {
	const queryClient = useQueryClient();

	return useMutationWrapper(
		(newMark: NewMark) => {
			const addNewMarkCommand = MarkLocator.addNewMarkCommand();
			return addNewMarkCommand.execute(newMark);
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: MarkQueryKeys.byMovementId(movementId)
				});
				await queryClient.invalidateQueries({
					queryKey: MarkQueryKeys.currentPrByMovementId(movementId)
				});
				await queryClient.invalidateQueries({
					queryKey: MarkQueryKeys.currentRmByMovementId(movementId)
				});
			},
			onError: async (error: Error) => console.error(error.message)
		}
	);
};
