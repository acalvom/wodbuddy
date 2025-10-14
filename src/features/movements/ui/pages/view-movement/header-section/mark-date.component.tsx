import { DateFormatter } from '@/common/domain/date/date';
import { Subtitle } from '@/common/ui/custom-components/subtitle/subtitle';
import type { Mark } from '@/features/marks/domain/entities/mark';

export const MarkDate = ({ mark }: { mark?: Mark }) => {
	const type = mark?.isPr ? 'PR' : 'RM';
	const color = mark?.isPr ? 'text-primary' : 'text-secondary';

	return mark?.value ? (
		<div className="flex flex-col items-center">
			<Subtitle className={color}>{`Tu ${type}: ${mark.value} kg`}</Subtitle>
			{mark.createdOn && (
				<p className="text-xs text-muted-foreground mt-1 text-center">{`Conseguido el ${DateFormatter.format(mark.createdOn)}`}</p>
			)}
		</div>
	) : (
		<Subtitle className={color}>Sin {type} registrado</Subtitle>
	);
};
