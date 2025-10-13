import { useQueryClient } from '@tanstack/react-query';
import { useMutationWrapper } from '@/common/ui/react-query/mutation-wrapper/use-mutation-wrapper';
import { MarkQueryKeys } from '@/common/ui/react-query/query-keys/query-keys';
import type { NewMark } from '../../domain/entities/new-mark';
import { MarkLocator } from '../di/mark.locator';

export const useAddNewMark = () => {
	const queryClient = useQueryClient();

	return useMutationWrapper(
		(newMark: NewMark) => {
			const addNewMarkCommand = MarkLocator.addNewMarkCommand();
			return addNewMarkCommand.execute(newMark);
		},
		{
			onSuccess: async (result) => {
				await queryClient.invalidateQueries({ queryKey: MarkQueryKeys.all() });

				// TODO: con all no serviria?
				await queryClient.invalidateQueries({ queryKey: MarkQueryKeys.byMovementId(result.movementId) });
				await queryClient.invalidateQueries({ queryKey: MarkQueryKeys.currentPrByMovementId(result.movementId) });
				await queryClient.invalidateQueries({ queryKey: MarkQueryKeys.currentRmByMovementId(result.movementId) });
			},
			onError: async (error: Error) => console.error(error.message)
		}
	);
};
