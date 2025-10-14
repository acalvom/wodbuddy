import { useNavigate, useParams } from 'react-router-dom';
import { Parser } from '@/common/domain/parser/parser';
import { Card } from '@/common/ui/custom-components/card/card';
import { CardContent } from '@/common/ui/custom-components/card/card-content';
import { CardFooter } from '@/common/ui/custom-components/card/card-footer';
import { CardHeader } from '@/common/ui/custom-components/card/card-header';
import { Loading } from '@/common/ui/custom-components/loading/loading';
import { Toast } from '@/common/ui/custom-components/toast/toast';
import { Button } from '@/common/ui/shade-ui/components/ui/button';
import { useGetCurrentPR } from '@/features/marks/ui/controllers/use-get-current-pr.hook';
import { useGetCurrentRM } from '@/features/marks/ui/controllers/use-get-current-rm.hook';
import { useGetMarksByMovement } from '@/features/marks/ui/controllers/use-get-marks-by-movement.hook';
import { useGetMovement } from '@/features/movements/ui/controllers/use-get-movement.hook';
import { HeaderSection } from './header-section/header.section';
import { MarkHistorySection } from './mark-history-section/mark-history.section';
import { PercentageCalculatorSection } from './percentage-calculator-section/percentage-calculator.section';

export const ViewMovementPage = () => {
	const { id } = useParams();
	const movementId = Parser.toInt(id!);
	const navigate = useNavigate();

	const { data: movement, isLoading: isLoadingMovement, isError: isMovementError } = useGetMovement(movementId!);
	const { data: marks, isLoading: isLoadingMarks, isError: isMarksError } = useGetMarksByMovement(movementId!);
	const { data: pr, isLoading: isLoadingPr, isError: isPrError } = useGetCurrentPR(movementId!);
	const { data: rm, isLoading: isLoadingRm, isError: isRmError } = useGetCurrentRM(movementId!);

	const isLoading = isLoadingMovement || isLoadingMarks || isLoadingPr || isLoadingRm;
	const isError = isMovementError || isMarksError || isPrError || isRmError;

	if (isLoading) return <Loading />;
	if (isError) return <Toast type="error" title="Error cargando datos" open={isError} />;
	if (!movement) return <div>Movimiento no encontrado</div>;

	return (
		<>
			<Button
				type="button"
				variant="outline"
				onClick={() => navigate(`/movements/${movementId}/marks/add`)}
				className="border-primary my-4 w-full max-w-xs mx-auto"
			>
				Añadir RM
			</Button>
			<Card>
				<CardHeader className="pb-4">
					<HeaderSection movement={movement} pr={pr} rm={rm} />
				</CardHeader>

				<CardContent>
					<MarkHistorySection marks={marks || []} movementId={movementId!} />
					<PercentageCalculatorSection movement={movement} />
				</CardContent>

				<CardFooter>
					<Button type="button" variant="secondary" className="rounded-xl" onClick={() => navigate('/movements')}>
						Volver
					</Button>
				</CardFooter>
			</Card>
		</>
	);
};
