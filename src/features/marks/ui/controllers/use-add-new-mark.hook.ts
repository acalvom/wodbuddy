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
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: MarkQueryKeys.all() });
			},
			onError: async (error: Error) => console.error(error.message)
		}
	);
};
