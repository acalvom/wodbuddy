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

export const MarksPage = () => {
	const { id } = useParams();
	const movementId = Parser.toInt(id!);
	const navigate = useNavigate();

	const { data: movement, isLoading: isLoadingMovement, isError: isMovementError } = useGetMovement(movementId!);
	const { data: marks, isLoading: isLoadingMarks, isError: isMarksError } = useGetMarksByMovement(movementId!);
	const { mutateAsync: deleteMark, isPending: isDeletingMark } = useDeleteMark(movementId!);

	// TODO: confimacion de modal por hacer
	const handleDeleteMark = async (markId: number, markValue: number) => {
		const confirmed = window.confirm(
			`¿Estás seguro de que quieres eliminar la marca de ${markValue} kg? Esta acción no se puede deshacer.`
		);

		if (confirmed) {
			try {
				await deleteMark(markId);
			} catch (error) {
				console.error('Error deleting mark:', error);
			}
		}
	};

	const isLoading = isLoadingMovement || isLoadingMarks;
	const isError = isMovementError || isMarksError;

	if (isLoading) return <Loading />;
	if (isError) return <Toast type="error" title="Error cargando datos" open={isError} />;
	if (!movement) return <div>Movimiento no encontrado</div>;

	// TODO: al domain
	const totalMarks = marks?.length || 0;

	return (
		<div className="min-h-screen bg-background px-4 py-6">
			<div className="container mx-auto max-w-6xl">
				<div className="flex items-start justify-between mb-6">
					<div>
						<Title>{movement.name}</Title>
						<p className="text-muted-foreground mt-2">
							{totalMarks} {totalMarks === 1 ? 'marca' : 'marcas'} en total
						</p>
					</div>
					<Button className="border-primary" variant="outline" onClick={() => navigate(`/movements/${movementId}`)}>
						<ArrowLeft />
						Volver
					</Button>
				</div>

				<div className="w-full">
					{totalMarks === 0 ? (
						<div className="text-center py-12">
							<p className="text-muted-foreground text-lg">No hay marcas registradas</p>
							<Button className="border-primary mt-4" onClick={() => navigate(`/movements/${movementId}/marks/add`)}>
								Añadir primera marca
							</Button>
						</div>
					) : (
						<MarksTable marks={marks || []} onDeleteMark={handleDeleteMark} isDeletingMark={isDeletingMark} />
					)}
				</div>
			</div>
		</div>
	);
};
