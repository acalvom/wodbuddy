import { DateFormatter } from '@/common/domain/date/date';
import { Subtitle } from '@/common/ui/custom-components/subtitle/subtitle';
import { Title } from '@/common/ui/custom-components/title/title';
import type { Mark } from '@/features/marks/domain/entities/mark';
import type { Movement } from '@/features/movements/domain/entities/movement';

interface HeaderSectionProps {
	movement: Movement;
	pr?: Mark;
}

// TODO: refa ctor
export const HeaderSection = ({ movement, pr }: HeaderSectionProps) => {
	return (
		<>
			<Title>{movement.name}</Title>
			<Subtitle>{`Tu RM actual: ${movement.rm} kg`}</Subtitle>
			{pr ? (
				<>
					<Subtitle>{`Tu PR: ${pr.value} kg`}</Subtitle>
					{pr.createdOn && (
						<p className="text-xs text-muted-foreground mt-1">
							{`Conseguido el ${DateFormatter.format(pr.createdOn)}`}
						</p>
					)}
				</>
			) : (
				<Subtitle>Sin PR registrado</Subtitle>
			)}
		</>
	);
};
