import type { Disc } from '@/features/movements/domain/value-objects/disc';
import { DiscListItem } from '@/features/movements/ui/components/disc-list-item/disc-list-item';

export const DiscList = ({ discs }: { discs: Disc[] }) => {
	return (
		<div className="flex items-center gap-1">
			{discs.map((disc, idx) => (
				<DiscListItem disc={disc} key={idx} />
			))}
		</div>
	);
};
