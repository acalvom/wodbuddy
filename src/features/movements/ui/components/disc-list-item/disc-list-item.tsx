import type { Disc } from '@/features/movements/domain/value-objects/disc.ts';

export const DiscListItem = ({ disc }: { disc: Disc }) => {
	const className = `w-8 h-8 flex items-center justify-center border border-accent-foreground rounded-full bg-${disc.color.hex}`;
	return <span className={className}>{disc.value}</span>;
};
