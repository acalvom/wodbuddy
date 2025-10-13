import { useQuery } from '@tanstack/react-query';
import { MARKS_KEY } from '@/common/ui/react-query/query-keys/query-keys';
import { MarkLocator } from '../di/mark.locator';

export const useGetMarks = () => {
	return useQuery({
		queryKey: [MARKS_KEY],
		queryFn: async () => {
			const getMarksQuery = MarkLocator.getMarksQuery();
			return getMarksQuery.execute();
		}
	});
};
