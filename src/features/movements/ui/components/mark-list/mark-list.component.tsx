import type { Mark } from '@/features/marks/domain/entities/mark';
import { MarkListItem } from '../mark-list-item/mark-list-item.component';

interface MarkListProps {
	marks: Mark[];
}

export const MarkList = ({ marks }: MarkListProps) => {
	if (marks.length === 0) {
		return (
			<div className="text-center py-8 text-muted-foreground">
				<p>No hay marcas registradas</p>
			</div>
		);
	}

	return (
		<ul className="space-y-2">
			{marks.map((mark) => (
				<MarkListItem key={mark.id} mark={mark} />
			))}
		</ul>
	);
};