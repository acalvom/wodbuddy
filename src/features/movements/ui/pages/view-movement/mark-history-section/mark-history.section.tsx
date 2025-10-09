import { DateFormatter } from '@/common/domain/date/date';
import { Caption } from '@/common/ui/custom-components/caption/caption';
import { cn } from '@/common/ui/shade-ui/components/lib/utils';
import type { Mark } from '../view-movement.page';

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
							mark.isPr ? 'bg-primary/10 border-l-4 border-primary' : 'bg-card'
						)}
					>
						<span className="text-sm">{DateFormatter.format(mark.date)}</span>
						{mark.isPr && <span className="ml-2 text-xs text-primary font-bold">PR</span>}
						<span className="font-medium">{mark.value} kg</span>
					</li>
				))}
			</ul>
		</div>
	);
};
