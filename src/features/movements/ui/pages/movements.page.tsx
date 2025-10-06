import { useNavigate } from 'react-router-dom';
import { Button } from '@/common/ui/shade-ui/components/ui/button.tsx';
import { MovementsList } from '@/features/movements/ui/components/movements-list/movements-list.component.tsx';

export const MovementsPage = () => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col items-center">
			<Button
				type="button"
				variant="outline"
				onClick={() => navigate('/add-movement')}
				className="border-primary cursor-pointer mt-4 mb-8 w-full max-w-xs"
			>
				Añadir movimiento
			</Button>
			<MovementsList />
		</div>
	);
};
