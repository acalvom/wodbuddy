import { Caption } from '@/common/ui/custom-components/caption/caption';
import type { Movement } from '@/features/movements/domain/entities/movement';
import { CalculatePercentageForm } from '../../../components/calculate-percentage-form/calculate-percentage-form.component';

export const PercentageCalculatorSection = ({ movement }: { movement: Movement }) => {
	return (
		<div className="w-full border-t border-foreground pt-8">
			<Caption>Calcula tu porcentaje</Caption>
			<CalculatePercentageForm movement={movement} />
		</div>
	);
};
