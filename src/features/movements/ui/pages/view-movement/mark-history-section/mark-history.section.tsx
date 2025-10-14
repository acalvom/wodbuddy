import { useNavigate } from 'react-router-dom';
import type { Id } from '@/common/domain/interfaces/id';
import { Caption } from '@/common/ui/custom-components/caption/caption';
import { Button } from '@/common/ui/shade-ui/components/ui/button';
import type { Mark } from '@/features/marks/domain/entities/mark';
import { MarkCollection } from '@/features/marks/domain/value-objects/mark-collection';
import { MarkList } from '../../../components/mark-list/mark-list.component';

interface MarkHistorySectionProps {
	marks: Mark[];
	movementId: Id;
}

export const MarkHistorySection = ({ marks, movementId }: MarkHistorySectionProps) => {
	const navigate = useNavigate();

	const markCollection = MarkCollection.fromMarks(marks);
	const recentMarks = markCollection.getRecent();
	const hasMoreMarks = markCollection.hasMoreThan();

	return (
		<div className="w-full border-t border-foreground pt-8">
			<Caption className="mb-4">Histórico de marcas</Caption>
			<MarkList marks={recentMarks} />

			{hasMoreMarks && (
				<Button
					variant="ghost"
					size="sm"
					onClick={() => navigate(`/movements/${movementId}/marks`)}
					className="text-accent hover:text-foreground/80 mt-2"
				>
					Ver todas ({markCollection.count})
				</Button>
			)}
		</div>
	);
};
