import { useGetMovements } from '@/features/movements/ui/controllers/use-get-movements.hook.ts';

export const MovementsList = () => {
	const { data: movements, isPending, isError } = useGetMovements();

	return (
		<div>
			<p>Movements</p>
			{isPending && 'Loading...'}
			{isError && 'Error loading movements'}
			<ul>
				{movements && movements?.length > 0
					? movements.map((movement) => (
							<li key={movement.id}>
								{movement.id}: {movement.name} - {movement.rm} kg
							</li>
						))
					: 'No movements to show'}
			</ul>
		</div>
	);
};
