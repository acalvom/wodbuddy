import { Link } from 'react-router';
import { useGetMovements } from '@/features/movements/ui/controllers/use-get-movements.hook.ts';

export const MovementsList = () => {
	const { data: movements, isPending, isError } = useGetMovements();

	return (
		<div>
			<p>Movements</p>
			{isPending && 'Loading...'}
			{isError && 'Error loading movements'}
			{movements && movements?.length > 0
				? movements.map((movement) => (
						<Link to={`/movements/${movement.id}`} key={movement.id}>
							<div className="cursor-pointer rounded-2xl bg-card p-6 shadow-lg transition border hover:shadow-xl flex flex-col items-center">
								<h2 className="text-3xl text-shadow-lg font-bold uppercase text-destructive mb-4">Snatch</h2>

								<p className="text-lg font-semibold text-info mb-4">RM: {movement.rm} kg</p>

								{/* Percentages */}
								<div className="w-full space-y-1 text-gray-700 text-sm">
									<p className="flex justify-between">
										<span>{'50%'}</span>
										<span className="font-medium">{movement.getPercentageOfRM(50)} kg</span>
									</p>
									<p className="flex justify-between">
										<span>{'60%'}</span>
										<span className="font-medium">{movement.getPercentageOfRM(60)} kg</span>
									</p>
									<p className="flex justify-between">
										<span>{'75%'}</span>
										<span className="font-medium">{movement.getPercentageOfRM(75)} kg</span>
									</p>
									<p className="flex justify-between">
										<span>{'80%'}</span>
										<span className="font-medium">{movement.getPercentageOfRM(80)} kg</span>
									</p>
								</div>
							</div>
						</Link>
					))
				: 'No movements to show'}
		</div>
	);
};
