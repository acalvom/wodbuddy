import { Loader2Icon } from 'lucide-react';
import { MovementCard } from '@/features/movements/ui/components/movement-card/movement-card.component.tsx';
import { useGetMovements } from '@/features/movements/ui/controllers/use-get-movements.hook.ts';

export const MovementsList = () => {
	const { data: movements, isPending, isError } = useGetMovements();

	return (
		<div>
			{isPending && <Loader2Icon className="animate-spin" />}
			{isError && 'Error loading movements'}
			{movements && movements?.length > 0
				? movements.map((movement) => <MovementCard key={movement.id} movement={movement} />)
				: 'No movements to show'}
		</div>
	);
};
