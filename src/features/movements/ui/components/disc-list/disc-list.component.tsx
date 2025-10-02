import type { Disc } from '@/features/movements/domain/value-objects/disc.ts';
import { DiscListItem } from '@/features/movements/ui/components/disc-list-item/disc-list-item.tsx';

export const DiscList = ({ discs }: { discs: Disc[] }) => {
	return (
		<div className="flex items-center gap-1">
			{discs.map((disc, idx) => (
				<DiscListItem disc={disc} key={idx} />
			))}
		</div>
	);
};
