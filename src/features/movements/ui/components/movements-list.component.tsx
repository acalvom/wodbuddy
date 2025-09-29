import { useGetMovements } from '@/features/movements/ui/controllers/use-get-movements.hook.ts';

export const MovementsList = () => {
	const { data: movements, isPending, isError } = useGetMovements();

	return (
		<div>
			<p>Movements</p>
			<pre>
				{isPending && 'Loading...'}
				{isError && 'Error loading movements'}
				{movements && JSON.stringify(movements, null, 2)}
			</pre>
		</div>
	);
};
