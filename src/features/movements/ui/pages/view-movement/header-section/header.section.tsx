import { Title } from '@/common/ui/custom-components/title/title';
import type { Mark } from '@/features/marks/domain/entities/mark';
import type { Movement } from '@/features/movements/domain/entities/movement';
import { MarkDate } from './mark-date.component';

interface HeaderSectionProps {
	movement: Movement;
	pr?: Mark;
	rm?: Mark;
}

export const HeaderSection = ({ movement, pr, rm }: HeaderSectionProps) => {
	return (
		<>
			<Title>{movement.name}</Title>
			<div className="flex flex-row justify-center gap-6 mt-2">
				<MarkDate mark={rm} />
				<MarkDate mark={pr} />
			</div>
		</>
	);
};
