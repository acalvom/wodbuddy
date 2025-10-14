import { DateFormatter } from '@/common/domain/date/date';
import { cn } from '@/common/ui/shade-ui/components/lib/utils';
import type { Mark } from '@/features/marks/domain/entities/mark';

interface MarkListItemProps {
	mark: Mark;
}

export const MarkListItem = ({ mark }: MarkListItemProps) => {
	return (
		<li
			className={cn(
				'flex items-center justify-between rounded-lg px-3 py-2',
				mark.isPr && 'bg-primary/10 border-l-4 border-primary',
				mark.isRm && !mark.isPr && 'bg-secondary/10 border-l-4 border-secondary',
				!mark.isPr && !mark.isRm && 'bg-card'
			)}
		>
			<span className="text-sm">
				{mark.createdOn ? DateFormatter.format(mark.createdOn) : 'Sin fecha'}
			</span>
			<div className="flex items-center gap-2">
				{mark.isPr && <span className="text-xs text-primary font-bold">PR</span>}
				{mark.isRm && <span className="text-xs text-secondary font-bold">RM</span>}
			</div>
			<span className="font-medium">{mark.value} kg</span>
		</li>
	);
};