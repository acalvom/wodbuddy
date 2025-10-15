import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Parser } from '@/common/domain/parser/parser';
import { Loading } from '@/common/ui/custom-components/loading/loading';
import { Title } from '@/common/ui/custom-components/title/title';
import { Toast } from '@/common/ui/custom-components/toast/toast';
import { Button } from '@/common/ui/shade-ui/components/ui/button';
import { MarksTable } from '@/features/marks/ui/components/marks-table/marks-table.component';
import { useDeleteMark } from '@/features/marks/ui/controllers/use-delete-mark.hook';
import { useGetMarksByMovement } from '@/features/marks/ui/controllers/use-get-marks-by-movement.hook';
import { useGetMovement } from '@/features/movements/ui/controllers/use-get-movement.hook';
import { MarkCollection } from '../../domain/value-objects/mark-collection';

export const MarksPage = () => {
	const { id } = useParams();
	const movementId = Parser.toInt(id!);
	const navigate = useNavigate();

	const { data: movement, isLoading: isLoadingMovement, isError: isMovementError } = useGetMovement(movementId!);
	const { data: marks, isLoading: isLoadingMarks, isError: isMarksError } = useGetMarksByMovement(movementId!);
	const { mutateAsync: deleteMark, isPending: isDeletingMark } = useDeleteMark(movementId!);

	const markCollection = MarkCollection.fromMarks(marks || []);

	const onDelete = async (markId: number) => {
		try {
			return await deleteMark(markId);
		} catch {}
	};

	const isLoading = isLoadingMovement || isLoadingMarks;
	const isError = isMovementError || isMarksError;

	if (isLoading) return <Loading />;
	if (isError) return <Toast type="error" title="Error cargando datos" open={isError} />;

	return (
		<div className="min-h-screen bg-background px-4 py-6">
			<div className="container mx-auto max-w-6xl">
				<div className="flex items-start justify-between mb-6">
					<div>
						<Title>{movement?.name}</Title>
						<p className="text-muted-foreground mt-2">{markCollection.formatTotal()}</p>
					</div>
					<Button className="border-primary" variant="outline" onClick={() => navigate(`/movements/${movementId}`)}>
						<ArrowLeft />
						Volver
					</Button>
				</div>

				<div className="w-full">
					{markCollection.isEmpty() ? (
						<div className="text-center py-12">
							<p className="text-muted-foreground text-lg">No hay marcas registradas</p>
							<Button className="border-primary mt-4" onClick={() => navigate(`/movements/${movementId}/marks/add`)}>
								Añadir primera marca
							</Button>
						</div>
					) : (
						<MarksTable marks={marks || []} onDelete={onDelete} isPending={isDeletingMark} />
					)}
				</div>
			</div>
		</div>
	);
};
