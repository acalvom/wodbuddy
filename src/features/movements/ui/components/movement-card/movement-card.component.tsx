import { Link } from 'react-router';
import { Card } from '@/common/ui/custom-components/card/card.tsx';
import { CardContent } from '@/common/ui/custom-components/card/card-content.tsx';
import { CardHeader } from '@/common/ui/custom-components/card/card-header.tsx';
import { Subtitle } from '@/common/ui/custom-components/subtitle/subtitle.tsx';
import { Title } from '@/common/ui/custom-components/title/title.tsx';
import type { Movement } from '@/features/movements/domain/entities/movement.ts';
import { MovementPercentage } from '@/features/movements/ui/components/movement-percentage/movement-percentage.component.tsx';

export const MovementCard = ({ movement }: { movement: Movement }) => {
	const leftPercentages = [50, 60, 70, 80];
	const rightPercentages = [85, 90, 95, 100];

	return (
		<Link to={`/movements/${movement.id}`} key={movement.id}>
			<Card>
				<CardHeader>
					<Title>{movement.name}</Title>
					<Subtitle>{`RM: ${movement.rm} kg`}</Subtitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-2 justify-between">
						{leftPercentages.map((percentage) => (
							<MovementPercentage key={percentage} movement={movement} percentage={percentage} />
						))}
					</div>
					<div className="w-0.5 self-stretch bg-neutral-200 shadow-2xs" />
					<div className="flex flex-col gap-2 justify-between">
						{rightPercentages.map((percentage) => (
							<MovementPercentage key={percentage} movement={movement} percentage={percentage} />
						))}
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};
