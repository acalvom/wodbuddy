import { useNavigate, useParams } from 'react-router-dom';
import { Parser } from '@/common/domain/parser/parser.ts';
import { Card } from '@/common/ui/custom-components/card/card.tsx';
import { CardContent } from '@/common/ui/custom-components/card/card-content.tsx';
import { CardFooter } from '@/common/ui/custom-components/card/card-footer.tsx';
import { CardHeader } from '@/common/ui/custom-components/card/card-header.tsx';
import { Loading } from '@/common/ui/custom-components/loading/loading.tsx';
import { Toast } from '@/common/ui/custom-components/toast/toast.tsx';
import { Button } from '@/common/ui/shade-ui/components/ui/button.tsx';
import { useGetMovement } from '@/features/movements/ui/controllers/use-get-movement.hook.ts';
import { HeaderSection } from './header-section/header.section';
import { MarkHistorySection } from './mark-history-section/mark-history.section';
import { PercentageCalculatorSection } from './percentage-calculator-section/percentage-calculator.section';

// TODO: generar dominio
// TODO: Eliminar mocked data e implementar servicios
export interface Mark {
	id: number;
	movementId: number;
	date: Date;
	value: number;
	isPr: boolean;
}
const movementMarks: Mark[] = [
	{
		id: 1,
		movementId: 1,
		date: new Date('2025-10-01'),
		value: 70,
		isPr: false
	},
	{
		id: 2,
		movementId: 1,
		date: new Date('2025-11-01'),
		value: 75,
		isPr: true
	},
	{
		id: 3,
		movementId: 1,
		date: new Date('2025-12-01'),
		value: 72,
		isPr: false
	}
];

export const ViewMovementPage = () => {
	const { id } = useParams();
	const movementId = Parser.toInt(id!);
	const navigate = useNavigate();

	const { data: movement, isLoading, isError } = useGetMovement(movementId!);
	const pr = movementMarks.find((mark) => mark.isPr);

	if (isLoading) return <Loading />;
	if (isError) return <Toast type="error" title="Error cargando movimiento" open={isError} />;
	if (!movement || !pr) return <div>Movimiento no encontrado</div>;

	return (
		<Card>
			<CardHeader className="pb-4">
				<HeaderSection movement={movement} pr={pr} />
			</CardHeader>

			<CardContent>
				<MarkHistorySection marks={movementMarks} />
				<PercentageCalculatorSection movement={movement} />
			</CardContent>

			<CardFooter>
				<Button type="button" variant="secondary" className="rounded-xl" onClick={() => navigate('/')}>
					Volver
				</Button>
			</CardFooter>
		</Card>
	);
};
