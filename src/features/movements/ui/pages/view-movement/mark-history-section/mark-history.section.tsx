import { DateFormatter } from '@/common/domain/date/date';
import { Caption } from '@/common/ui/custom-components/caption/caption';
import { cn } from '@/common/ui/shade-ui/components/lib/utils';
import type { Mark } from '@/features/marks/domain/entities/mark';

interface MarkHistorySectionProps {
	marks: Mark[];
}

export const MarkHistorySection = ({ marks }: MarkHistorySectionProps) => {
	return (
		<div className="w-full border-t border-foreground pt-8">
			<Caption>Histórico de marcas</Caption>
			<ul className="space-y-2">
				{marks.map((mark) => (
					<li
						key={mark.id}
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
				))}
			</ul>
		</div>
	);
};
