import { useQueryClient } from '@tanstack/react-query';
import type { Id } from '@/common/domain/interfaces/id';
import { useMutationWrapper } from '@/common/ui/react-query/mutation-wrapper/use-mutation-wrapper';
import { MarkQueryKeys } from '@/common/ui/react-query/query-keys/query-keys';
import { MarkLocator } from '@/features/marks/ui/di/mark.locator';

export const useDeleteMark = (movementId: Id) => {
	const queryClient = useQueryClient();

	return useMutationWrapper(
		(markId: Id) => {
			const deleteMarkCommand = MarkLocator.deleteMarkCommand();
			return deleteMarkCommand.execute(markId);
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
			onError: async (error: Error) => console.error('Error deleting mark:', error.message)
		}
	);
};
