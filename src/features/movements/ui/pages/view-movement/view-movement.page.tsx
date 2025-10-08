import { useId } from 'react';
import { useParams } from 'react-router-dom';
import { Parser } from '@/common/domain/parser/parser.ts';
import { Loading } from '@/common/ui/custom-components/loading/loading.tsx';
import { Subtitle } from '@/common/ui/custom-components/subtitle/subtitle.tsx';
import { Title } from '@/common/ui/custom-components/title/title.tsx';
import { Toast } from '@/common/ui/custom-components/toast/toast.tsx';
import { useGetMovement } from '@/features/movements/ui/controllers/use-get-movement.hook.ts';

interface Mark {
	id: number;
	movementId: number;
	date: Date;
	value: number;
	isPr: boolean;
}
const marksByMovement: Mark[] = [
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

// TODO: WIP
export const ViewMovementPage = () => {
	const { id } = useParams();
	const movementId = Parser.toInt(id!);
	const percentageId = useId();
	const weightResultId = useId();

	const { data: movement, isLoading, isError } = useGetMovement(movementId!);

	const pr = marksByMovement.find((mark) => mark.isPr);

	if (isLoading) return <Loading />;
	if (isError) return <Toast type="error" title="Error cargando movimiento" open={isError} />;
	if (!movement) return <div>Movement not found</div>;

	return (
		<>
			<Title>{movement.name}</Title>
			<Subtitle>{`RM actual: ${movement.rm ?? 'No definido'}`}</Subtitle>
			<Subtitle>{`PR: ${pr?.value ?? 'No definido'}`}</Subtitle>
			<p>{`En: ${pr?.date?.toDateString() ?? 'No definido'}`}</p>

			<hr />
			<h3>Histórico de marcas</h3>
			<ul>
				{marksByMovement.map((mark) => (
					<li key={mark.id}>{`Fecha: ${mark.date.toDateString()}, Valor: ${mark.value}, PR: ${mark.isPr ? 'Sí' : 'No'}`}</li>
				))}
			</ul>

			<hr />
			<h3>Calculadora de porcentaje</h3>
			<div>
				<label htmlFor={percentageId}>Porcentaje de RM:</label>
				<input
					type="number"
					id={percentageId}
					placeholder="Ingrese porcentaje"
					onChange={(e) => {
						const percentage = parseInt(e.target.value, 10) || 0;
						const rm = movement.rm ?? 0;
						const weight = Math.round((rm * percentage) / 100);
						const resultElement = document.getElementById(weightResultId);
						if (resultElement) {
							resultElement.textContent = `${percentage}% = ${weight} kg`;
						}
					}}
				/>
				<p id={weightResultId}>0% = 0 kg</p>
			</div>
		</>
	);
};
