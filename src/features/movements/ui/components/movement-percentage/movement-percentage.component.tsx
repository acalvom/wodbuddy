import type { Movement } from '@/features/movements/domain/entities/movement';

type MovementPercentageProps = {
	movement: Movement;
	percentage: number;
};
export const MovementPercentage = ({ movement, percentage }: MovementPercentageProps) => {
	const percentageOfRM = movement.formatPercentageOfRM(percentage);
	return (
		<div className="flex flex-row gap-4 justify-between">
			<span className="text-accent">{percentage}%</span>
			<span className="font-medium">{percentageOfRM}</span>
			{/*<DiscList discs={discs} />*/}
		</div>
	);
};
