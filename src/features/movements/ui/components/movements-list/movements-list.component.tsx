import { Loading } from '@/common/ui/custom-components/loading/loading';
import { MovementCard } from '@/features/movements/ui/components/movement-card/movement-card.component';
import { useGetMovements } from '@/features/movements/ui/controllers/use-get-movements.hook';

export const MovementsList = () => {
	const { data: movements, isPending, isError } = useGetMovements();

	if (isPending) return <Loading />;
	if (isError) return <div>Error loading movements</div>;

	return movements && movements.length > 0
		? movements.map((movement) => <MovementCard key={movement.id} movement={movement} />)
		: 'No movements to show';
};
