import { useNavigate } from 'react-router-dom';
import { DateFormatter } from '@/common/domain/date/date';
import type { Id } from '@/common/domain/interfaces/id';
import { Caption } from '@/common/ui/custom-components/caption/caption';
import { cn } from '@/common/ui/shade-ui/components/lib/utils';
import { Button } from '@/common/ui/shade-ui/components/ui/button';
import type { Mark } from '@/features/marks/domain/entities/mark';

interface MarkHistorySectionProps {
	marks: Mark[];
	movementId: Id;
}

export const MarkHistorySection = ({ marks, movementId }: MarkHistorySectionProps) => {
	const navigate = useNavigate();

	// TODO: al domain
	const recentMarks = marks.slice(0, 7);
	const hasMoreMarks = marks.length > 7;

	return (
		<div className="w-full border-t border-foreground pt-8">
			<div className="flex justify-between items-center mb-2">
				<Caption>Histórico de marcas</Caption>
			</div>
			<ul className="space-y-2">
				{recentMarks.map((mark) => (
					<li
						key={mark.id}
						className={cn(
							'flex items-center justify-between rounded-lg px-3 py-2',
							mark.isPr && 'bg-primary/10 border-l-4 border-primary',
							mark.isRm && !mark.isPr && 'bg-secondary/10 border-l-4 border-secondary',
							!mark.isPr && !mark.isRm && 'bg-card'
						)}
					>
						<span className="text-sm">{mark.createdOn ? DateFormatter.format(mark.createdOn) : 'Sin fecha'}</span>
						<div className="flex items-center gap-2">
							{mark.isPr && <span className="text-xs text-primary font-bold">PR</span>}
							{mark.isRm && <span className="text-xs text-secondary font-bold">RM</span>}
						</div>
						<span className="font-medium">{mark.value} kg</span>
					</li>
				))}
			</ul>
			{hasMoreMarks && (
				<Button
					variant="ghost"
					size="sm"
					onClick={() => navigate(`/movements/${movementId}/marks`)}
					className="text-accent hover:text-foreground/80 mt-2"
				>
					Ver todas ({marks.length})
				</Button>
			)}
		</div>
	);
};
