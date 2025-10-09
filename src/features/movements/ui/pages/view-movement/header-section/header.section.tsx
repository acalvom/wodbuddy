import { DateFormatter } from '@/common/domain/date/date';
import { Subtitle } from '@/common/ui/custom-components/subtitle/subtitle';
import { Title } from '@/common/ui/custom-components/title/title';
import type { Movement } from '@/features/movements/domain/entities/movement';
import type { Mark } from '../view-movement.page';

interface HeaderSectionProps {
	movement: Movement;
	pr: Mark;
}

export const HeaderSection = ({ movement, pr }: HeaderSectionProps) => {
	return (
		<>
			<Title>{movement.name}</Title>
			<Subtitle>{`Tu RM actual: ${movement.rm} kg`}</Subtitle>
			<Subtitle>{`Tu PR: ${pr.value} kg`}</Subtitle>
			<p className="text-xs text-muted-foreground mt-1">{`Conseguido el ${DateFormatter.format(pr.date)}`}</p>
		</>
	);
};
